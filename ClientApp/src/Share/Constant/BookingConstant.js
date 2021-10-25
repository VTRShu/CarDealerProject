import CommonConstant from './CommonConstant';
const BookingConstant = {
    FullName: "Full Name",
    Email: "Email",
    Title: "Title",
    PhoneNumber: "Phone Number",
    Service: "Service",
    Dealer: "Dealer",
    Model: "Model",
    IsAccepted: "Status",
    Appointment: "Appointment",
    TimePeriod: "Time Period",
    Note: "Note",
    LicensePlate: "License Plate",
    Mileage: "Mileage",
    CarIdentification: "Car Identification",
    SpecificRequest: "Detailed Booking",
    PageIndexDefault: 1,
    PageSizeDefault: 10,
    CreateBookingURL: `${CommonConstant.Server}/api/Booking/booking/create`,
    GetAllBookingURL: `${CommonConstant.Server}/api/Booking/booking/all`,
    GetAllBookingDealerURL: `${CommonConstant.Server}/api/Booking/booking/all/dealer`,
    GetListBookingURL: `${CommonConstant.Server}/api/Booking/list`,
    GetListBookingDealerURL: `${CommonConstant.Server}/api/Booking/list/dealer`,

    CompleteBookingURL: `${CommonConstant.Server}/api/Booking/complete/`,

    CreateQuoteURL: `${CommonConstant.Server}/api/Booking/quote/create`,
    GetAllQuoteURL: `${CommonConstant.Server}/api/Booking/quote/all`,
    GetAllQuoteDealerURL: `${CommonConstant.Server}/api/Booking/quote/all/dealer`,
    GetListQuoteURL: `${CommonConstant.Server}/api/Booking/quote/list`,
    GetListQuoteDealerURL: `${CommonConstant.Server}/api/Booking/quote/list/dealer`,

    CreateBookWSURL: `${CommonConstant.Server}/bookws/create`,
    GetAllBookWSDealerURL: `${CommonConstant.Server}/api/BookWorkshop/all/dealer`,
    CompleteBookWSURL: `${CommonConstant.Server}/api/BookWorkshop/complete/`,
    GetListBookWSDealerURL: `${CommonConstant.Server}/api/BookWorkshop/list/dealer`
}
export default BookingConstant;