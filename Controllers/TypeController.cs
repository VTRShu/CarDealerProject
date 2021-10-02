using CarDealerProject.DTO;
using CarDealerProject.Repositories.Entities;
using CarDealerProject.Services.TypeService;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Controllers
{
    public class TypeController : Controller
    {
        private readonly ITypeService _typeService;
        public TypeController(ITypeService typeService)
        {
            _typeService = typeService;
        }
        [HttpPost("type/create")]
        public async Task<ActionResult<TypeEntityDTO>> Create(TypeEntityDTO type)
        {
            var newType = await _typeService.CreateType(type);
            if(newType == null)
            {
                return BadRequest("Can't create type, pls try again");
            }
            return Ok(newType);
        }
        [HttpGet("type/list")]
        public async Task<List<TypeEntity>> GetListType()
        {
            var result = await _typeService.GetTypeList();
            return result;
        }
    }
}
