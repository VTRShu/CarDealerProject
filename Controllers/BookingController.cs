using CarDealerProject.DTO;
using CarDealerProject.Repositories.Entities;
using CarDealerProject.Services.BookingService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;
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
        [HttpGet("booking/list")]
        public async Task<List<BookingEntity>> GetBookList()
        {
            var result = await _bookingService.GetBookList();
            return result;
        }
    }
}
