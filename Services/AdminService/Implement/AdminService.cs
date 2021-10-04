using CarDealerProject.DTO;
using CarDealerProject.DTO.Request;
using CarDealerProject.Repositories.EFContext;
using CarDealerProject.Repositories.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Services.AdminService
{
    public class AdminService : IAdminService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ILogger<AdminService> _logger;
        private readonly CarDealerDBContext _carDealerDBContext;
        public AdminService(
        UserManager<AppUser> userManager,
        CarDealerDBContext carDealerDBContext,
        ILogger<AdminService> logger
        )
        {
            _logger = logger;
            _userManager = userManager;
            _carDealerDBContext = carDealerDBContext;
        }
        public async Task<PagingResult<AppUser>> GetUsersListForMaster(PagingRequest request)
        {
            var users = _carDealerDBContext.AppUsers
                .Where(x => x.IsDisabled == true)
                .Include(x => x.Dealer)
                .Include(x => x.Image)
                .Select(x => new AppUser
                {
                    Code = x.Code,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    DealerName = x.DealerName,
                    Dealer = x.Dealer,
                    Dob = x.Dob,
                    Email = x.Email,
                    Gender = x.Gender,
                    Type = x.Type,
                    IsDisabled = x.IsDisabled,
                    Image = x.Image
                });
            int totalRow = await users.CountAsync();
            var data = await users.Skip((request.PageIndex - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(x => new AppUser()
                {
                    Code = x.Code,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    DealerName = x.DealerName,
                    Dealer = x.Dealer,
                    Dob = x.Dob,
                    Email = x.Email,
                    Gender = x.Gender,
                    Type = x.Type,
                    IsDisabled = x.IsDisabled,
                    Image = x.Image,
                }).ToListAsync();
            var pagedResult = new PagingResult<AppUser>()
            {
                Items = data,
                TotalRecords = totalRow,
                PageSize = request.PageSize,
                PageIndex = request.PageIndex,
            };

            return pagedResult;
        }
        public async Task<PagingResult<AppUser>> GetUsersListForAdmin(PagingRequest request, string dealer)
        {
            var users = _carDealerDBContext.AppUsers
                .Where(x => x.IsDisabled == true && x.Dealer.Name == dealer && x.Type != 0)
                .Include(x => x.Dealer)
                .Include(x => x.Image)
                .Select(x => new AppUser
                {
                    Code = x.Code,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    DealerName = x.DealerName,
                    Dealer = x.Dealer,
                    Dob = x.Dob,
                    Email = x.Email,
                    Gender = x.Gender,
                    Type = x.Type,
                    IsDisabled = x.IsDisabled,
                    Image = x.Image
                });
            int totalRow = await users.CountAsync();
            var data = await users.Skip((request.PageIndex - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(x => new AppUser()
                {
                    Code = x.Code,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    DealerName = x.DealerName,
                    Dealer = x.Dealer,
                    Dob = x.Dob,
                    Email = x.Email,
                    Gender = x.Gender,
                    Type = x.Type,
                    IsDisabled = x.IsDisabled,
                    Image = x.Image,
                }).ToListAsync();
            var pagedResult = new PagingResult<AppUser>()
            {
                Items = data,
                TotalRecords = totalRow,
                PageSize = request.PageSize,
                PageIndex = request.PageIndex,
            };

            return pagedResult;
        }

        public AppUser GetByCode(string code) => _carDealerDBContext.AppUsers
            .Include(x => x.Dealer)
            .Include(x => x.Image)
            .Where(u => u.Code == code && u.IsDisabled == true)
            .FirstOrDefault();

        public DealerEntity GetDealerById(int id) => _carDealerDBContext.DealerEntity
            .Where(x => x.Id == id)
            .FirstOrDefault();
        public ImageEntity GetImageByName(string name) => _carDealerDBContext.ImageEntity
            .Where(x => x.ImageName == name).FirstOrDefault();

        public async Task<bool> Disable(string code)
        {
            var user = GetByCode(code);
            if (user != null)
            {
                 user.IsDisabled = false;
                 await _carDealerDBContext.SaveChangesAsync();
                 return true;
            }
            return false;
        }

        public AppUser GetUserInforByCode(string code)
        {
            AppUser result = null;
            try
            {
                var user = GetByCode(code);
                if(user != null)
                {
                    result = new AppUser()
                    {
                        Code = user.Code,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        DealerName = user.DealerName,
                        Dealer = user.Dealer,
                        Dob = user.Dob,
                        Gender = user.Gender,
                        Type = user.Type,
                        IsDisabled = user.IsDisabled,
                        Image = user.Image,
                        Email = user.Email
                    };
                    return result;
                }
                else
                {
                    return null;
                }
            }catch(Exception)
            {
                _logger.LogError("Couldn't find User");
            };
            return result;
        }

        public async Task<AppUserDTO> CreateUser(AppUserDTO user)
        {
            AppUserDTO result = null;
            var dealer = GetDealerById(user.DealerId);
            var image = GetImageByName(user.ImageName);
            using var transaction = _carDealerDBContext.Database.BeginTransaction();
            try
            {
                var newUser = new AppUser
                {
                    Code = user.Code,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Dob = user.Dob,
                    Dealer = dealer,
                    DealerName = dealer.Name,
                    Email = user.Email,
                    Gender = user.Gender,
                    Type = user.Type,
                    IsDisabled = true,
                    Image = image,
                };
                for (int i = 0; i < newUser.LastName.Split(' ').Length; i++)
                {
                    newUser.LastNameFirstChar += newUser.LastName.Split(' ')[i][0];
                }
                newUser.CountDuplicate = _carDealerDBContext.AppUsers
                    .Where(a => a.FirstName == newUser.FirstName && a.LastNameFirstChar == newUser.LastNameFirstChar)
                    .Count().ToString().ToLower();
                if (newUser.CountDuplicate == "0")
                {
                    newUser.CountDuplicate = "";
                }
                if (newUser.Type == (Role)0)
                {
                    user.Password = "Master123@123";
                }
                else if (newUser.Type == (Role)1)
                {
                    user.Password = "Admin123@123";
                }
                else if (newUser.Type == (Role)2)
                {
                    user.Password = "Staff123@123";
                };
                var existedEmail = _carDealerDBContext.AppUsers.Where(x => string.Equals(x.Email, user.Email, StringComparison.OrdinalIgnoreCase)).FirstOrDefault();
                if (existedEmail == null)
                {
                    var createdUser = await _userManager.CreateAsync(newUser, user.Password);
                    _carDealerDBContext.AppUsers.Add(newUser);
                    await _carDealerDBContext.SaveChangesAsync();
                    string roleName = newUser.Type == (Role)0 ? "Master" : (newUser.Type == (Role)1 ? "Admin" : "Staff");
                    if (await _userManager.IsInRoleAsync(newUser, roleName) == false)
                    {
                        await _userManager.AddToRoleAsync(newUser, roleName);
                    }
                }
                else
                {
                    return null;
                }
                result = new AppUserDTO()
                {   
                    Code = newUser.Code,
                    FirstName = newUser.FirstName,
                    LastName = newUser.LastName,
                    Dob = newUser.Dob,
                    Email = newUser.Email,
                    DealerId = newUser.Dealer.Id,
                    Gender = newUser.Gender,
                    UserName = newUser.UserName,
                    Type = newUser.Type,
                    IsDisabled = newUser.IsDisabled,
                    ImageName = newUser.Image.ImageName,
                };
                return result;
            }
            catch(Exception)
            {
                _logger.LogError("Couldn't Create User");
            }
            return result;
        }

        public async Task<AppUserDTO> UpdateUser(AppUserDTO user, string code)
        {
            using var transaction = _carDealerDBContext.Database.BeginTransaction();
            AppUserDTO result = null;
            try
            {
                var existingUser = GetByCode(code);
                if (existingUser == null || existingUser.IsFirstLogin == true)
                {
                    if (user.Type != existingUser.Type)
                    {
                        return null;
                    }
                }
                else
                {
                    TimeZone time2 = TimeZone.CurrentTimeZone;
                    DateTime test = time2.ToUniversalTime(user.Dob);
                    var sea = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
                    var Dob = TimeZoneInfo.ConvertTimeFromUtc(test, sea);
                    var newImage = GetImageByName(user.ImageName);
                    
                    existingUser.Gender = user.Gender;
                    existingUser.Dob = Dob;
                    existingUser.Image = newImage;
                    _carDealerDBContext.Entry(existingUser).State = EntityState.Modified;

                    string oldRoleName = existingUser.Type == (Role)0 ? "Master" : (existingUser.Type == (Role)1 ? "Admin" : "Staff");
                    if (await _userManager.IsInRoleAsync(existingUser, oldRoleName))
                    {
                        await _userManager.RemoveFromRoleAsync(existingUser, oldRoleName);
                    }
                    existingUser.Type = user.Type;

                    string newRoleName = user.Type == (Role)0 ? "Master" : (existingUser.Type == (Role)1 ? "Admin" : "Staff");
                    if (!await _userManager.IsInRoleAsync(existingUser, newRoleName))
                    {
                        await _userManager.AddToRoleAsync(existingUser, newRoleName);
                    }
                    await _carDealerDBContext.SaveChangesAsync();
                    await transaction.CommitAsync();
                }
                result = new AppUserDTO
                {
                    FirstName = existingUser.FirstName,
                    LastName = existingUser.LastName,
                    Dob = existingUser.Dob,
                    DealerId = existingUser.Dealer.Id,
                    Gender = existingUser.Gender,
                    Code = existingUser.Code,
                    UserName = existingUser.UserName,
                    Type = existingUser.Type,
                    IsDisabled = existingUser.IsDisabled,
                };
                return result;
            }catch(Exception)
            {
                _logger.LogError("Couldn't Update User");
            }
            return result;
        }
        public async Task<List<AppUser>> GetAllUserAdmin(string dealer)
        {
            var listUser = await _carDealerDBContext.AppUsers.Where(x => x.Dealer.Name == dealer && x.IsDisabled == true && x.Type != 0).Select(x => new AppUser{
                Code = x.Code,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Dob = x.Dob,
                DealerName = x.DealerName,
                Dealer = x.Dealer,
                Image = x.Image,
                Gender = x.Gender,
                UserName = x.UserName,
                Type = x.Type,
                IsDisabled = x.IsDisabled,
            }).ToListAsync();
            return listUser;
        }
        public async Task<List<AppUser>> GetAllUserMaster()
        {
            var listUser = await _carDealerDBContext.AppUsers.Where(x => x.IsDisabled == true).Select(x => new AppUser{
                Code = x.Code,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Dob = x.Dob,
                DealerName = x.DealerName,
                Dealer = x.Dealer,
                Image = x.Image,
                Gender = x.Gender,
                UserName = x.UserName,
                Type = x.Type,
                IsDisabled = x.IsDisabled,
            }).ToListAsync();
            return listUser;
        }
    }
}
