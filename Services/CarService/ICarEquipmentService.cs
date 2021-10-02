using CarDealerProject.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Services.CarService
{
    public interface ICarEquipmentService
    {
        Task<CarEquipmentEntityDTO> CreateCarEquip(CarEquipmentEntityDTO car);
    }
}
