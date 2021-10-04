using CarDealerProject.DTO.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Services.AuthenticationService
{
    public interface IAuthenticationService
    {
        Task<string[]> Authenticate(LoginRequest request);
        Task<string> ChangePassword(ChangePasswordRequest request);
    }
}
