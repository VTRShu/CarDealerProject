using CarDealerProject.DTO;
using CarDealerProject.Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Services.DealerService
{
    public interface IDealerService
    {
        Task<List<DealerEntity>> GetDealerList();
        Task<DealerEntityDTO> CreateDealer(DealerEntityDTO dealer);
    }
}
