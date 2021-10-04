using CarDealerProject.DTO.Request;
using CarDealerProject.Repositories.EFContext;
using CarDealerProject.Repositories.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CarDealerProject.Services.AuthenticationService.Implement
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly RoleManager<AppRole> _roleManager;
        private readonly IConfiguration _config;
        private readonly CarDealerDBContext _carDealerDBContext;
        private ILogger<AuthenticationService> _logger;
        public AuthenticationService(UserManager<AppUser> userManager,
         SignInManager<AppUser> signInManager,
         RoleManager<AppRole> roleManager,
         IConfiguration config,
         CarDealerDBContext carDealerDBContext,
         ILogger<AuthenticationService> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _config = config;
            _carDealerDBContext = carDealerDBContext;
            _logger = logger;
        }
        public async Task<string[]> Authenticate(LoginRequest request)
        {
            using var transaction = _carDealerDBContext.Database.BeginTransaction();
            var result = new string[6];
            try
            {
                var user = await _userManager.FindByNameAsync(request.UserName);
                if (user == null || user.IsDisabled == false) throw new Exception("Can't find User Name");
                var login = await _signInManager.PasswordSignInAsync(user, request.Password, request.RememberMe, true);
                if (!login.Succeeded)
                {
                    return null;
                }

                var roles = await _userManager.GetRolesAsync(user);
                var claims = new[]
                {
            new Claim(ClaimTypes.Locality, user.DealerName),
            new Claim(ClaimTypes.Role, string.Join(";", roles)),
            new Claim(ClaimTypes.UserData, user.Code),
        };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Tokens:Key"]));
                var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(_config["Tokens:Issuer"],
                    _config["Tokens:Issuer"],
                    claims,
                    expires: DateTime.Now.AddDays(7),
                    signingCredentials: credentials);

                result[0] = new JwtSecurityTokenHandler().WriteToken(token);
                result[1] = string.Join(";", roles);
                result[2] = string.Join(";", user.IsFirstLogin);
                result[3] = string.Join(";", user.DealerName);
                result[4] = string.Join(";", user.Code);
                result[5] = string.Join(";", user.UserName);
                await _carDealerDBContext.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch
            {
                _logger.LogError("Couldn't connect database");
            }
            return result;
        }

        public AppUser GetByCode(string code) => _carDealerDBContext.AppUsers.FirstOrDefault(u => u.Code == code && u.IsDisabled == true);

        public async Task<string> ChangePassword(ChangePasswordRequest request)
        {
            var findUser = GetByCode(request.UserCode);
            if (findUser != null)
            {
                var result = _userManager.PasswordHasher.VerifyHashedPassword(findUser, findUser.PasswordHash, request.OldPassword);
                if (result != PasswordVerificationResult.Success)
                {
                    return "Wrong Password";
                }
                findUser.IsFirstLogin = false;
                var changePass = await _userManager.ChangePasswordAsync(findUser, request.OldPassword, request.NewPassword);
                if (changePass.Succeeded) return "Success";
                return "Fail";
            }
            return null;
        }
    }
}
