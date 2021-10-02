using CarDealerProject.DTO;
using CarDealerProject.Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Services.ModelService
{
    public interface IModelService
    {
        Task<List<ModelEntity>> GetModelList();
        Task<ModelEntityDTO> CreateModel(ModelEntityDTO model);
    }
}
