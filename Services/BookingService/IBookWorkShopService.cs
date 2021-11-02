using CarDealerProject.DTO;
using CarDealerProject.DTO.Request;
using CarDealerProject.Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Services.BookingService
{
    public interface IBookWorkShopService
    {
        Task<BookWorkshopEntityDTO> CreateBookWorkshop(BookWorkshopEntityDTO book);
        Task<List<BookWorkshopEntity>> GetAllBookWorkshop();
        Task<bool> RespondBookWorkshop(int id, string respond);
        Task<PagingResult<BookWorkshopEntity>> GetListBookWSInDealer(PagingRequest request, string dealer);
        Task<PagingResult<BookWorkshopEntity>> GetListBookWS(PagingRequest request);
        Task<List<BookWorkshopEntity>> GetAllBookWSInDealer(string dealer);
        Task<bool> CompleteBookWS(int id,string respond);
        Task<BookWorkshopEntity> UpdateBookingWSInfor(BookWorkshopEntityDTO updateBook, string code, int id);
        BookWorkshopEntity GetBookWSInfo(int id);
    }
}
