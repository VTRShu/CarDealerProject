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

export function CompleteBookingService({ id }) {
    return axios.put(`${BookingConstant.CompleteBookingURL}${id}`)
}


export function GetListQuoteService({ index, size }) {
    return axios.get(BookingConstant.GetListQuoteURL, {
        params: {
            pageSize: size,
            pageIndex: index
        }
    });
}
export function GetListQuoteInDealerService({ index, size }) {
    return axios.get(BookingConstant.GetListQuoteDealerURL, {
        params: {
            pageSize: size,
            pageIndex: index
        }
    });
}

export function GetAllQuoteService() {
    return axios.get(BookingConstant.GetAllQuoteURL);
}

export function GetAllQuoteDealerService() {
    return axios.get(BookingConstant.GetAllQuoteDealerURL);
}
export function CreateQuoteService({ carId, dealerId, title, fullName, email, phoneNumber, note, serviceId }) {
    return axios.post(BookingConstant.CreateQuoteURL, {
        carId: carId,
        dealerId: dealerId,
        title: title,
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        note: note,
        serviceId: serviceId
    })
}

export function CreateBookingWSService({ dealerId, title, fullName, email, phoneNumber, serviceId, appointment, timePeriod, specificRequest, licensePlate, mileage, carIdentification }) {
    return axios.post(BookingConstant.CreateBookWSURL, {
        dealerId: dealerId,
        title: title,
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        serviceId: serviceId,
        appointment,
        timePeriod: timePeriod,
        specificRequest: specificRequest,
        licensePlate: licensePlate,
        mileage: mileage,
        carIdentification: carIdentification,
    })
}
export function GetAllBookingWSService() {
    return axios.get(BookingConstant.GetAllBookWSDealerURL);
}
export function GetListBookingWSService({ index, size }) {
    return axios.get(BookingConstant.GetListBookWSDealerURL, {
        params: {
            pageSize: size,
            pageIndex: index
        }
    })
}

export function CompleteBookingWS({ id }) {
    return axios.put(`${BookingConstant.CompleteBookWSURL}${id}`)
}
