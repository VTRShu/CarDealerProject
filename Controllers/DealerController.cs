using CarDealerProject.DTO;
using CarDealerProject.Repositories.Entities;
using CarDealerProject.Services.DealerService;
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
    public class DealerController : ControllerBase
    {
        private readonly IDealerService _dealerService;
        public DealerController(IDealerService dealerService)
        {
            _dealerService = dealerService;
        }
        [HttpPost("dealer/create")]
        public async Task<ActionResult<DealerEntityDTO>> Create(DealerEntityDTO dealer)
        {
            var newDealer = await _dealerService.CreateDealer(dealer);
            if(newDealer == null)
            {
                return BadRequest("Error !!!");
            }
            return Ok(newDealer);
        }
        [HttpPut("dealer/update/{id}")]
        public async Task<ActionResult<DealerEntityDTO>> Update(DealerEntityDTO dealer, int id)
        {
            var updateModel = await _dealerService.UpdateDealer(dealer, id);
            if (updateModel == null)
            {
                return BadRequest("Error !!!");
            }
            return Ok(updateModel);
        }
        [HttpGet("dealer/List")]
        public async Task<List<DealerEntity>> GetDealerList()
        {
            var dealerList = await _dealerService.GetDealerList();
            return dealerList;
        }

        [HttpGet("dealer/{id}")]
        public  DealerEntity GetDealerById(int id)
        {
            var dealer =  _dealerService.GetDealerInfor(id);
            return dealer;
        }
    }
}
