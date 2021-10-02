using CarDealerProject.DTO;
using CarDealerProject.Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Services.BookingService
{
    public interface IBookingService
    {
        Task<BookingEntityDTO> CreateBooking(BookingEntityDTO book);
        Task<List<BookingEntity>> GetBookList();
    }
}
