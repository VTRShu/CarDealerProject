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
    public class BookWorkshopController : ControllerBase
    {
        private readonly IBookWorkShopService _bookWorkshopService;
        protected string GetUserDealer()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            return claimsIdentity.FindFirst(ClaimTypes.Locality).Value;
        }
        public BookWorkshopController(IBookWorkShopService bookWorkshopService)
        {
            _bookWorkshopService = bookWorkshopService;
        }
        [HttpPost("/bookws/create")]
        public async Task<ActionResult<BookWorkshopEntityDTO>> Create(BookWorkshopEntityDTO book)
        {
            var newBook = await _bookWorkshopService.CreateBookWorkshop(book);
            if (newBook == null)
            {
                return BadRequest("Can't create book Workshop service");
            }
            return Ok(newBook);
        }

        [HttpPut("update/{id}-{code}")]
        public async Task<ActionResult<BookWorkshopEntity>> UpdateBookWS(BookWorkshopEntityDTO book, int id, string code)
        {
            var updateBook = await _bookWorkshopService.UpdateBookingWSInfor(book, code, id);
            if (updateBook == null)
            {
                return BadRequest("Error!!");
            }
            return Ok(updateBook);
        }

        [HttpGet("all")]
        public async Task<List<BookWorkshopEntity>> GetAllBookWS()
        {
            var result = await _bookWorkshopService.GetAllBookWorkshop();
            return result;
        }
        [HttpGet("all/dealer")]
        public async Task<List<BookWorkshopEntity>> GetAllBookWSDealer()
        {
            var dealer = GetUserDealer();
            var result = await _bookWorkshopService.GetAllBookWSInDealer(dealer);
            return result;
        }
        [HttpGet("respond/book/{id}-{respond}")]
        public async Task<ActionResult<BookWorkshopEntity>> RespondBooking(int id, string respond)
        {
            var updateBook = await _bookWorkshopService.RespondBookWorkshop(id, respond);
            if (updateBook)
            {
                return Ok(updateBook);
            }
            else
            {
                return BadRequest("Error!!");
            }
        }

        [HttpGet("complete/{id}-{respond}")]
        public async Task<ActionResult<BookWorkshopEntity>> CompleteBookWS(int id,string respond)
        {
            var completeBookWS = await _bookWorkshopService.CompleteBookWS(id, respond);
            if (completeBookWS)
            {
                return Ok(completeBookWS);
            }
            else
            {
                return BadRequest("Error!!");
            }
        }

        [HttpGet("get/{id}")]
        public BookWorkshopEntity GetBookWS(int id)
        {
            return _bookWorkshopService.GetBookWSInfo(id);
        }
        [HttpGet("list/dealer")]
        public async Task<ActionResult<PagingResult<BookWorkshopEntity>>> GetListBookWSInDealer(
        [FromQuery(Name = "pageSize")] int pageSize,
        [FromQuery(Name = "pageIndex")] int pageIndex = 1)
        {
            var request = new PagingRequest
            {
                PageSize = pageSize,
                PageIndex = pageIndex,
            };
            var dealer = GetUserDealer();
            return Ok(await _bookWorkshopService.GetListBookWSInDealer(request, dealer));
        }
        [HttpGet("list")]
        public async Task<ActionResult<PagingResult<BookWorkshopEntity>>> GetListBookWS(
        [FromQuery(Name = "pageSize")] int pageSize,
        [FromQuery(Name = "pageIndex")] int pageIndex = 1)
        {
            var request = new PagingRequest
            {
                PageSize = pageSize,
                PageIndex = pageIndex,
            };
            return Ok(await _bookWorkshopService.GetListBookWS(request));
        }
    }
}
