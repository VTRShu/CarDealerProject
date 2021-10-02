using CarDealerProject.DTO;
using CarDealerProject.Repositories.EFContext;
using CarDealerProject.Repositories.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Services.TypeService.Implement
{
    public class TypeService : ITypeService
    {
        private readonly ILogger<TypeService> _logger;
        private readonly CarDealerDBContext _carDealerDBContext;
        public TypeService(CarDealerDBContext carDealerDBContext, ILogger<TypeService> logger)
        {
            _logger = logger;
            _carDealerDBContext = carDealerDBContext;
        }
        public async Task<TypeEntityDTO> CreateType(TypeEntityDTO type)
        {
            TypeEntityDTO result = null;
            using var transaction = _carDealerDBContext.Database.BeginTransaction();
            try
            {
                var newType = new TypeEntity
                {
                    Name = type.Name,
                    Description = type.Description,
                };
                var existType = _carDealerDBContext.TypeEntity.Where(x => x.Name == type.Name).FirstOrDefault();
                if(existType == null)
                {
                    _carDealerDBContext.TypeEntity.Add(newType);
                    await _carDealerDBContext.SaveChangesAsync();
                    await transaction.CommitAsync();

                    result = new TypeEntityDTO()
                    {
                        Name = newType.Name,
                        Description = newType.Description,
                    };
                    return result;
                }
            }
            catch (Exception)
            {
                _logger.LogError("Can't Create Type! Pls try again.");
            }
            return result;
        }

        public async Task<List<TypeEntity>> GetTypeList()
        {
            var listType = await _carDealerDBContext.TypeEntity.ToListAsync();
            return listType;
        }
    }
}
