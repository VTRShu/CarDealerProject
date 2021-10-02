using CarDealerProject.DTO;
using CarDealerProject.Repositories.EFContext;
using CarDealerProject.Repositories.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Services.DealerService.Implement
{
    public class DealerService : IDealerService
    {
        private readonly ILogger<DealerService> _logger;
        private readonly CarDealerDBContext _carDealerDBContext;
        public DealerService (CarDealerDBContext carDealerDBContext, ILogger<DealerService> logger)
        {
            _logger = logger;
            _carDealerDBContext = carDealerDBContext;
        }
        public async Task<DealerEntityDTO> CreateDealer(DealerEntityDTO dealer)
        {
            DealerEntityDTO result = null;
            using var transaction = _carDealerDBContext.Database.BeginTransaction();
            try
            {
                var newDealer = new DealerEntity
                {
                    Name = dealer.Name,
                    Latitude = dealer.Latitude,
                    Longtitude = dealer.Longtitude,
                    Description = dealer.Description,
                    DealerEmail = dealer.DealerEmail,
                    DealerPhone = dealer.DealerPhone,
                    DealerWebsite = dealer.DealerWebsite,
                };
                var existedDealer = _carDealerDBContext.DealerEntity
                    .Where(c => c.Latitude == newDealer.Latitude
                     && c.Longtitude == newDealer.Longtitude).FirstOrDefault();
                if (existedDealer == null)
                {
                    _carDealerDBContext.DealerEntity.Add(newDealer);
                    await _carDealerDBContext.SaveChangesAsync();
                    await transaction.CommitAsync();

                    result = new DealerEntityDTO()
                    {
                        Name = newDealer.Name,
                        Latitude = newDealer.Latitude,
                        Longtitude = newDealer.Longtitude,
                        Description = newDealer.Description,
                        DealerEmail = dealer.DealerEmail,
                        DealerPhone = dealer.DealerPhone,
                        DealerWebsite = dealer.DealerWebsite,
                    };
                    return result;
                }
                else
                {
                    return null;
                }
            }catch(Exception)
            {
                _logger.LogError("Can't Create Dealer! Pls try again.");
            }
            return result;
        }

        public async Task<List<DealerEntity>> GetDealerList()
        {
            var listDealer = await _carDealerDBContext.DealerEntity.ToListAsync();
            return listDealer;
        }
    }
}
