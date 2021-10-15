using Microsoft.AspNetCore.Mvc;
using CarDealerProject.DTO.Request;
using System.Threading.Tasks;
using CarDealerProject.Services.AuthenticationService;
using Microsoft.AspNetCore.Authorization;
using CarDealerProject.Repositories.EFContext;

namespace CarDealerProject.Controllers
{
  [ApiController]
  [Route("api/authentication")]
  public class AuthenticationController : ControllerBase
  { 

    private readonly IAuthenticationService _authenticationService;
    public AuthenticationController(IAuthenticationService authenticationService)
    {
      _authenticationService = authenticationService;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login(LoginRequest request)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var result = await _authenticationService.Authenticate(request);
      if (result == null)
      {
        return BadRequest("UserName or Password is incorrect.");
      }
      return Ok(new
      {
        token = result[0],

      });
    }

    [HttpPost("new-password")]
    [AllowAnonymous]
    public async Task<ActionResult> ChangePassword(ChangePasswordRequest request)
    {
      var result = await _authenticationService.ChangePassword(request);
      if (result == null) return BadRequest("Error !");
      else if (result == "Fail") return BadRequest("Could not change password, you may check the password format");
      else if (result == "Wrong Password") return BadRequest("Password is incorrect");
      return Ok("Your password has been changed successfully");
    }
  }
}
