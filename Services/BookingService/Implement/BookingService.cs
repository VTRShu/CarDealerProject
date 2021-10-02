using CarDealerProject.DTO;
using CarDealerProject.Repositories.EFContext;
using CarDealerProject.Repositories.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Services.BookingService.Implement
{
    public class BookingService : IBookingService
    {
        private readonly ILogger<BookingService> _logger;
        private readonly CarDealerDBContext _carDealerDBContext;
        public BookingService(CarDealerDBContext carDealerDBContext, ILogger<BookingService> logger)
        {
            _logger = logger;
            _carDealerDBContext = carDealerDBContext;
        }
        public DealerEntity GetDealerById(int id) => _carDealerDBContext.DealerEntity.Where(x => x.Id == id).FirstOrDefault();
        public ModelEntity GetModelById(int id) => _carDealerDBContext.ModelEntity.Where(x => x.Id == id).FirstOrDefault();
        public async Task<BookingEntityDTO> CreateBooking(BookingEntityDTO book)
        {
            BookingEntity newBooking = null;
            BookingEntityDTO result = null;
            var model = GetModelById(book.ModelId);
            var dealer = GetDealerById(book.DealerId);
            using var transaction = _carDealerDBContext.Database.BeginTransaction();
            try
            {
                newBooking = new BookingEntity
                {
                    Model = model,
                    Dealer = dealer,
                    Appointment = book.Appointment,
                    TimePeriod = book.TimePeriod,
                    Title = book.Title,
                    FullName = book.FullName,
                    Email = book.Email,
                    PhoneNumber = book.Email,
                    Note = book.Note,
                };
                _carDealerDBContext.BookingEntity.Add(newBooking);
                await _carDealerDBContext.SaveChangesAsync();
                await transaction.CommitAsync();
                result = new BookingEntityDTO()
                {
                    ModelId = book.ModelId,
                    DealerId = book.DealerId,
                    Appointment = newBooking.Appointment,
                    TimePeriod = newBooking.TimePeriod,
                    Title = newBooking.Title,
                    FullName = newBooking.FullName,
                    Email = newBooking.Email,
                    PhoneNumber = newBooking.PhoneNumber,
                    Note = newBooking.Note,
                };
                return result;
            }
            catch(Exception)
            {
                _logger.LogError("Can't Create Booking service! Pls try again.");
            }
            return result;
        }
        public async Task<List<BookingEntity>> GetBookList()
        {
            var bookList = await _carDealerDBContext.BookingEntity
                .Include(x => x.Dealer).AsSingleQuery()
                .Include(x => x.Model).AsSingleQuery()
                .ToListAsync();
            return bookList;
        }
    }
}
