using CarDealerProject.DTO;
using CarDealerProject.DTO.Request;
using CarDealerProject.Repositories.Entities;
using CarDealerProject.Services.CarService;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
namespace CarDealerProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarController : ControllerBase
    {   
        private readonly ICarService _carService;
        public CarController(ICarService carService)
        {
            _carService = carService;
        }
        protected string GetUserDealer()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            return claimsIdentity.FindFirst(ClaimTypes.Locality).Value;
        }

        [HttpPost("api/car/create")]
        public async Task<ActionResult<CarEntityDTO>> Create(CarEntityDTO car)
        {
            if(car == null)
            {
                return BadRequest("Null");
            }
            var newCar = await _carService.CreateCar(car);
            if(newCar == null )
            {
                return BadRequest("Can't ceate car!");
            }
            return Ok(newCar);
        }
        [HttpGet("car/get/{id}")]
        public async Task<ActionResult<CarEntity>> GetById(int id)
        {
            var result = await _carService.GetCarInfoById(id);
            if(result == null)
            {
                return BadRequest("Not found car!");
            }
            return Ok(result);
        }
        [HttpPut("car/edit/{id}")]
        public async Task<ActionResult<CarEntity>> UpdateCar(CarEntityDTO car,int id)
        {
            var updateCar = await _carService.UpdateCar(car, id);
            if(updateCar == null)
            {
                return BadRequest("Error!!");
            }
            return Ok(updateCar);
        }
        [HttpGet("car/master/list")]
        public async Task<ActionResult<PagingResult<CarEntity>>> GetListCarForMaster(
        [FromQuery(Name = "pageSize")] int pageSize,
        [FromQuery(Name = "pageIndex")] int pageIndex = 1)
        {
            var request = new PagingRequest
            {
                PageSize = pageSize,
                PageIndex = pageIndex
            };
            return Ok(await _carService.GetListCarForMaster(request));
        }
        [HttpGet("car/admin/list")]
        public async Task<ActionResult<PagingResult<CarEntity>>> GetListCarForAdmin(
         [FromQuery(Name = "pageSize")] int pageSize,
         [FromQuery(Name = "pageIndex")] int pageIndex = 1)
        {   

            var request = new PagingRequest
            {
                PageSize = pageSize,
                PageIndex = pageIndex
            };
            var dealer = GetUserDealer();
            return Ok(await _carService.GetListCarForAdmin(request,dealer));
        }

        [HttpGet("car/master/listAll")]
        public async Task<List<CarEntity>> GetAllCarMaster()
        {
            return await _carService.GetAllCarMaster();
        }
        [HttpGet("car/admin/listAll")]
        public async Task<List<CarEntity>> GetAllCarAdmin()
        {
            var dealer = GetUserDealer();
            return await _carService.GetAllCarAdmin(dealer);
        }
        [HttpPut("car/disable/{id}")]
        public async Task<ActionResult> Disable(int id)
        {
            var result = await _carService.DisableCar(id);
            if(result)
            {
                return Ok(result);
            }
            return BadRequest("Error!");
        }

    }
}
