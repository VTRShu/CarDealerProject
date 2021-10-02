using CarDealerProject.DTO;
using CarDealerProject.DTO.Request;
using CarDealerProject.Repositories.EFContext;
using CarDealerProject.Repositories.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Services.CarService.Implement
{
    public class CarService : ICarService
    {
        private readonly ILogger<CarService> _logger;
        private readonly CarDealerDBContext _carDealerDBContext;
        public CarService(CarDealerDBContext carDealerDBContext, ILogger<CarService> logger)
        {
            _logger = logger;
            _carDealerDBContext = carDealerDBContext;
        }
        public DealerEntity GetDealerById(int id) => _carDealerDBContext.DealerEntity.Where(x => x.Id == id).FirstOrDefault();
        public TypeEntity GetTypeById(int id) => _carDealerDBContext.TypeEntity.Where(x => x.Id == id).FirstOrDefault();
        public ModelEntity GetModelById(int id) => _carDealerDBContext.ModelEntity.Where(x => x.Id == id).FirstOrDefault();
        public ImageEntity GetImageById(int id) => _carDealerDBContext.ImageEntity.Where(x => x.Id == id).FirstOrDefault();
        public async Task<CarEntityDTO> CreateCar(CarEntityDTO car)
        {
            CarEntity newCar = null;
            CarEntityDTO result = null;
            var dealer = GetDealerById(car.DealerId);
            var model = GetModelById(car.ModelId);
            var type = GetTypeById(car.TypeId);
            var image1 = GetImageById(car.ImageId1);
            var image2 = GetImageById(car.ImageId2);
            var image3 = GetImageById(car.ImageId3);
            var image4 = GetImageById(car.ImageId4);
            var image5 = GetImageById(car.ImageId5);
            var image6 = GetImageById(car.ImageId6);
            List<ImageEntity> imageList = new List<ImageEntity>();
            imageList.Add(image1);
            imageList.Add(image2);
            imageList.Add(image3);
            imageList.Add(image4);
            imageList.Add(image5);
            imageList.Add(image6);
            using var transaction = _carDealerDBContext.Database.BeginTransaction();
            try
            {
                newCar = new CarEntity
                {
                    Images = imageList,
                    Name = car.Name,
                    Type = type,
                    Model = model,
                    Color = car.Color,
                    FuelType = car.FuelType,
                    Power = car.Power,
                    MaximumSpeed = car.MaximumSpeed,
                    Length = car.Length,
                    Width = car.Width,
                    Torque = car.Torque,
                    Upholstery = car.Upholstery,
                    Transmission = car.Transmission,
                    Acceleration = car.Acceleration,
                    Weight = car.Weight,
                    Height = car.Height,
                    Displacement = car.Displacement,
                    Dealer = dealer,
                    Price = car.Price,
                    IsAvailble = true,
                };
                _carDealerDBContext.CarEntity.Add(newCar);
                await _carDealerDBContext.SaveChangesAsync();
                await transaction.CommitAsync();
                result = new CarEntityDTO()
                {
                    Name = car.Name,
                    TypeId = car.TypeId,
                    ModelId = car.ModelId,
                    Color = car.Color,
                    FuelType = car.FuelType,
                    Power = car.Power,
                    MaximumSpeed = car.MaximumSpeed,
                    Length = car.Length,
                    Width = car.Width,
                    Torque = car.Torque,
                    Upholstery = car.Upholstery,
                    Transmission = car.Transmission,
                    Acceleration = car.Acceleration,
                    Weight = car.Weight,
                    Height = car.Height,
                    Displacement = car.Displacement,
                    DealerId = car.DealerId,
                    Price = car.Price,
                    IsAvailble = car.IsAvailble,
                };
                return result;
            }
            catch
            {
                _logger.LogError("Couldn't Create Car");
            }
            return result;
        }

        public Task<bool> DisableCar(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<CarEntity> GetCarById(int id)
        {
            var car = await _carDealerDBContext.CarEntity
                .Include(x => x.Images).AsSingleQuery()
                .Include(x => x.Dealer).AsSingleQuery()
                .Include(x => x.Model).AsSingleQuery()
                .FirstOrDefaultAsync(x => x.Id == id);
            CarEntity result = null;
            if(car != null)
            {
                result = new CarEntity
                {  
                    Id = car.Id,
                    Name = car.Name,
                    Type = car.Type,
                    Model = car.Model,
                    Color = car.Color,
                    FuelType = car.FuelType,
                    Power = car.Power,
                    MaximumSpeed = car.MaximumSpeed,
                    Length = car.Length,
                    Width = car.Width,
                    Torque = car.Torque,
                    Upholstery = car.Upholstery,
                    Transmission = car.Transmission,
                    Acceleration = car.Acceleration,
                    Weight = car.Weight,
                    Height = car.Height,
                    Displacement = car.Displacement,
                    Dealer = car.Dealer,
                    Price = car.Price,
                    Images = car.Images,
                };
                
            }return result;
        }

        public async Task<CarEntity> UpdateCar(CarEntityDTO car, int id)
        {
            using var transaction = _carDealerDBContext.Database.BeginTransaction();
            CarEntity result = null;
            try
            {
                var existCar = await _carDealerDBContext.CarEntity
                    .Include(x => x.Images)
                    .Include(x => x.Dealer)
                    .Include(x => x.Model)
                    .FirstOrDefaultAsync(x => x.Id == id);
                if(existCar == null)
                {
                    return null;
                }
                else
                {
                    DealerEntity newDealer = GetDealerById(car.DealerId);
                    var image1 = GetImageById(car.ImageId1);
                    var image2 = GetImageById(car.ImageId2);
                    var image3 = GetImageById(car.ImageId3);
                    var image4 = GetImageById(car.ImageId4);
                    var image5 = GetImageById(car.ImageId5);
                    var image6 = GetImageById(car.ImageId6);
                    List<ImageEntity> newImageList = new List<ImageEntity>();
                    newImageList.Add(image1);
                    newImageList.Add(image2);
                    newImageList.Add(image3);
                    newImageList.Add(image4);
                    newImageList.Add(image5);
                    newImageList.Add(image6);
                    existCar.Images = newImageList;
                    existCar.Dealer = newDealer;
                    existCar.Color = car.Color;
                    existCar.Upholstery = car.Upholstery;
                    _carDealerDBContext.Entry(existCar).State = EntityState.Modified;
                    await _carDealerDBContext.SaveChangesAsync();
                    await transaction.CommitAsync();
                }
                result = new CarEntity()
                {   
                    Id = existCar.Id,
                    Name = existCar.Name,
                    Type = existCar.Type,
                    Model = existCar.Model,
                    Color = existCar.Color,
                    FuelType = existCar.FuelType,
                    Power = existCar.Power,
                    MaximumSpeed = existCar.MaximumSpeed,
                    Length = existCar.Length,
                    Width = existCar.Width,
                    Torque = existCar.Torque,
                    Upholstery = existCar.Upholstery,
                    Transmission = existCar.Transmission,
                    Acceleration = existCar.Acceleration,
                    Weight = existCar.Weight,
                    Height = existCar.Height,
                    Displacement = existCar.Displacement,
                    Dealer = existCar.Dealer,
                    Price = existCar.Price,
                    Images = existCar.Images,
                };
                return result;
            }
            catch
            {
                _logger.LogError("Couldn't Update Assignment");
            }
            return result;
        }

        public async Task<PagingResult<CarEntity>> ViewListCar(PagingRequest request)
        {
            var carList = _carDealerDBContext.CarEntity
                .Include(x => x.Dealer).AsSingleQuery()
                .Include(x => x.Model).AsSingleQuery()
                .Include(x => x.Images).AsSingleQuery()
                .Select(car => new CarEntity
                {   
                    Id = car.Id,
                    Name = car.Name,
                    Type = car.Type,
                    Model = car.Model,
                    Color = car.Color,
                    FuelType = car.FuelType,
                    Power = car.Power,
                    MaximumSpeed = car.MaximumSpeed,
                    Length = car.Length,
                    Width = car.Width,
                    Torque = car.Torque,
                    Upholstery = car.Upholstery,
                    Transmission = car.Transmission,
                    Acceleration = car.Acceleration,
                    Weight = car.Weight,
                    Height = car.Height,
                    Displacement = car.Displacement,
                    Dealer = car.Dealer,
                    Price = car.Price,
                    Images = car.Images,
                    IsAvailble = car.IsAvailble,
                });
            int totalRow = await carList.CountAsync();
            var data = await carList.Skip((request.PageIndex - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(car => new CarEntity
                {
                    Id = car.Id,
                    Name = car.Name,
                    Type = car.Type,
                    Model = car.Model,
                    Color = car.Color,
                    FuelType = car.FuelType,
                    Power = car.Power,
                    MaximumSpeed = car.MaximumSpeed,
                    Length = car.Length,
                    Width = car.Width,
                    Torque = car.Torque,
                    Upholstery = car.Upholstery,
                    Transmission = car.Transmission,
                    Acceleration = car.Acceleration,
                    Weight = car.Weight,
                    Height = car.Height,
                    Displacement = car.Displacement,
                    Dealer = car.Dealer,
                    Price = car.Price,
                    Images = car.Images,
                    IsAvailble = car.IsAvailble,
                }).ToListAsync();
            var pagedResult = new PagingResult<CarEntity>()
            {
                Items = data,
                TotalRecords = totalRow,
                PageSize = request.PageSize,
                PageIndex = request.PageIndex,
            };

            return pagedResult;
        }
    }
}
