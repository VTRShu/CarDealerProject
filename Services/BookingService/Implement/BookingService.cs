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
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerProject.Services.BookingService.Implement
{
    public class BookingService : IBookingService
    {
        private readonly ILogger<BookingService> _logger;
        private readonly CarDealerDBContext _carDealerDBContext;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
        public BookingService(CarDealerDBContext carDealerDBContext, ILogger<BookingService> logger, IEmailService emailService,IConfiguration configuration)
        {
            _logger = logger;
            _carDealerDBContext = carDealerDBContext;
            _emailService = emailService;
            _configuration = configuration;
        }
        public DealerEntity GetDealerById(int id) => _carDealerDBContext.DealerEntity.Where(x => x.Id == id).FirstOrDefault();
        public ModelEntity GetModelById(int id) => _carDealerDBContext.ModelEntity.Where(x => x.Id == id).FirstOrDefault();
        public ServiceEntity GetServiceById(int id) => _carDealerDBContext.ServiceEntity.Where(x => x.Id == id).FirstOrDefault();
        public async Task<BookingEntityDTO> CreateBooking(BookingEntityDTO book)
        {
            BookingEntity newBooking = null;
            BookingEntityDTO result = null;
            var model = GetModelById(book.ModelId);
            var dealer = GetDealerById(book.DealerId);
            var service = GetServiceById(book.ServiceId);
            using var transaction = _carDealerDBContext.Database.BeginTransaction();
            try
            {
                newBooking = new BookingEntity
                {
                    Model = model,
                    Dealer = dealer,
                    Appointment = book.Appointment,
                    TimePeriod = book.TimePeriod,
                    Title = book.Title,
                    FullName = book.FullName,
                    Email = book.Email,
                    PhoneNumber = book.PhoneNumber,
                    Note = book.Note,
                    IsAccepted = false,
                    Service = service,
                    SendEmailDate = book.Appointment.AddDays(-1),
                };
                
                
                var existedCustomer = _carDealerDBContext.CustomerEntity
                    .Where(x => x.PhoneNumber == book.PhoneNumber||x.Email == book.Email)
                    .FirstOrDefault();
                 List<BookingEntity> bookingList = new List<BookingEntity>();
                if (existedCustomer == null)
                {   
               
                bookingList.Add(newBooking);
                var newCustomer = new CustomerEntity
                    {
                        Title = book.Title,
                        FullName = book.FullName,
                        Email = book.Email,
                        PhoneNumber = book.PhoneNumber,
                        bookings = bookingList,
                    };
                    _carDealerDBContext.CustomerEntity.Add(newCustomer);
                }
                else
                {
                    existedCustomer.bookings = bookingList;
                    bookingList.Add(newBooking);
                    existedCustomer.bookings = bookingList;
                }
                string respondAccept = "Accept";
                string respondCancel = "Cancel";
                var date = book.Appointment.AddDays(-1);
                string urlCancel = $"{_configuration["AppUrl"]}/api/Booking/respond/booking/{newBooking.Id}-{respondCancel}";
                string urlAccept = $"{_configuration["AppUrl"]}/api/Booking/respond/booking/{newBooking.Id}-{respondAccept}";
                await _emailService.SendEmailAsync(newBooking.Email, "Confirm your booking", $"<h1>Hello {book.Title} {book.FullName}</h1><h2>Thank you for booking our service</h2>" +
                        $"<p>Please confirm your booking by <a href='{urlAccept}'>Clicking here to accept</a></p><p>If you have change your mind , pls cancel you booking by <a href='{urlCancel}'>Clicking here to cancel");
                _carDealerDBContext.BookingEntity.Add(newBooking);
                await _carDealerDBContext.SaveChangesAsync();
                await transaction.CommitAsync();

                result = new BookingEntityDTO()
                {
                    ModelId = book.ModelId,
                    DealerId = book.DealerId,
                    Appointment = newBooking.Appointment,
                    TimePeriod = newBooking.TimePeriod,
                    Title = newBooking.Title,
                    FullName = newBooking.FullName,
                    Email = newBooking.Email,
                    PhoneNumber = newBooking.PhoneNumber,
                    Note = newBooking.Note,
                    ServiceId = book.ServiceId,
                };
                return result;
            }
            catch(Exception)
            {
                _logger.LogError("Can't Create Booking service! Pls try again.");
            }
            return result;
        }

        public async Task<List<BookingEntity>> GetAllBooking()
        {
            var bookList = await _carDealerDBContext.BookingEntity
                .Include(x => x.Dealer).AsSingleQuery()
                .Include(x => x.Model).AsSingleQuery()
                .Include(x=>x.Service).AsSingleQuery()
                .ToListAsync();
            return bookList;
        }
        public async Task<List<BookingEntity>> GetAllBookingInDealer(string dealer)
        {
            var bookList = await _carDealerDBContext.BookingEntity.Where(x=>x.Dealer.Name == dealer)
                .Include(x => x.Dealer).AsSingleQuery()
                .Include(x => x.Model).AsSingleQuery()
                .Include(x => x.Service).AsSingleQuery()
                .ToListAsync();
            return bookList;
        }

        public async Task<PagingResult<BookingEntity>> GetListBooking(PagingRequest request)
        {
            var bookList = _carDealerDBContext.BookingEntity
               .Include(x => x.Dealer).AsSingleQuery()
                .Include(x => x.Model).AsSingleQuery()
                .Include(x => x.Service).AsSingleQuery();
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
        public async Task<PagingResult<BookingEntity>> GetListBookingInDealer(PagingRequest request,string dealer)
        {
            var bookList = _carDealerDBContext.BookingEntity.Where(x => x.Dealer.Name == dealer)
               .Include(x => x.Dealer).AsSingleQuery()
                .Include(x => x.Model).AsSingleQuery()
                .Include(x => x.Service).AsSingleQuery();
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
        public BookingEntity GetBookingById(int id) => _carDealerDBContext.BookingEntity.Where(x => x.Id == id).FirstOrDefault();
        public async Task<bool> RespondBooking(int id,string respond)
        {
            var book = GetBookingById(id);
            if (book != null && respond == "Accept")
            {
                book.IsAccepted = true;
                await _carDealerDBContext.SaveChangesAsync();
                return true;
            }
            else if(book != null && respond == "Cancel") {
                _carDealerDBContext.BookingEntity.Remove(book);
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
