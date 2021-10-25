using CarDealerProject.DTO;
using CarDealerProject.DTO.Request;
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
        Task<List<BookingEntity>> GetAllBooking();
        Task<List<BookingEntity>> GetAllQuote();
        Task<bool> RespondBooking(int id, string respond);
        Task<PagingResult<BookingEntity>> GetListBookingInDealer(PagingRequest request, string dealer);
        Task<PagingResult<BookingEntity>> GetListBooking(PagingRequest request);
        Task<List<BookingEntity>> GetAllBookingInDealer(string dealer);
        Task<List<BookingEntity>> GetAllQuoteInDealer(string dealer);
        Task<bool> CompleteBooking(int id);
        Task<BookingEntityDTO> CreateQuote(BookingEntityDTO book);
        Task<PagingResult<BookingEntity>> GetListQuoteInDealer(PagingRequest request, string dealer);
        Task<PagingResult<BookingEntity>> GetListQuote(PagingRequest request);
    }
}
