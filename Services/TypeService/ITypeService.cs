using CarDealerProject.DTO;
using CarDealerProject.Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Services.TypeService
{
    public interface ITypeService
    {
        Task<List<TypeEntity>> GetTypeList();
        Task<TypeEntityDTO> CreateType(TypeEntityDTO type);
    }
}
