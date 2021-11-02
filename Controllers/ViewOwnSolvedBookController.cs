using CarDealerProject.DTO.Request;
using CarDealerProject.Repositories.Entities;
using CarDealerProject.Services.ViewOwnSolvedBookService;
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
    public class ViewOwnSolvedBookController : ControllerBase
    {
        private readonly IViewOwnSolvedBookService _viewOwnSolvedBookService;
     
        public ViewOwnSolvedBookController(IViewOwnSolvedBookService viewOwnSolvedBookService)
        {
            _viewOwnSolvedBookService = viewOwnSolvedBookService;
        }

        [HttpGet("test/all")]
        public async Task<List<BookingEntity>> GetBookAll(string code)
        {
            var result = await _viewOwnSolvedBookService.ViewOwnAllBookingInDealer(code);
            return result;

        }
        [HttpGet("quote/all")]
        public async Task<List<BookingEntity>> GetBookQuoteAll(string code)
        {
         
            var result = await _viewOwnSolvedBookService.ViewOwnAllQuoteInDealer( code);
            return result;

        }
        [HttpGet("bookws/all")]
        public async Task<List<BookWorkshopEntity>> GetBookWSAll(string code)
        {
          
            var result = await _viewOwnSolvedBookService.ViewOwnAllBookWSInDealer( code);
            return result;
        }
        [HttpGet("test/list/")]
        public async Task<ActionResult<PagingResult<BookingEntity>>> GetListBookingInDealer(
          [FromQuery(Name = "pageSize")] int pageSize,
          string code,
          [FromQuery(Name = "pageIndex")] int pageIndex = 1)
        {

            var request = new PagingRequest
            {
                PageSize = pageSize,
                PageIndex = pageIndex
            };
       
            return Ok(await _viewOwnSolvedBookService.ViewOwnInDealer(request,  code));
        }
        [HttpGet("quote/list/")]
        public async Task<ActionResult<PagingResult<BookingEntity>>> GetListQuoteInDealer(
          [FromQuery(Name = "pageSize")] int pageSize,string code,
          [FromQuery(Name = "pageIndex")] int pageIndex = 1)
        {

            var request = new PagingRequest
            {
                PageSize = pageSize,
                PageIndex = pageIndex
            };

            return Ok(await _viewOwnSolvedBookService.ViewOwnQuoteInDealer(request, code));
        }
        [HttpGet("bookws/list/")]
        public async Task<ActionResult<PagingResult<BookWorkshopEntity>>> GetListBookWSInDealer(
        [FromQuery(Name = "pageSize")] int pageSize,string code,
        [FromQuery(Name = "pageIndex")] int pageIndex = 1)
        {
            var request = new PagingRequest
            {
                PageSize = pageSize,
                PageIndex = pageIndex,
            };
    
            return Ok(await _viewOwnSolvedBookService.ViewOwnBookWSInDealer(request, code));
        }
    }
}
