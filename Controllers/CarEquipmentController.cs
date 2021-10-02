using CarDealerProject.DTO;
using CarDealerProject.Services.CarService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarEquipmentController : ControllerBase
    {
        private readonly ICarEquipmentService _carEquipmentService;
        public CarEquipmentController(ICarEquipmentService carEquipmentService)
        {
            _carEquipmentService = carEquipmentService;
        }
        [HttpPost("euipment/create")]
        public async Task<ActionResult<CarEquipmentEntityDTO>> Create(CarEquipmentEntityDTO equip)
        {
            var newEquipment = await _carEquipmentService.CreateCarEquip(equip);
            if(newEquipment == null)
            {
                return BadRequest("Can't create equipment, pls try again!");
            }
            return Ok(newEquipment);
        }
    }
}
