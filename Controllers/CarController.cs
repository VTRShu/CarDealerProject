using CarDealerProject.DTO;
using CarDealerProject.DTO.Request;
using CarDealerProject.Repositories.Entities;
using CarDealerProject.Services.CarService;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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
            var result = await _carService.GetCarById(id);
            if(result == null)
            {
                return BadRequest("Not found car!");
            }
            return Ok(result);
        }
        [HttpPost("car/edit/{id}")]
        public async Task<ActionResult<CarEntity>> UpdateCar(CarEntityDTO car,int id)
        {
            var updateCar = await _carService.UpdateCar(car, id);
            if(updateCar == null)
            {
                return BadRequest("Error!!");
            }
            return Ok(updateCar);
        }
        [HttpGet("car/list")]
        public async Task<ActionResult<PagingResult<CarEntity>>> GetListCar(
        [FromQuery(Name = "pageSize")] int pageSize,
        [FromQuery(Name = "pageIndex")] int pageIndex = 1)
        {
            var request = new PagingRequest
            {
                PageSize = pageSize,
                PageIndex = pageIndex
            };
            return Ok(await _carService.ViewListCar(request));
        }
    }
}
