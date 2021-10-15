using CarDealerProject.DTO.Request;
using CarDealerProject.Repositories.EFContext;
using CarDealerProject.Repositories.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Services.CustomerService.Implement
{
    public class CustomerService : ICustomerService
    {
        private readonly ILogger<CustomerService> _logger;
        private readonly CarDealerDBContext _carDealerDBContext;
        public CustomerService(CarDealerDBContext carDealerDBContext, ILogger<CustomerService> logger)
        {
            _logger = logger;
            _carDealerDBContext = carDealerDBContext;
        }
        public async Task<List<CustomerEntity>> GetAllCustomerMaster()
        {
            var listCustomer = await _carDealerDBContext.CustomerEntity
                .Include(x => x.bookings).ThenInclude(c => c.Service)
                .Include(x => x.bookings).ThenInclude(v => v.Dealer)
                .ToListAsync();
            return listCustomer;
        }
        public async Task<CustomerEntity> GetCustomerInfoByEmailOrPhone(string input)
        {
            var customer = await _carDealerDBContext.CustomerEntity.Where(x => x.PhoneNumber == input || x.Email == input)
                .Include(x => x.bookings).ThenInclude(c => c.Service)
                .Include(x => x.bookings).ThenInclude(v => v.Dealer)
                .FirstOrDefaultAsync();
            return customer;
        }
        public async Task<CustomerEntity> GetCustomerInfoById(int id)
        {
            var customer = await _carDealerDBContext.CustomerEntity.Where(x => x.Id == id)
                .Include(x => x.bookings).ThenInclude(c => c.Service)
                .Include(x => x.bookings).ThenInclude(v => v.Dealer)
                .FirstOrDefaultAsync();
            return customer;
        }
        public async Task<PagingResult<CustomerEntity>> GetListCustomer(PagingRequest request)
        {
            var listCustomer = _carDealerDBContext.CustomerEntity
                 .Include(x => x.bookings).ThenInclude(c => c.Service)
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
    }
}
