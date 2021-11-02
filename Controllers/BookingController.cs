using CarDealerProject.DTO;
using CarDealerProject.DTO.Request;
using CarDealerProject.Repositories.Entities;
using CarDealerProject.Services.BookingService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CarDealerProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;
        protected string GetUserDealer()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            return claimsIdentity.FindFirst(ClaimTypes.Locality).Value;
        }
        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }
        [HttpPost("booking/create")]
        public async Task<ActionResult<BookingEntityDTO>> Create(BookingEntityDTO book)
        {
            var newBooking = await _bookingService.CreateBooking(book);
            if(newBooking == null)
            {
                return BadRequest("Can't create booking service , pls try again!");
            }
            return Ok(newBooking);
        }
        [HttpPost("quote/create")]
        public async Task<ActionResult<BookingEntityDTO>> CreateQuote(BookingEntityDTO book)
        {
            var newQuote = await _bookingService.CreateQuote(book);
            if(newQuote == null)
            {
                return BadRequest("Can't create Quote request , pls try again!");
            }
            else
            {
                return Ok(newQuote);
            }    
        }    
        [HttpGet("booking/all")]
        public async Task<List<BookingEntity>> GetBookAll()
        {
            var result = await _bookingService.GetAllBooking();
            return result;
        }
        [HttpGet("booking/all/dealer")]
        public async Task<List<BookingEntity>> GetBookAllDealer()
        {   
            var dealer = GetUserDealer();
            var result = await _bookingService.GetAllBookingInDealer(dealer);
            return result;
        }
        [HttpGet("quote/all")]
        public async Task<List<BookingEntity>> GetQuoteAll()
        {
            var result = await _bookingService.GetAllQuote();
            return result;
        }
        [HttpGet("quote/all/dealer")]
        public async Task<List<BookingEntity>> GetQuoteAllDealer()
        {
            var dealer = GetUserDealer();
            var result = await _bookingService.GetAllQuoteInDealer(dealer);
            return result;
        }
        [HttpGet("respond/booking/{id}-{respond}")]
        public async Task<ActionResult<BookingEntity>> RespondBooking(int id, string respond)
        {
             var updateBooking = await _bookingService.RespondBooking(id, respond);
            if (updateBooking)
            {
                 return Ok(updateBooking);
            }
           return BadRequest("Error !!!");
        }
        [HttpGet("complete/{id}-{respond}")]
        public async Task<ActionResult<BookingEntity>> CompleteBooking(int id,string respond)
        {
            var completeBook = await _bookingService.CompleteBooking(id,respond);
            if(completeBook)
            {
                return Ok(completeBook);
            }
            return BadRequest("Error !!!");
        }
        [HttpPut("update/{id}-{code}")]
        public async Task<ActionResult<BookingEntity>> UpdateBook(BookingEntityDTO book, int id,string code)
        {
            var updateBook = await _bookingService.UpdateBookingInfor(book, code, id);
            if (updateBook == null)
            {
                return BadRequest("Error!!");
            }
            return Ok(updateBook);
        }
        [HttpPut("update/quote/{id}-{code}")]
        public async Task<ActionResult<BookingEntity>> UpdateBookQuote(BookingEntityDTO book, int id, string code)
        {
            var updateBook = await _bookingService.UpdateBookingQuoteInfor(book, code, id);
            if (updateBook == null)
            {
                return BadRequest("Error!!");
            }
            return Ok(updateBook);
        }
        [HttpGet("list/dealer/")]
        public async Task<ActionResult<PagingResult<BookingEntity>>> GetListBookingInDealer(
           [FromQuery(Name = "pageSize")] int pageSize,
           [FromQuery(Name = "pageIndex")] int pageIndex = 1)
        {

            var request = new PagingRequest
            {
                PageSize = pageSize,
                PageIndex = pageIndex
            };
            var dealer = GetUserDealer();
            return Ok(await _bookingService.GetListBookingInDealer(request, dealer));
        }
        [HttpGet("quote/list/dealer/")]
        public async Task<ActionResult<PagingResult<BookingEntity>>> GetListQuoteInDealer(
          [FromQuery(Name = "pageSize")] int pageSize,
          [FromQuery(Name = "pageIndex")] int pageIndex = 1)
        {

            var request = new PagingRequest
            {
                PageSize = pageSize,
                PageIndex = pageIndex
            };
            var dealer = GetUserDealer();
            return Ok(await _bookingService.GetListQuoteInDealer(request, dealer));
        }
        [HttpGet("list/")]
        public async Task<ActionResult<PagingResult<BookingEntity>>> GetListBooking(
          [FromQuery(Name = "pageSize")] int pageSize,
          [FromQuery(Name = "pageIndex")] int pageIndex = 1)
        {

            var request = new PagingRequest
            {
                PageSize = pageSize,
                PageIndex = pageIndex
            };
            
            return Ok(await _bookingService.GetListBooking(request));
        }
        [HttpGet("quote/list/")]
        public async Task<ActionResult<PagingResult<BookingEntity>>> GetListQuote(
         [FromQuery(Name = "pageSize")] int pageSize,
         [FromQuery(Name = "pageIndex")] int pageIndex = 1)
        {

            var request = new PagingRequest
            {
                PageSize = pageSize,
                PageIndex = pageIndex
            };

            return Ok(await _bookingService.GetListQuote(request));
        }
        [HttpGet("get/{id}")]
        public  BookingEntity GetBooking(int id)
        {   
            return _bookingService.GetBookInfo(id);
        }
    }
}
