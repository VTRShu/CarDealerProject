using CarDealerProject.Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarDealerProject.DTO;
using CarDealerProject.DTO.Request;

namespace CarDealerProject.Services.CarService
{
    public interface ICarService
    {   
        
        Task<CarEntityDTO> CreateCar(CarEntityDTO car);
        Task<PagingResult<CarEntity>> ViewListCar(PagingRequest request);
        Task<CarEntity> GetCarById(int id);
        Task<CarEntity> UpdateCar(CarEntityDTO car, int id);
        Task<bool> DisableCar(int id);

    }
}
