using CarDealerProject.DTO;
using CarDealerProject.Repositories.EFContext;
using CarDealerProject.Repositories.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Services.ModelService.Implement
{
    public class ModelService : IModelService
    {
        private readonly ILogger<ModelService> _logger;
        private readonly CarDealerDBContext _carDealerDBContext;
        public ModelService(CarDealerDBContext carDealerDBContext, ILogger<ModelService> logger)
        {
            _logger = logger;
            _carDealerDBContext = carDealerDBContext;
        }
        public TypeEntity GetTypeById(int id) => _carDealerDBContext.TypeEntity.Where(x => x.Id == id).FirstOrDefault();
        public ImageEntity GetImageById(int id) => _carDealerDBContext.ImageEntity.Where(x => x.Id == id).FirstOrDefault();
        public async Task<ModelEntityDTO> CreateModel(ModelEntityDTO model)
        {
            ModelEntityDTO result = null;
            ModelEntity newModel = null;
            var type = GetTypeById(model.TypeId);
            var image1 = GetImageById(model.ImageId1);
            var image2 = GetImageById(model.ImageId2);
            var image3 = GetImageById(model.ImageId3);
            List<ImageEntity> imageList = new List<ImageEntity>();
            imageList.Add(image1);
            imageList.Add(image2);
            imageList.Add(image3);
            using var transaction = _carDealerDBContext.Database.BeginTransaction();
            try
            {
                newModel = new ModelEntity
                {
                    Name = model.Name,
                    Description = model.Description,
                    Images = imageList,
                    Type = type,
                };
                _carDealerDBContext.ModelEntity.Add(newModel);
                await _carDealerDBContext.SaveChangesAsync();
                await transaction.CommitAsync();
                result = new ModelEntityDTO()
                {
                    Name = newModel.Name,
                    Description = newModel.Description,
                    TypeId = model.TypeId,
                    ImageId1 = model.ImageId1,
                    ImageId2 = model.ImageId2,
                    ImageId3 = model.ImageId3,
                };
                return result;
            }
            catch (Exception)
            {
                _logger.LogError("Can't Create Model! Pls try again.");
            }
            return result;
        }

        public async Task<List<ModelEntity>> GetModelList()
        {
            var modelList = await _carDealerDBContext.ModelEntity
                .Include(x => x.Images).AsSingleQuery()
                .Include(x => x.Type).AsSingleQuery()
                .ToListAsync();
            return modelList;
        }
    }
}
