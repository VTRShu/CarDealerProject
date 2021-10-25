using CarDealerProject.DTO;
using CarDealerProject.DTO.Request;
using CarDealerProject.Repositories.EFContext;
using CarDealerProject.Repositories.Entities;
using CarDealerProject.Services.EmailService;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Services.BookingService.Implement
{
    public class BookWorkshopService : IBookWorkShopService
    {
        private readonly ILogger<BookWorkshopService> _logger;
        private readonly CarDealerDBContext _carDealerDBContext;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
        public BookWorkshopService(CarDealerDBContext carDealerDBContext, ILogger<BookWorkshopService> logger, IEmailService emailService, IConfiguration configuration)
        {
            _logger = logger;
            _carDealerDBContext = carDealerDBContext;
            _emailService = emailService;
            _configuration = configuration;
        }
        public BookWorkshopEntity GetBookWSById(int id) => _carDealerDBContext.BookWorkshopEntity.Where(x => x.Id == id).FirstOrDefault();
        public DealerEntity GetDealerById(int id) => _carDealerDBContext.DealerEntity.Where(x => x.Id == id).FirstOrDefault();
        public ServiceEntity GetServiceById(int id) => _carDealerDBContext.ServiceEntity.Where(x => x.Id == id).FirstOrDefault();
        public async Task<bool> CompleteBookWS(int id)
        {
            var book = GetBookWSById(id);
            if (book != null)
            {
                book.Status = true;
                await _carDealerDBContext.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<BookWorkshopEntityDTO> CreateBookWorkshop(BookWorkshopEntityDTO book)
        {
            BookWorkshopEntity newBook = null;
            BookWorkshopEntityDTO result = null;
            var dealer = GetDealerById(book.DealerId);
            var service = GetServiceById(book.ServiceId);
            using var transaction = _carDealerDBContext.Database.BeginTransaction();
            try
            {
                newBook = new BookWorkshopEntity
                {
                    Dealer = dealer,
                    LicensePlate = book.LicensePlate,
                    Mileage = book.Mileage,
                    CarIdentification = book.CarIdentification,
                    Appointment = book.Appointment,
                    TimePeriod = book.TimePeriod,
                    Title = book.Title,
                    FullName = book.FullName,
                    Email = book.Email,
                    PhoneNumber = book.PhoneNumber,
                    IsAccepted = false,
                    Service = service,
                    Status = false,
                    SpecificRequest = book.SpecificRequest,
                };
                var existedCustomer = _carDealerDBContext.CustomerEntity
                   .Where(x => x.PhoneNumber == book.PhoneNumber || x.Email == book.Email)
                   .FirstOrDefault();
                List<BookWorkshopEntity> bookWSList = new List<BookWorkshopEntity>();
                if (existedCustomer == null)
                {
                    bookWSList.Add(newBook);
                    var newCustomer = new CustomerEntity
                    {
                        Title = book.Title,
                        FullName = book.FullName,
                        Email = book.Email,
                        PhoneNumber = book.PhoneNumber,
                        bookWorkshops = bookWSList,
                    };
                    _carDealerDBContext.CustomerEntity.Add(newCustomer);
                }
                else
                {
                    existedCustomer.bookWorkshops = bookWSList;
                    bookWSList.Add(newBook);
                    existedCustomer.bookWorkshops = bookWSList;
                }
                string respondAccept = "Accept";
                string respondCancel = "Cancel";
                var dateFormat = newBook.Appointment.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture);
                await _carDealerDBContext.SaveChangesAsync();
                await transaction.CommitAsync();
                string urlCancel = $"{_configuration["AppUrl"]}/api/BookWorkshop/respond/book/{newBook.Id}-{respondCancel}";
                string urlAccept = $"{_configuration["AppUrl"]}/api/BookWorkshop/respond/book/{newBook.Id}-{respondAccept}";
                await _emailService.SendEmailAsync(newBook.Email, "Confirm your booking", $"<h1>Hello {book.Title} {book.FullName}</h1><h2>Thank you for booking our WorkShop Service</h2>" +
                        $"<p>You set up an appointment in <b>{dateFormat}</b> in the <b>{newBook.TimePeriod}</b></p><p>Your car License Plate : <b>{newBook.LicensePlate}</b></p><p>Work Shop services Booked: <b>{newBook.SpecificRequest}</b></p><p>Please confirm your booking by <button><a href='{urlAccept}'>Accept</a></button></p><p>If you have change your mind , pls cancel you booking by <button><a href='{urlCancel}'>Cancel</a></button>");
                _carDealerDBContext.BookWorkshopEntity.Add(newBook);
                result = new BookWorkshopEntityDTO()
                {
                    DealerId = book.DealerId,
                    ServiceId = book.ServiceId,
                    Appointment = newBook.Appointment,
                    TimePeriod = newBook.TimePeriod,
                    Title = newBook.Title,
                    FullName = newBook.FullName,
                    Email = newBook.Email,
                    PhoneNumber = newBook.PhoneNumber,
                    SpecificRequest = newBook.SpecificRequest,
                    LicensePlate = newBook.LicensePlate,
                    Mileage = newBook.Mileage,
                    CarIdentification = newBook.CarIdentification,
                };
                return result;
            }
            catch (Exception)
            {
                _logger.LogError("Can't Create Booking service! Pls try again.");
            }
            return result;
        }

        public async Task<List<BookWorkshopEntity>> GetAllBookWorkshop()
        {
            var bookWSList = await _carDealerDBContext.BookWorkshopEntity
            .Include(x => x.Dealer).AsSingleQuery()
            .Include(x => x.Service).AsSingleQuery()
            .ToListAsync();
            return bookWSList;
        }

        public async Task<List<BookWorkshopEntity>> GetAllBookWSInDealer(string dealer)
        {
            var bookWSList = await _carDealerDBContext.BookWorkshopEntity.Where(x => x.Dealer.Name == dealer)
            .Include(x => x.Dealer).AsSingleQuery()
            .Include(x => x.Service).AsSingleQuery()
            .ToListAsync();
            return bookWSList;
        }

        public async Task<PagingResult<BookWorkshopEntity>> GetListBookWS(PagingRequest request)
        {
            var bookWSList = _carDealerDBContext.BookWorkshopEntity
            .Include(x => x.Dealer).AsSingleQuery()
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

        public async Task<PagingResult<BookWorkshopEntity>> GetListBookWSInDealer(PagingRequest request, string dealer)
        {
            var bookWSList = _carDealerDBContext.BookWorkshopEntity.Where(x => x.Dealer.Name == dealer)
           .Include(x => x.Dealer).AsSingleQuery()
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

        public async Task<bool> RespondBookWorkshop(int id, string respond)
        {
            var book = GetBookWSById(id);
            if (book != null && respond == "Accept")
            {
                book.IsAccepted = true;
                await _carDealerDBContext.SaveChangesAsync();
                return true;
            }
            else if (book != null && respond == "Cancel")
            {
                _carDealerDBContext.BookWorkshopEntity.Remove(book);
                await _carDealerDBContext.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
