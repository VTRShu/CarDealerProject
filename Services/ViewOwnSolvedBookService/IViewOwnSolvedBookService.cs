using CarDealerProject.DTO.Request;
using CarDealerProject.Repositories.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Services.ViewOwnSolvedBookService
{
    public interface IViewOwnSolvedBookService
    {    
        //Request for quote
        Task<PagingResult<BookingEntity>> ViewOwnQuoteInDealer(PagingRequest request,string code);
        Task<List<BookingEntity>> ViewOwnAllQuoteInDealer( string code);
        
        //Test Drive
        Task<PagingResult<BookingEntity>> ViewOwnInDealer(PagingRequest request,  string code);
        Task<List<BookingEntity>> ViewOwnAllBookingInDealer(string code);

        //Book workshop
        Task<PagingResult<BookWorkshopEntity>> ViewOwnBookWSInDealer(PagingRequest request,  string code);
        Task<List<BookWorkshopEntity>> ViewOwnAllBookWSInDealer( string code);
    }
}
