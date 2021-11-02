using CarDealerProject.DTO;
using CarDealerProject.DTO.Request;
using CarDealerProject.Repositories.Entities;
using CarDealerProject.Services.CustomerService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
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
        [Authorize(Roles = "Admin,Master")]
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
            return Ok(new
            {
                token = result[0],

            });
        }
        [Authorize(Roles = "Admin,Master")]
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
        [Authorize(Roles = "Admin,Master")]
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
        [Authorize(Roles = "Admin,Master")]
        [HttpPut("update/{id}-{code}")]
        public async Task<ActionResult<CustomerEntity>> UpdateCustomer(CustomerEntityDTO user, int id, string code)
        {
            var updateCustomer = await _customerService.UpdateCustomer(user, id, code);
            if (updateCustomer == null)
            {
                return BadRequest("Error!!");
            }
            return Ok(updateCustomer);
        }
    }
}
