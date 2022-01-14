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
    public class BookingService : IBookingService
    {
        private readonly ILogger<BookingService> _logger;
        private readonly CarDealerDBContext _carDealerDBContext;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
        public BookingService(CarDealerDBContext carDealerDBContext, ILogger<BookingService> logger, IEmailService emailService, IConfiguration configuration)
        {
            _logger = logger;
            _carDealerDBContext = carDealerDBContext;
            _emailService = emailService;
            _configuration = configuration;
        }
        public DealerEntity GetDealerByName(string name) => _carDealerDBContext.DealerEntity.Where(x => x.Name == name).FirstOrDefault();
        public ModelEntity GetModelByName(string name) => _carDealerDBContext.ModelEntity.Where(x => x.Name == name).FirstOrDefault();
        public ServiceEntity GetServiceById(int id) => _carDealerDBContext.ServiceEntity.Where(x => x.Id == id).FirstOrDefault();
        public CarEntity GetCarById(int id) => _carDealerDBContext.CarEntity.Where(x => x.Id == id).FirstOrDefault();
        public async Task<BookingEntityDTO> CreateQuote(BookingEntityDTO book)
        {
            BookingEntity newQuote = null;
            BookingEntityDTO result = null;
            var car = GetCarById(book.CarId);
            var dealer = GetDealerByName(book.Dealer);
            var service = GetServiceById(book.ServiceId);
            using var transaction = _carDealerDBContext.Database.BeginTransaction();
            try
            {
                newQuote = new BookingEntity
                {
                    Car = car,
                    Model = null,
                    Dealer = dealer,
                    Appointment = DateTime.Now,
                    TimePeriod = book.TimePeriod,
                    Title = book.Title,
                    FullName = book.FullName,
                    Email = book.Email,
                    PhoneNumber = book.PhoneNumber,
                    Note = book.Note,
                    IsAccepted = false,
                    Service = service,
                    Status = false,
                };
                var existedCustomer = _carDealerDBContext.CustomerEntity
                   .Where(x => x.PhoneNumber == book.PhoneNumber || x.Email == book.Email)
                   .FirstOrDefault();
                List<BookingEntity> bookingList = new List<BookingEntity>();
                if (existedCustomer == null)
                {

                    bookingList.Add(newQuote);
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
                    bookingList.Add(newQuote);
                    existedCustomer.bookings = bookingList;
                }
                await _carDealerDBContext.SaveChangesAsync();
                await transaction.CommitAsync();
                _carDealerDBContext.BookingEntity.Add(newQuote);
                result = new BookingEntityDTO()
                {
                    CarId = book.CarId,
                    Dealer = book.Dealer,
                    Appointment = newQuote.Appointment,
                    TimePeriod = null,
                    Title = newQuote.Title,
                    FullName = newQuote.FullName,
                    Email = newQuote.Email,
                    PhoneNumber = newQuote.PhoneNumber,
                    Note = newQuote.Note,
                    ServiceId = book.ServiceId,
                };
                return result;
            }
            catch (Exception)
            {
                _logger.LogError("Can't Create Booking service! Pls try again.");
            }
            return result;
        }
        public async Task<BookingEntityDTO> CreateBooking(BookingEntityDTO book)
        {
            BookingEntity newBooking = null;
            BookingEntityDTO result = null;
            var model = GetModelByName(book.Model);
            var dealer = GetDealerByName(book.Dealer);
            var service = GetServiceById(book.ServiceId);
            using var transaction = _carDealerDBContext.Database.BeginTransaction();
            try
            {
                newBooking = new BookingEntity
                {
                    Car = null,
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
                    Status = false,
                };


                var existedCustomer = _carDealerDBContext.CustomerEntity
                    .Where(x => x.PhoneNumber == book.PhoneNumber || x.Email == book.Email)
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
                var dateFormat = newBooking.Appointment.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture);
                string respondAccept = "Accept";
                string respondCancel = "Cancel";

                await _carDealerDBContext.SaveChangesAsync();
                await transaction.CommitAsync();
                string urlCancel = $"{_configuration["AppUrl"]}/api/Booking/respond/booking/{newBooking.Id}-{respondCancel}";
                string urlAccept = $"{_configuration["AppUrl"]}/api/Booking/respond/booking/{newBooking.Id}-{respondAccept}";
                await _emailService.SendEmailAsync(newBooking.Email, "Confirm your booking", $"<h1>Hello {book.Title} {book.FullName}</h1><h2>Thank you for booking our service</h2>" +
                        $"<h4>Your booking test drive information:</h4><p>You want to test the model <b>{newBooking.Model.Name}</b> on <b>{dateFormat}</b> in the <b>{book.TimePeriod}</b> </p><p>Location: <b>{newBooking.Dealer.Description}</b></p><p>Please confirm your booking by <button><a href='{urlAccept}'>Accept</a></button></p><p>If you have change your mind , pls cancel your booking by <button><a href='{urlCancel}'>Cancel</a></button>");
                _carDealerDBContext.BookingEntity.Add(newBooking);
                result = new BookingEntityDTO()
                {
                    Model = book.Model,
                    Dealer = book.Dealer,
                    Appointment = newBooking.Appointment,
                    TimePeriod = newBooking.TimePeriod,
                    Note = newBooking.Note,
                    ServiceId = book.ServiceId,
                };
                return result;
            }
            catch (Exception)
            {
                _logger.LogError("Can't Create Booking service! Pls try again.");
            }
            return result;
        }

        public async Task<List<BookingEntity>> GetAllBooking()
        {
            var bookList = await _carDealerDBContext.BookingEntity.Where(x => x.Service.Id == 1)
                .Include(x => x.Dealer).AsSingleQuery()
                .Include(x => x.Model).AsSingleQuery()
                .Include(x => x.Service).AsSingleQuery()
                 .Include(x => x.User).AsSingleQuery()
                .ToListAsync();
            return bookList;
        }
        public async Task<List<BookingEntity>> GetAllBookingInDealer(string dealer)
        {
            var bookList = await _carDealerDBContext.BookingEntity.Where(x => x.Dealer.Name == dealer && x.Service.Id == 1)
                .Include(x => x.Dealer).AsSingleQuery()
                .Include(x => x.Model).AsSingleQuery()
                .Include(x => x.Service).AsSingleQuery()
                 .Include(x => x.User).AsSingleQuery()
                .ToListAsync();
            return bookList;
        }
        public async Task<List<BookingEntity>> GetAllQuote()
        {
            var bookList = await _carDealerDBContext.BookingEntity.Where(x => x.Service.Id == 6)
                .Include(x => x.Dealer).AsSingleQuery()
                .Include(x => x.Car).AsSingleQuery()
                .Include(x => x.Service).AsSingleQuery()
                 .Include(x => x.User).AsSingleQuery()
                .ToListAsync();
            return bookList;
        }
        public async Task<List<BookingEntity>> GetAllQuoteInDealer(string dealer)
        {
            var bookList = await _carDealerDBContext.BookingEntity.Where(x => x.Dealer.Name == dealer && x.Service.Id == 6)
                .Include(x => x.Dealer).AsSingleQuery()
                .Include(x => x.Car).AsSingleQuery()
                .Include(x => x.Service).AsSingleQuery()
                 .Include(x => x.User).AsSingleQuery()
                .ToListAsync();
            return bookList;
        }
        public async Task<PagingResult<BookingEntity>> GetListBooking(PagingRequest request)
        {
            var bookList = _carDealerDBContext.BookingEntity.Where(x => x.Service.Id == 1)
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
        public async Task<PagingResult<BookingEntity>> GetListBookingInDealer(PagingRequest request, string dealer)
        {
            var bookList = _carDealerDBContext.BookingEntity.Where(x => x.Dealer.Name == dealer && x.Service.Id == 1)
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
        public async Task<PagingResult<BookingEntity>> GetListQuoteInDealer(PagingRequest request, string dealer)
        {
            var bookList = _carDealerDBContext.BookingEntity.Where(x => x.Dealer.Name == dealer && x.Service.Id == 6)
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
        public async Task<PagingResult<BookingEntity>> GetListQuote(PagingRequest request)
        {
            var bookList = _carDealerDBContext.BookingEntity.Where(x => x.Service.Id == 6)
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
        public BookingEntity GetBookingById(int id) => _carDealerDBContext.BookingEntity.Where(x => x.Id == id)
            .Include(x => x.Car).AsSingleQuery()
            .Include(x => x.Dealer).AsSingleQuery()
            .Include(x => x.Model).AsSingleQuery()
            .Include(x => x.FileRecord).AsSingleQuery()
            .Include(x => x.Service).AsSingleQuery()
            .Include(x => x.User).AsSingleQuery()
            .FirstOrDefault();
        public async Task<bool> RespondBooking(int id, string respond)
        {
            var book = GetBookingById(id);
            if (book != null && respond == "Accept")
            {
                book.IsAccepted = true;
                await _carDealerDBContext.SaveChangesAsync();
                return true;
            }
            else if (book != null && respond == "Cancel")
            {
                if (book.IsAccepted == true)
                {
                    return false;
                }
                else
                {
                    _carDealerDBContext.BookingEntity.Remove(book);
                    await _carDealerDBContext.SaveChangesAsync();
                    return true;
                }
            }
            else
            {
                return false;
            }
        }
        public async Task<bool> CompleteBooking(int id, string respond)
        {
            var book = GetBookingById(id);
            if (book != null && respond == "Accept")
            {
                book.Status = true;
                var user = GetUserByCode(book.User.Code);
                List<BookingEntity> solvedList = new List<BookingEntity>();
                user.SolvedBooking = solvedList;
                solvedList.Add(book);
                user.SolvedBooking = solvedList;
                await _carDealerDBContext.SaveChangesAsync();
                return true;
            }
            else if (book != null && respond == "Cancel")
            {
                if (book.Status == true)
                {
                    return false;
                }
                else
                {
                    book.Status = false;
                    book.SpecificRequest = null;
                    book.StaffAnswer = null;
                    book.User = null;
                    book.FileRecord = null;
                    await _carDealerDBContext.SaveChangesAsync();
                    return true;
                }
            }
            else
            {
                return false;
            }
        }
        public ImageEntity GetFileByName(string name) => _carDealerDBContext.ImageEntity.Where(x => x.ImageName == name).FirstOrDefault();
        public AppUser GetUserByCode(string code) => _carDealerDBContext.AppUsers.Where(x => x.Code == code).FirstOrDefault();
        public async Task<BookingEntity> UpdateBookingQuoteInfor(BookingEntityDTO updateBook, string code, int id)
        {
            using var transaction = _carDealerDBContext.Database.BeginTransaction();

            BookingEntity result = null;
            try
            {

                var existBooking = GetBookingById(id);
                var fileRecord = GetFileByName(updateBook.FileRecordName);
                if (existBooking != null)
                {
                    var user = GetUserByCode(code);
                    existBooking.User = user;
                    existBooking.SpecificRequest = updateBook.SpecificRequest;
                    existBooking.StaffAnswer = updateBook.StaffAnswer;
                    existBooking.FileRecord = fileRecord;
                    _carDealerDBContext.Entry(existBooking).State = EntityState.Modified;


                    string respondAccept = "Accept";
                    string respondCancel = "Cancel";


                    string urlCancel = $"{_configuration["AppUrl"]}/api/Booking/complete/{existBooking.Id}-{respondCancel}";
                    string urlAccept = $"{_configuration["AppUrl"]}/api/Booking/complete/{existBooking.Id}-{respondAccept}";
                    await _emailService.SendEmailAsync(existBooking.Email, "Confirm your request for quote", $"<h1>Hello {existBooking.Title} {existBooking.FullName}</h1><h2>Thank you for using our service</h2>" +
                            $"<p>Your need : {updateBook.SpecificRequest}</p><p>We answer:{updateBook.StaffAnswer}</p><p>Please confirm that information is correct by <button><a href='{urlAccept}'> Yes</a></button></p><p>If not , pls let us know by <button><a href='{urlCancel}'>No</a></button>");

                    await _carDealerDBContext.SaveChangesAsync();
                    await transaction.CommitAsync();
                    result = new BookingEntity()
                    {
                        Id = existBooking.Id,
                        Car = existBooking.Car,
                        Model = existBooking.Model,
                        Dealer = existBooking.Dealer,
                        Appointment = existBooking.Appointment,
                        TimePeriod = existBooking.TimePeriod,
                        Title = existBooking.Title,
                        FileRecord = existBooking.FileRecord,
                        FullName = existBooking.FullName,
                        Email = existBooking.Email,
                        SpecificRequest = existBooking.SpecificRequest,
                        StaffAnswer = existBooking.StaffAnswer,
                        PhoneNumber = existBooking.PhoneNumber,
                        Service = existBooking.Service,
                        IsAccepted = existBooking.IsAccepted,
                        Status = existBooking.Status,
                        Note = existBooking.Note,
                        User = existBooking.User
                    };
                }
                else
                {
                    return null;
                }
            }
            catch
            {
                _logger.LogError("Couldn't Update Booking");
            }
            return result;
        }
        public async Task<BookingEntity> UpdateBookingInfor(BookingEntityDTO updateBook, string code, int id)
        {
            using var transaction = _carDealerDBContext.Database.BeginTransaction();

            BookingEntity result = null;
            try
            {
                var existBooking = GetBookingById(id);
                if (existBooking != null)
                {
                    var user = GetUserByCode(code);
                    existBooking.User = user;
                    existBooking.SpecificRequest = updateBook.SpecificRequest;
                    _carDealerDBContext.Entry(existBooking).State = EntityState.Modified;
                    string respondAccept = "Accept";
                    string respondCancel = "Cancel";

                    string urlCancel = $"{_configuration["AppUrl"]}/api/Booking/complete/{existBooking.Id}-{respondCancel}";
                    string urlAccept = $"{_configuration["AppUrl"]}/api/Booking/complete/{existBooking.Id}-{respondAccept}";
                    await _emailService.SendEmailAsync(existBooking.Email, "Confirm your test drive", $"<h1>Hello {existBooking.Title} {existBooking.FullName}</h1><h2>Thank you for using our service</h2>" +
                            $"<p>Your FeedBack : {updateBook.SpecificRequest}</p><p>Please confirm that information is correct by <button><a href='{urlAccept}'> Yes</a></button></p><p>If not , pls let us know by <button><a href='{urlCancel}'>No</a></button>");

                    await _carDealerDBContext.SaveChangesAsync();
                    await transaction.CommitAsync();
                    result = new BookingEntity()
                    {
                        Id = existBooking.Id,
                        Car = existBooking.Car,
                        Model = existBooking.Model,
                        Dealer = existBooking.Dealer,
                        Appointment = existBooking.Appointment,
                        TimePeriod = existBooking.TimePeriod,
                        Title = existBooking.Title,
                        FileRecord = existBooking.FileRecord,
                        FullName = existBooking.FullName,
                        Email = existBooking.Email,
                        SpecificRequest = existBooking.SpecificRequest,
                        PhoneNumber = existBooking.PhoneNumber,
                        Service = existBooking.Service,
                        IsAccepted = existBooking.IsAccepted,
                        Status = existBooking.Status,
                        Note = existBooking.Note,
                        User = existBooking.User
                    };
                }
                else
                {
                    return null;
                }
            }
            catch
            {
                _logger.LogError("Couldn't Update Booking");
            }
            return result;
        }

        public BookingEntity GetBookInfo(int id)
        {
            BookingEntity result = null;
            try
            {
                var book = GetBookingById(id);
                if (book != null)
                {
                    result = new BookingEntity()
                    {
                        Id = book.Id,
                        Car = book.Car,
                        Model = book.Model,
                        Dealer = book.Dealer,
                        Appointment = book.Appointment,
                        TimePeriod = book.TimePeriod,
                        Title = book.Title,
                        FullName = book.FullName,
                        Email = book.Email,
                        FileRecord = book.FileRecord,
                        SpecificRequest = book.SpecificRequest,
                        StaffAnswer = book.StaffAnswer,
                        PhoneNumber = book.PhoneNumber,
                        Service = book.Service,
                        IsAccepted = book.IsAccepted,
                        Status = book.Status,
                        Note = book.Note,
                        User = book.User
                    };
                    return result;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception)
            {
                _logger.LogError("Couldn't find booking ");
            };
            return result;
        }
    }
}
