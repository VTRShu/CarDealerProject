﻿using CarDealerProject.DTO;
using CarDealerProject.Repositories.Entities;
using CarDealerProject.Services.ModelService;
using Microsoft.AspNetCore.Authorization;
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
    public class ModelController : ControllerBase
    {

        private readonly IModelService _modelService;
        public ModelController(IModelService modelService)
        {
            _modelService = modelService;
        }
        [Authorize(Roles = "Master")]
        [HttpPost("model/create")]
        public async Task<ActionResult<ModelEntityDTO>> Create(ModelEntityDTO model)
        {
            var newModel = await _modelService.CreateModel(model);
            if (newModel == null)
            {
                return BadRequest("Can't create model , pls try again!");
            }
            return Ok(newModel);
        }
        [Authorize(Roles = "Master")]
        [HttpPut("model/update/{name}")]
        public async Task<ActionResult<ModelEntityDTO>> Update(ModelEntityDTO model, string name)
        {
            var updateModel = await _modelService.UpdateModel(model, name);
            if (updateModel == null)
            {
                return BadRequest("Error !!!");
            }
            return Ok(updateModel);
        }
        [HttpGet("model/list")]
        public async Task<List<ModelEntity>> GetListModel()
        {
            var modelList = await _modelService.GetModelList();
            return modelList;
        }
        [HttpGet("model/name")]
        public ModelEntity GetModelById(string name)
        {
            return _modelService.GetModelInfor(name);
        }
    }
}
