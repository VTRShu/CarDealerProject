using CarDealerProject.DTO;
using CarDealerProject.DTO.Request;
using CarDealerProject.Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Services.AdminService
{
    public interface IAdminService
    {
        AppUser GetByCode(string code);
        AppUser GetUserInforByCode(string code);
        Task<AppUserDTO> CreateUser(AppUserDTO user);
        Task<AppUserDTO> UpdateUser(AppUserDTO user, string code);
        Task<bool> Disable(string code);
        Task<PagingResult<AppUser>> GetUsersListForAdmin(PagingRequest request, string dealer);
        Task<PagingResult<AppUser>> GetUsersListForMaster(PagingRequest request);
        Task<List<AppUser>> GetAllUserAdmin(string location);
        Task<List<AppUser>> GetAllUserMaster();
    }
}
