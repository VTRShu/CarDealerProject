using CarDealerProject.DTO;
using CarDealerProject.DTO.Request;
using CarDealerProject.Repositories.EFContext;
using CarDealerProject.Repositories.Entities;
using Microsoft.EntityFrameworkCore;
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

namespace CarDealerProject.Services.CustomerService.Implement
{
    public class CustomerService : ICustomerService
    {
        private readonly ILogger<CustomerService> _logger;
        private readonly CarDealerDBContext _carDealerDBContext;
        private readonly IConfiguration _config;
        public CustomerService(CarDealerDBContext carDealerDBContext, ILogger<CustomerService> logger, IConfiguration config)
        {
            _logger = logger;
            _carDealerDBContext = carDealerDBContext;
            _config = config;
        }
        public async Task<List<CustomerEntity>> GetAllCustomerMaster()
        {
            var listCustomer = await _carDealerDBContext.CustomerEntity
                .Include(x => x.bookWorkshops).ThenInclude(c => c.Service)
                .Include(x => x.bookWorkshops).ThenInclude(c => c.User)
                .Include(x => x.bookWorkshops).ThenInclude(c => c.Dealer)
                .Include(x => x.Editor)
                .Include(x => x.bookings).ThenInclude(c => c.Service)
                .Include(x => x.bookings).ThenInclude(c => c.User)
                .Include(x => x.bookings).ThenInclude(v => v.Dealer)
                .ToListAsync();
            return listCustomer;
        }
        public async Task<string[]> GetCustomerInfoByEmailOrPhone(string input)
        {
            var result = new string[5];
            var customer = await _carDealerDBContext.CustomerEntity.Where(x => x.PhoneNumber == input || x.Email == input)
                .Include(x => x.bookWorkshops).ThenInclude(c => c.Service)
                .Include(x => x.bookWorkshops).ThenInclude(c => c.Dealer)
                .Include(x => x.Editor)
                .Include(x => x.bookings).ThenInclude(c => c.Service)
                .Include(x => x.bookings).ThenInclude(v => v.Dealer)
                .FirstOrDefaultAsync();
            var claims = new[]
            {
            new Claim(ClaimTypes.UserData, string.Join(";",customer.FullName,customer.Email,customer.PhoneNumber,customer.Title)),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Tokens:Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Tokens:Issuer"],
                _config["Tokens:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);

            result[0] = new JwtSecurityTokenHandler().WriteToken(token);
          
            return result;
        }
        public async Task<CustomerEntity> GetCustomerInfoById(int id)
        {
            var customer = await _carDealerDBContext.CustomerEntity.Where(x => x.Id == id)
                .Include(x => x.bookWorkshops).ThenInclude(c => c.Service)
                 .Include(x => x.bookWorkshops).ThenInclude(c => c.User)
                .Include(x => x.bookWorkshops).ThenInclude(c => c.Dealer)
                .Include(x => x.Editor)
                .Include(x => x.bookings).ThenInclude(c => c.Service)
                .Include(x => x.bookings).ThenInclude(c => c.User)
                .Include(x => x.bookings).ThenInclude(v => v.Dealer)
                .FirstOrDefaultAsync();
            return customer;
        }
        public async Task<PagingResult<CustomerEntity>> GetListCustomer(PagingRequest request)
        {
            var listCustomer = _carDealerDBContext.CustomerEntity
                 .Include(x => x.bookWorkshops).ThenInclude(c=>c.Service)
                 .Include(x => x.bookWorkshops).ThenInclude(c => c.User)
                 .Include(x=>x.bookWorkshops).ThenInclude(c=>c.Dealer)
                 .Include(x => x.Editor)
                 .Include(x => x.bookings).ThenInclude(c => c.Service)
                 .Include(x => x.bookings).ThenInclude(c => c.User)
                 .Include(x => x.bookings).ThenInclude(v => v.Dealer);
            int totalRow = await listCustomer.CountAsync();
            var data = await listCustomer.Skip((request.PageIndex - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();
            var pagedResult = new PagingResult<CustomerEntity>()
            {
                Items = data,
                TotalRecords = totalRow,
                PageSize = request.PageSize,
                PageIndex = request.PageIndex,
            };

            return pagedResult;
        }
        public CustomerEntity GetCustomerById(int id) => _carDealerDBContext.CustomerEntity.Where(x => x.Id == id)
                .Include(x => x.bookWorkshops).ThenInclude(c => c.Service)
                .Include(x => x.bookWorkshops).ThenInclude(c => c.Dealer)
                .Include(x => x.Editor)
                .Include(x => x.bookings).ThenInclude(c => c.Service)
                .Include(x => x.bookings).ThenInclude(v => v.Dealer)
                .FirstOrDefault();
        public AppUser GetUserByCode(string code) => _carDealerDBContext.AppUsers.Where(x => x.Code == code).FirstOrDefault();
        public async Task<CustomerEntity> UpdateCustomer(CustomerEntityDTO user, int id,string code)
        {
            using var transaction = _carDealerDBContext.Database.BeginTransaction();
            CustomerEntity result = null;
            try
            {
                var existedCustomer = GetCustomerById(id);
                var existedUser = GetUserByCode(code);
                if (existedCustomer == null || existedUser == null)
                {
                    return null;
                }
                else
                {   
                    existedCustomer.Email = user.Email;
                    existedCustomer.PhoneNumber = user.PhoneNumber;
                    existedCustomer.Editor = existedUser;
                    _carDealerDBContext.Entry(existedCustomer).State = EntityState.Modified;
                    await _carDealerDBContext.SaveChangesAsync();
                    await transaction.CommitAsync();
                    result = new CustomerEntity()
                    {
                        Id = existedCustomer.Id,
                        Email = existedCustomer.Email,
                        PhoneNumber = existedCustomer.PhoneNumber,
                        Editor = existedCustomer.Editor
                    };
                    return result;
                }
            }
            catch (Exception)
            {
                _logger.LogError("Couldn't Update Customer");
            }
            return result;
        }
    }
}
