using CarDealerProject.DTO.Request;
using CarDealerProject.Repositories.Entities;
using CarDealerProject.Services.CustomerService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CarDealerProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        protected string GetUserDealer()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            return claimsIdentity.FindFirst(ClaimTypes.Locality).Value;
        }

        private readonly ICustomerService _customerService;
        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet("All/Customer")]
        public async Task<List<CustomerEntity>> GetAllCustomerMaster()
        {
            return await _customerService.GetAllCustomerMaster();
        }
        [HttpGet("customer/get/{input}")]
        public async Task<ActionResult<CustomerEntity>> GetCustomerByEmailOrPhone(string input)
        {
            var result = await _customerService.GetCustomerInfoByEmailOrPhone(input);
            if (result == null)
            {
                return BadRequest("Not found customer!");
            }
            return Ok(result);
        }
        [HttpGet("customer/getById/{id}")]
        public async Task<ActionResult<CustomerEntity>> GetCustomerById(int id)
        {
            var result = await _customerService.GetCustomerInfoById(id);
            if (result == null)
            {
                return BadRequest("Not found customer!");
            }
            return Ok(result);
        }
        [HttpGet("list")]
        public async Task<ActionResult<PagingResult<CustomerEntity>>> GetListCustomer(
        [FromQuery(Name = "pageSize")] int pageSize,
        [FromQuery(Name = "pageIndex")] int pageIndex = 1)
        {
            var request = new PagingRequest
            {
                PageSize = pageSize,
                PageIndex = pageIndex
            };
            return Ok(await _customerService.GetListCustomer(request));
        }
    }
}
