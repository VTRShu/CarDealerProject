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
    }
}
