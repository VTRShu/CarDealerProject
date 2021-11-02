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
        //test drive booking
        Task<BookingEntityDTO> CreateBooking(BookingEntityDTO book);
        Task<List<BookingEntity>> GetAllBooking();
        Task<PagingResult<BookingEntity>> GetListBookingInDealer(PagingRequest request, string dealer);
        BookingEntity GetBookInfo(int id);
        Task<PagingResult<BookingEntity>> GetListBooking(PagingRequest request);
        Task<List<BookingEntity>> GetAllBookingInDealer(string dealer);
        
        //process booking
        Task<bool> RespondBooking(int id, string respond);
        Task<bool> CompleteBooking(int id,string respond);
        Task<BookingEntity> UpdateBookingInfor(BookingEntityDTO updateBook, string code, int id);
        Task<BookingEntity> UpdateBookingQuoteInfor(BookingEntityDTO updateBook, string code, int id);
        
        //Request For quote
        Task<List<BookingEntity>> GetAllQuote();
        Task<List<BookingEntity>> GetAllQuoteInDealer(string dealer);
        Task<BookingEntityDTO> CreateQuote(BookingEntityDTO book);
        Task<PagingResult<BookingEntity>> GetListQuoteInDealer(PagingRequest request, string dealer);
        Task<PagingResult<BookingEntity>> GetListQuote(PagingRequest request);
      
    }
}
