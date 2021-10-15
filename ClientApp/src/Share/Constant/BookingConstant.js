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
    PageIndexDefault: 1,
    PageSizeDefault: 10,
    CreateBookingURL: `${CommonConstant.Server}/api/Booking/booking/create`,
    GetAllBookingURL: `${CommonConstant.Server}/api/Booking/booking/all`,
    GetAllBookingDealerURL: `${CommonConstant.Server}/api/Booking/booking/all/dealer`,
    GetListBookingURL: `${CommonConstant.Server}/api/Booking/list`,
    GetListBookingDealerURL: `${CommonConstant.Server}/api/Booking/list/dealer`
}
export default BookingConstant;