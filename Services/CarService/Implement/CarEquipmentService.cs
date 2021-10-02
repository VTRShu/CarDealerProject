using CarDealerProject.DTO;
using CarDealerProject.Repositories.EFContext;
using CarDealerProject.Repositories.Entities;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Services.CarService.Implement
{
    public class CarEquipmentService : ICarEquipmentService
    {
        private readonly ILogger<CarEquipmentService> _logger;
        private readonly CarDealerDBContext _carDealerDBContext;
        public CarEquipmentService(CarDealerDBContext carDealerDBContext, ILogger<CarEquipmentService> logger)
        {
            _logger = logger;
            _carDealerDBContext = carDealerDBContext;
        }
        public async Task<CarEquipmentEntityDTO> CreateCarEquip(CarEquipmentEntityDTO car)
        {
            CarEquipmentEntity newEquip = null;
            CarEquipmentEntityDTO result = null;
            using var transaction = _carDealerDBContext.Database.BeginTransaction();
            try
            {
                newEquip = new CarEquipmentEntity
                {
                    Name = car.Name,
                };
                var existEquipment = _carDealerDBContext.CarEquipmentEntity.Where(x => x.Name == newEquip.Name).FirstOrDefault();
                if (existEquipment == null)
                {
                    _carDealerDBContext.CarEquipmentEntity.Add(newEquip);
                    await _carDealerDBContext.SaveChangesAsync();
                    await transaction.CommitAsync();
                    result = new CarEquipmentEntityDTO()
                    {
                        Name = newEquip.Name,
                    };
                    return result;
                }
                else
                {
                    return null;
                }
            }
            catch(Exception)
            {
                _logger.LogError("Can't Create Model! Pls try again.");
            }
            return result;
        }
    }
}
