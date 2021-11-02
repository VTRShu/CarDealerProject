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


export function CreateBookingService({ model, dealer, appointment, timePeriod, title, fullName, email, phoneNumber, note, serviceId }) {
    return axios.post(BookingConstant.CreateBookingURL, {
        model: model,
        dealer: dealer,
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
export function CreateQuoteService({ carId, dealer, title, fullName, email, phoneNumber, note, serviceId }) {
    return axios.post(BookingConstant.CreateQuoteURL, {
        carId: carId,
        dealer: dealer,
        title: title,
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        note: note,
        serviceId: serviceId
    })
}


export function UpdateBookingService({ userCode, id, specificRequest }) {
    return axios.put(`${BookingConstant.UpdateBookURL}${id}-${userCode}`, {
        specificRequest: specificRequest,
        userCode: userCode,
        id: id,
    })
}

export function UpdateBookingQuoteService({ userCode, id, specificRequest, staffAnswer, fileRecordName }) {
    return axios.put(`${BookingConstant.UpdateBookQuoteURL}${id}-${userCode}`, {
        specificRequest: specificRequest,
        userCode: userCode,
        fileRecordName: fileRecordName,
        id: id,
        staffAnswer: staffAnswer,
    })
}
export function CreateBookingWSService({ dealer, title, fullName, email, phoneNumber, serviceId, appointment, timePeriod, specificRequest, licensePlate, mileage, carIdentification }) {
    return axios.post(BookingConstant.CreateBookWSURL, {
        dealer: dealer,
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

export function UpdateBookWSService({ userCode, id, customerFeedBack }) {
    return axios.put(`${BookingConstant.UpdateBookWSURL}${id}-${userCode}`, {
        userCode: userCode,
        id: id,
        customerFeedBack: customerFeedBack
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

export function GetBookWSService({ id }) {
    return axios.get(`${BookingConstant.GetBookWSURL}${id}`);
}


export function GetBookingService({ id }) {
    return axios.get(`${BookingConstant.GetBookingURL}${id}`)
}

export function ViewOwnListTestService({ index, size, code }) {
    return axios.get(BookingConstant.ViewOwnListTestURL, {
        params: {
            pageSize: size,
            code: code,
            pageIndex: index
        }
    })
}
export function ViewOwnListQuoteService({ index, size, code }) {
    return axios.get(BookingConstant.ViewOwnListQuoteURL, {
        params: {
            pageSize: size,
            code: code,
            pageIndex: index
        }
    })
}
export function ViewOwnListBookwsService({ index, size, code }) {
    return axios.get(BookingConstant.ViewOwnListBookwsURL, {
        params: {
            pageSize: size,
            code: code,
            pageIndex: index
        }
    })
}

export function ViewOwnAllTestService({ code }) {
    return axios.get(`${BookingConstant.ViewOwnAllTestURL}${code}`)
}
export function ViewOwnAllQuoteService({ code }) {
    return axios.get(`${BookingConstant.ViewOwnAllQuoteURL}${code}`)
}
export function ViewOwnAllBookwsService({ code }) {
    return axios.get(`${BookingConstant.ViewOwnAllBookwsURL}${code}`)
}

