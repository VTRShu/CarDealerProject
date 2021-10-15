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
        Task<PagingResult<CarEntity>> GetListCarForMaster(PagingRequest request);
        Task<PagingResult<CarEntity>> GetListCarForAdmin(PagingRequest request, string dealer);
        Task<CarEntity> GetCarInfoById(int id);
        Task<CarEntity> UpdateCar(CarEntityDTO car, int id);
        Task<bool> DisableCar(int id);
        Task<List<CarEntity>> GetAllCarAdmin(string dealer);
        Task<List<CarEntity>> GetAllCarMaster();

    }
}
