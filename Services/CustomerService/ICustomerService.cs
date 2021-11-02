using CarDealerProject.DTO;
using CarDealerProject.DTO.Request;
using CarDealerProject.Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Services.CustomerService
{
    public interface ICustomerService
    {
        Task<List<CustomerEntity>> GetAllCustomerMaster();
        Task<string[]> GetCustomerInfoByEmailOrPhone(string input);
        Task<PagingResult<CustomerEntity>> GetListCustomer(PagingRequest request);
        Task<CustomerEntity> GetCustomerInfoById(int id);
        Task<CustomerEntity> UpdateCustomer(CustomerEntityDTO user, int id, string code);
    }
}
