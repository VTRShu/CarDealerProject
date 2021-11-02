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
        public DealerEntity GetDealerByName(string name) => _carDealerDBContext.DealerEntity.Where(x => x.Name == name).FirstOrDefault();
        public TypeEntity GetTypeById(int id) => _carDealerDBContext.TypeEntity.Where(x => x.Id == id).FirstOrDefault();
        public ModelEntity GetModelById(int id) => _carDealerDBContext.ModelEntity.Where(x => x.Id == id).FirstOrDefault();
        public CarEntity GetCarById(int id) => _carDealerDBContext.CarEntity.Where(x => x.Id == id).FirstOrDefault();
        public ImageEntity GetImageByName(string name) => _carDealerDBContext.ImageEntity.Where(x => x.ImageName == name).FirstOrDefault();
        public async Task<CarEntityDTO> CreateCar(CarEntityDTO car)
        {
            CarEntity newCar = null;
            CarEntityDTO result = null;
            var dealer = GetDealerByName(car.Dealer);
            var model = GetModelById(car.ModelId);
            var type = GetTypeById(car.TypeId);
            var image1 = GetImageByName(car.ImageName1);
            var image2 = GetImageByName(car.ImageName2);
            var image3 = GetImageByName(car.ImageName3);
            var image4 = GetImageByName(car.ImageName4);
            var image5 = GetImageByName(car.ImageName5);
            var image6 = GetImageByName(car.ImageName6);
            List<ImageEntity> imageList = new List<ImageEntity>();
            imageList.Add(image1);
            imageList.Add(image2);
            imageList.Add(image3);
            imageList.Add(image4);
            imageList.Add(image5);
            imageList.Add(image6);
            List<CarEntity> carList = new List<CarEntity>();
            using var transaction = _carDealerDBContext.Database.BeginTransaction();
            try
            {
                newCar = new CarEntity
                {
                    Images = imageList,
                    Name = car.Name,
                    Type = type,
                    ModelName = model.Name,
                    Model = model,
                    Color = car.Color,
                    FuelType = car.FuelType,
                    Power = car.Power,
                    MaximumSpeed = car.MaximumSpeed,
                    Length = car.Length,
                    Date = car.Date,
                    FuelConsumption = car.FuelConsumption,
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
                    IsAvailable = true,
                };
                _carDealerDBContext.CarEntity.Add(newCar);
                dealer.Cars = carList;
                carList.Add(newCar);
                dealer.Cars = carList;
                await _carDealerDBContext.SaveChangesAsync();
                await transaction.CommitAsync();
                result = new CarEntityDTO()
                {  
                    Id = newCar.Id,
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
                    FuelConsumption = car.FuelConsumption,
                    Date = car.Date,
                    Upholstery = car.Upholstery,
                    Transmission = car.Transmission,
                    Acceleration = car.Acceleration,
                    Weight = car.Weight,
                    Height = car.Height,
                    Displacement = car.Displacement,
                    Dealer = car.Dealer,
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

        public async Task<bool> DisableCar(int id)
        {
            var car = GetCarById(id);
            if (car != null)
            {
                car.IsAvailable = false;
                await _carDealerDBContext.SaveChangesAsync();
                return true;
            }
            return false;
        }
        public async Task<bool> EnableCar(int id)
        {
            var car = GetCarById(id);
            if (car != null)
            {
                car.IsAvailable = true;
                await _carDealerDBContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<CarEntity> GetCarInfoById(int id)
        {
            var car = await _carDealerDBContext.CarEntity
                .Include(x => x.Images).AsSingleQuery()
                .Include(x => x.Dealer).AsSingleQuery()
                .Include(x => x.Model).AsSingleQuery()
                .Include(x => x.Type).AsSingleQuery()
                .FirstOrDefaultAsync(x => x.Id == id);
            CarEntity result = null;
            if(car != null)
            {
                result = new CarEntity
                {  
                    Id = car.Id,
                    ModelName = car.ModelName,
                    Name = car.Name,
                    Type = car.Type,
                    Model = car.Model,
                    Color = car.Color,
                    FuelType = car.FuelType,
                    Power = car.Power,
                    MaximumSpeed = car.MaximumSpeed,
                    Length = car.Length,
                    Width = car.Width,
                    FuelConsumption = car.FuelConsumption,
                    Torque = car.Torque,
                    Date = car.Date,
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
                    .Include(x => x.Type).AsSingleQuery()
                    .FirstOrDefaultAsync(x => x.Id == id);
                if(existCar == null)
                {
                    return null;
                }
                else
                {
                    DealerEntity newDealer = GetDealerByName(car.Dealer);
                    var image1 = GetImageByName(car.ImageName1);
                    var image2 = GetImageByName(car.ImageName2);
                    var image3 = GetImageByName(car.ImageName3);
                    var image4 = GetImageByName(car.ImageName4);
                    var image5 = GetImageByName(car.ImageName5);
                    var image6 = GetImageByName(car.ImageName6);
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
                    ModelName = existCar.ModelName,
                    Color = existCar.Color,
                    FuelType = existCar.FuelType,
                    Power = existCar.Power,
                    FuelConsumption = existCar.FuelConsumption,
                    Date = existCar.Date,
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

        public async Task<PagingResult<CarEntity>> GetListCarForMaster(PagingRequest request)
        {
            var carList = _carDealerDBContext.CarEntity
                .Include(x => x.Dealer).AsSingleQuery()
                .Include(x => x.Type).AsSingleQuery()
                .Include(x => x.Model).AsSingleQuery()
                .Include(x => x.Images).AsSingleQuery()
                .Select(car => new CarEntity
                {   
                    Id = car.Id,
                    Name = car.Name,
                    Type = car.Type,
                    Model = car.Model,
                    Color = car.Color,
                    Date = car.Date,
                    ModelName = car.ModelName,
                    FuelType = car.FuelType,
                    Power = car.Power,
                    MaximumSpeed = car.MaximumSpeed,
                    Length = car.Length,
                    Width = car.Width,
                    Torque = car.Torque,
                    FuelConsumption = car.FuelConsumption,
                    Upholstery = car.Upholstery,
                    Transmission = car.Transmission,
                    Acceleration = car.Acceleration,
                    Weight = car.Weight,
                    Height = car.Height,
                    Displacement = car.Displacement,
                    Dealer = car.Dealer,
                    Price = car.Price,
                    Images = car.Images,
                    IsAvailable = car.IsAvailable,
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
                    Date = car.Date,
                    ModelName = car.ModelName,
                    FuelType = car.FuelType,
                    Power = car.Power,
                    MaximumSpeed = car.MaximumSpeed,
                    Length = car.Length,
                    FuelConsumption = car.FuelConsumption,
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
                    IsAvailable = car.IsAvailable,
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
        public async Task<PagingResult<CarEntity>> GetListCarForAdmin(PagingRequest request, string dealer)
        {
            var carList = _carDealerDBContext.CarEntity
                .Where(x => x.Dealer.Name == dealer && x.IsAvailable == true)
                .Include(x=>x.Type).AsSingleQuery()
                .Include(x => x.Dealer).AsSingleQuery()
                .Include(x => x.Model).AsSingleQuery()
                .Include(x => x.Images).AsSingleQuery()
                .Select(car => new CarEntity
                {
                    Id = car.Id,
                    Name = car.Name,
                    Type = car.Type,
                    Model = car.Model,
                    ModelName = car.ModelName,
                    Color = car.Color,
                    FuelType = car.FuelType,
                    Power = car.Power,
                    Date = car.Date,
                    MaximumSpeed = car.MaximumSpeed,
                    Length = car.Length,
                    Width = car.Width,
                    Torque = car.Torque,
                    FuelConsumption = car.FuelConsumption,
                    Upholstery = car.Upholstery,
                    Transmission = car.Transmission,
                    Acceleration = car.Acceleration,
                    Weight = car.Weight,
                    Height = car.Height,
                    Displacement = car.Displacement,
                    Dealer = car.Dealer,
                    Price = car.Price,
                    Images = car.Images,
                    IsAvailable = car.IsAvailable,
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
                    ModelName = car.ModelName,
                    Color = car.Color,
                    FuelType = car.FuelType,
                    Power = car.Power,
                    Date = car.Date,
                    MaximumSpeed = car.MaximumSpeed,
                    Length = car.Length,
                    FuelConsumption = car.FuelConsumption,
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
                    IsAvailable = car.IsAvailable,
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
        public async Task<List<CarEntity>> GetAllCarMaster()
        {
            var listCar = await _carDealerDBContext.CarEntity.Select(x => new CarEntity
            {
                Id = x.Id,
                Name = x.Name,
                Type = x.Type,
                Model = x.Model,
                ModelName = x.ModelName,
                Color = x.Color,
                FuelType = x.FuelType,
                Power = x.Power,
                MaximumSpeed = x.MaximumSpeed,
                Length = x.Length,
                Width = x.Width,
                Date = x.Date,
                Torque = x.Torque,
                Upholstery = x.Upholstery,
                Transmission = x.Transmission,
                Acceleration = x.Acceleration,
                Weight = x.Weight,
                Height = x.Height,
                FuelConsumption = x.FuelConsumption,
                Displacement = x.Displacement,
                Dealer = x.Dealer,
                Price = x.Price,
                Images = x.Images,
                IsAvailable = x.IsAvailable,
            }).ToListAsync();
            return listCar;

        }
        public async Task<List<CarEntity>> GetAllCarAdmin(string dealer)
        {
            var listCar = await _carDealerDBContext.CarEntity.Where(x => x.Dealer.Name == dealer).Select(x => new CarEntity
            {
                Id = x.Id,
                Name = x.Name,
                Type = x.Type,
                Model = x.Model,
                Color = x.Color,
                FuelType = x.FuelType,
                ModelName = x.ModelName,
                Date = x.Date,
                Power = x.Power,
                MaximumSpeed = x.MaximumSpeed,
                Length = x.Length,
                Width = x.Width,
                Torque = x.Torque,
                Upholstery = x.Upholstery,
                Transmission = x.Transmission,
                FuelConsumption = x.FuelConsumption,
                Acceleration = x.Acceleration,
                Weight = x.Weight,
                Height = x.Height,
                Displacement = x.Displacement,
                Dealer = x.Dealer,
                Price = x.Price,
                Images = x.Images,
                IsAvailable = x.IsAvailable,
            }).ToListAsync();
            return listCar;
        }
    }
}


