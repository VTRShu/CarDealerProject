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
        public ModelEntity GetModelByName(string name) => _carDealerDBContext.ModelEntity
            .Where(x => x.Name == name)
            .Include(x=>x.Images)
            .Include(x=>x.Type)
            .Include(x => x.FileInfor)
            .FirstOrDefault();
        public ModelEntity GetModelById(int id) => _carDealerDBContext.ModelEntity.Where(x => x.Id == id)
            .Include(x => x.Images)
            .Include(x => x.Type)
            .Include(x=>x.FileInfor)
            .FirstOrDefault();
        public ImageEntity GetImageByName(string name) => _carDealerDBContext.ImageEntity.Where(x => x.ImageName == name).FirstOrDefault();
        public async Task<ModelEntityDTO> CreateModel(ModelEntityDTO model)
        {
            ModelEntityDTO result = null;
            ModelEntity newModel = null;
            var duplicateModel = GetModelByName(model.Name);
            var type = GetTypeById(model.TypeId);
            var image1 = GetImageByName(model.ImageName1);
            var image2 = GetImageByName(model.ImageName2);
            var image3 = GetImageByName(model.ImageName3);
            List<ImageEntity> imageList = new List<ImageEntity>();
            imageList.Add(image1);
            imageList.Add(image2);
            imageList.Add(image3);
            var fileInfor = GetImageByName(model.FileInforName);
            using var transaction = _carDealerDBContext.Database.BeginTransaction();
            try
            {
                newModel = new ModelEntity
                {
                    Name = model.Name,
                    StartPrice = model.StartPrice,
                    Description = model.Description,
                    Images = imageList,
                    Type = type,
                    FileInfor = fileInfor
                };
                if (duplicateModel == null)
                {
                    _carDealerDBContext.ModelEntity.Add(newModel);
                    await _carDealerDBContext.SaveChangesAsync();
                    await transaction.CommitAsync();
                    result = new ModelEntityDTO()
                    {
                        Name = newModel.Name,
                        StartPrice = newModel.StartPrice,
                        Description = newModel.Description,
                        TypeId = model.TypeId,
                        FileInforName = model.FileInforName,
                        ImageName1 = model.ImageName1,
                        ImageName2 = model.ImageName2,
                        ImageName3 = model.ImageName3,
                    };
                    return result;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception)
            {
                _logger.LogError("Can't Create Model! Pls try again.");
            }
            return result;
        }
        public async Task<ModelEntityDTO> UpdateModel(ModelEntityDTO model, string name)
        {
            ModelEntityDTO result = null;
            using var transaction = _carDealerDBContext.Database.BeginTransaction();
            try
            {
                var duplicateModel = GetModelByName(model.Name);
                var existedModel = GetModelByName(name);
                if(model.ImageName1 == null)
                {
                    model.ImageName1 = existedModel.Images[0].ImageName;
                }
                if (model.ImageName2 == null)
                {
                    model.ImageName2 = existedModel.Images[1].ImageName;
                }
                if (model.ImageName3 == null)
                {
                    model.ImageName3 = existedModel.Images[2].ImageName;
                }
                if(model.FileInforName == null)
                {
                    model.FileInforName = existedModel.FileInfor.ImageName;
                }    
                var image1 = GetImageByName(model.ImageName1);
                var image2 = GetImageByName(model.ImageName2);
                var image3 = GetImageByName(model.ImageName3);
                List<ImageEntity> imageList = new List<ImageEntity>();
                imageList.Add(image1);
                imageList.Add(image2);
                imageList.Add(image3);
                var fileInfor = GetImageByName(model.FileInforName);
                if (existedModel!= null)
                {
                    existedModel.StartPrice = model.StartPrice;
                    existedModel.Name = model.Name;
                    existedModel.Description = model.Description;
                    existedModel.Images = imageList;
                    existedModel.FileInfor = fileInfor;
                    _carDealerDBContext.Entry(existedModel).State = EntityState.Modified;
                    await _carDealerDBContext.SaveChangesAsync();
                    await transaction.CommitAsync();
                    result = new ModelEntityDTO
                    {
                         Name = existedModel.Name,
                         StartPrice = existedModel.StartPrice,
                         Description = existedModel.Description,
                         FileInforName = existedModel.FileInfor.ImageName,
                         ImageName1 = existedModel.Images[0].ImageName,
                         ImageName2 = existedModel.Images[1].ImageName,
                         ImageName3 = existedModel.Images[2].ImageName,
                    };
                   return result;
                }
                else
                {
                    return null;
                } 
            }catch(Exception)
            {
                _logger.LogError("Couldn't update model!");
            }
            return result;
        }
        public ModelEntity GetModelInfor(string name)
        {
            ModelEntity result = null;
            try
            {
                var model = GetModelByName(name);
                if (model != null)
                {
                    result = new ModelEntity()
                    {
                        Id = model.Id,
                        Name = model.Name,
                        Type = model.Type,
                        StartPrice = model.StartPrice,
                        Images = model.Images,
                        Description = model.Description,
                        FileInfor = model.FileInfor,
                    };
                    return result;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception)
            {
                _logger.LogError("Couldn't find model");
            };
            return result;
        }
        public async Task<List<ModelEntity>> GetModelList()
        {
            var modelList = await _carDealerDBContext.ModelEntity
                .Include(x => x.Images).AsSingleQuery()
                .Include(x => x.Type).AsSingleQuery()
                .Include(x => x.FileInfor).AsSingleQuery()
                .ToListAsync();
            return modelList;
        }
    }
}
