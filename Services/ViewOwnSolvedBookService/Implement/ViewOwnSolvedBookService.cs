using CarDealerProject.DTO.Request;
using CarDealerProject.Repositories.EFContext;
using CarDealerProject.Repositories.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Services.ViewOwnSolvedBookService.Implement
{
    public class ViewOwnSolvedBookService : IViewOwnSolvedBookService
    {
        private readonly ILogger<ViewOwnSolvedBookService> _logger;
        private readonly CarDealerDBContext _carDealerDBContext;
        private readonly IConfiguration _configuration;
        public ViewOwnSolvedBookService(CarDealerDBContext carDealerDBContext, ILogger<ViewOwnSolvedBookService> logger, IConfiguration configuration)
        {
            _logger = logger;
            _carDealerDBContext = carDealerDBContext;
            _configuration = configuration;
        }
        public async Task<List<BookingEntity>> ViewOwnAllBookingInDealer( string code)
        {
            var bookList = await _carDealerDBContext.BookingEntity.Where(x => x.User.Code == code && x.Service.Id == 1)
              .Include(x => x.Dealer).AsSingleQuery()
              .Include(x => x.Model).AsSingleQuery()
              .Include(x => x.Service).AsSingleQuery()
               .Include(x => x.User).AsSingleQuery()
              .ToListAsync();
            return bookList;
        }

        public async Task<List<BookWorkshopEntity>> ViewOwnAllBookWSInDealer( string code)
        {
            var bookWSList = await _carDealerDBContext.BookWorkshopEntity.Where(x =>  x.User.Code == code)
           .Include(x => x.Dealer).AsSingleQuery()
            .Include(x => x.User).AsSingleQuery()
           .Include(x => x.Service).AsSingleQuery()
           .ToListAsync();
            return bookWSList;
        }

        public async Task<List<BookingEntity>> ViewOwnAllQuoteInDealer( string code)
        {
            var bookList = await _carDealerDBContext.BookingEntity.Where(x =>  x.User.Code == code && x.Service.Id == 6)
              .Include(x => x.Dealer).AsSingleQuery()
              .Include(x => x.Car).AsSingleQuery()
              .Include(x => x.Service).AsSingleQuery()
               .Include(x => x.User).AsSingleQuery()
              .ToListAsync();
            return bookList;
        }

        public async Task<PagingResult<BookWorkshopEntity>> ViewOwnBookWSInDealer(PagingRequest request, string code)
        {
            var bookWSList = _carDealerDBContext.BookWorkshopEntity.Where(x => x.User.Code == code)
            .Include(x => x.Dealer).AsSingleQuery()
           .Include(x => x.User).AsSingleQuery()
            .Include(x => x.Service).AsSingleQuery();
            int totalRow = await bookWSList.CountAsync();
            var data = await bookWSList.Skip((request.PageIndex - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();
            var pagedResult = new PagingResult<BookWorkshopEntity>()
            {
                Items = data,
                TotalRecords = totalRow,
                PageSize = request.PageSize,
                PageIndex = request.PageIndex,
            };
            return pagedResult;
        }

        public async Task<PagingResult<BookingEntity>> ViewOwnInDealer(PagingRequest request,  string code)
        {
            var bookList = _carDealerDBContext.BookingEntity.Where(x =>  x.Service.Id == 1 && x.User.Code==code)
               .Include(x => x.Dealer).AsSingleQuery()
                .Include(x => x.Model).AsSingleQuery()
                .Include(x => x.Service).AsSingleQuery()
             .Include(x => x.User).AsSingleQuery();
            int totalRow = await bookList.CountAsync();
            var data = await bookList.Skip((request.PageIndex - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();
            var pagedResult = new PagingResult<BookingEntity>()
            {
                Items = data,
                TotalRecords = totalRow,
                PageSize = request.PageSize,
                PageIndex = request.PageIndex,
            };

            return pagedResult;
        }

        public async Task<PagingResult<BookingEntity>> ViewOwnQuoteInDealer(PagingRequest request,  string code)
        {
            var bookList = _carDealerDBContext.BookingEntity.Where(x => x.Service.Id == 6 && x.User.Code == code)
               .Include(x => x.Dealer).AsSingleQuery()
                .Include(x => x.Car).AsSingleQuery()
                .Include(x => x.Service).AsSingleQuery()
             .Include(x => x.User).AsSingleQuery();
            int totalRow = await bookList.CountAsync();
            var data = await bookList.Skip((request.PageIndex - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();
            var pagedResult = new PagingResult<BookingEntity>()
            {
                Items = data,
                TotalRecords = totalRow,
                PageSize = request.PageSize,
                PageIndex = request.PageIndex,
            };

            return pagedResult;
        }
    }
}
