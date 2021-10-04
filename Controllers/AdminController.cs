using CarDealerProject.Services.AdminService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CarDealerProject.DTO;
using CarDealerProject.DTO.Request;
using CarDealerProject.Repositories.Entities;
namespace CarDealerProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize(Roles = "Admin,Master")]
    public class AdminController : ControllerBase
    {
        protected string GetUserDealer()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            return claimsIdentity.FindFirst(ClaimTypes.Locality).Value;
        }
        private readonly IAdminService _adminService;
        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }   
        
        [HttpGet("master/list/user")]
        public async Task<ActionResult<PagingResult<AppUser>>> ViewUserListForMaster(
            [FromQuery(Name = "pageSize")] int pageSize, [FromQuery(Name = "pageIndex")] int pageIndex = 1)
        {
            var request = new PagingRequest
            {
                PageSize = pageSize,
                PageIndex = pageIndex,
            };
            return Ok(await _adminService.GetUsersListForMaster(request));
        }

        [HttpGet("admin/list/user")]
        public async Task<ActionResult<PagingResult<AppUser>>> ViewUserListForAdmin(
             [FromQuery(Name = "pageSize")] int pageSize, [FromQuery(Name = "pageIndex")] int pageIndex = 1)
        {
            var request = new PagingRequest
            {
                PageSize = pageSize,
                PageIndex = pageIndex,
            };
            var dealer = GetUserDealer();
            return Ok(await _adminService.GetUsersListForAdmin(request, dealer));
        }
        
        [HttpGet("user/Code")]
        public AppUser GetUserByCode(string code)
        {
            return _adminService.GetUserInforByCode(code);
        }

        [HttpPost("user/create")]
        public async Task<ActionResult<AppUserDTO>> Create(AppUserDTO user)
        {
            var newUser = await _adminService.CreateUser(user);
            if (newUser == null)
            {
                return BadRequest("Email is already existed!");
            }
            return Ok(newUser);
        }
        [HttpPut("user/update/{code}")]
        public async Task<ActionResult<AppUserDTO>> Update(AppUserDTO user, string code)
        {
            var updateUser = await _adminService.UpdateUser(user, code);
            if (updateUser == null)
            {
                return BadRequest("Error !!!");
            }
            return Ok(updateUser);
        }

        [HttpPut("user/Disable/{code}")]
        public async Task<ActionResult> Disable(string code)
        {
            var result = await _adminService.Disable(code);
            if (result)
            {
                return Ok(result);
            }
            return BadRequest();
        }

        [HttpGet("user/master/listAll")]
        public async Task<List<AppUser>> GetAllMaster()
        {
            return await _adminService.GetAllUserMaster();
        }
         [HttpGet("user/admin/listAll")]
        public async Task<List<AppUser>> GetAllAdmin()
        {   
            var dealer = GetUserDealer();
            return await _adminService.GetAllUserAdmin(dealer);
        }
    }
}
