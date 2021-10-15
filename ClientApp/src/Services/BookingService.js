import axios from "axios";
import BookingConstant from "../Share/Constant/BookingConstant"

export function GetListBookingService({ index, size }) {
    return axios.get(BookingConstant.GetListBookingURL, {
        params: {
            pageSize: size,
            pageIndex: index
        }
    });
}
export function GetListBookingInDealerService({ index, size }) {
    return axios.get(BookingConstant.GetListBookingDealerURL, {
        params: {
            pageSize: size,
            pageIndex: index
        }
    });
}

export function GetAllBookingService() {
    return axios.get(BookingConstant.GetAllBookingURL);
}

export function GetAllBookingDealerService() {
    return axios.get(BookingConstant.GetAllBookingDealerURL);
}

export function CreateBookingService({ modelId, dealerId, appointment, timePeriod, title, fullName, email, phoneNumber, note, serviceId }) {
    return axios.post(BookingConstant.CreateBookingURL, {
        modelId: modelId,
        dealerId: dealerId,
        appointment: appointment,
        timePeriod: timePeriod,
        title: title,
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        note: note,
        serviceId: serviceId
    })
}