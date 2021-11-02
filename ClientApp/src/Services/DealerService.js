import axios from "axios";
import DealerConstant from "../Share/Constant/DealerConstant"

export function GetDealerListService() {
    return axios.get(DealerConstant.GetListDealerURL)
}
export function GetDealerService({ id }) {
    return axios.get(`${DealerConstant.GetDealerURL}${id}`);
};
export function CreateDealerService({ name, dealerEmail, dealerWebsite, dealerPhone, description, latitude, longtitude, serviceId1, serviceId2, serviceId3 }) {
    return axios.post(DealerConstant.CreateDealerURL, {
        name: name,
        longtitude: longtitude,
        latitude: latitude,
        dealerEmail: dealerEmail,
        dealerWebsite: dealerWebsite,
        dealerPhone: dealerPhone,
        description: description,
        serviceId1: serviceId1,
        serviceId2: serviceId2,
        serviceId3: serviceId3
    })
}

export function EditDealerService({ id, name, dealerEmail, dealerWebsite, dealerPhone, description, longtitude, latitude, serviceId1, serviceId2, serviceId3 }) {
    return axios.put(`${DealerConstant.UpdateDealerURL}${id}`, {
        name: name,
        longtitude: longtitude,
        latitude: latitude,
        id: id,
        dealerEmail: dealerEmail,
        dealerWebsite: dealerWebsite,
        dealerPhone: dealerPhone,
        description: description,
        serviceId1: serviceId1,
        serviceId2: serviceId2,
        serviceId3: serviceId3
    })
}