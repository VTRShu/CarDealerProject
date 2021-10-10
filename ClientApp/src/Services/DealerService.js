import axios from "axios";
import DealerConstant from "../Share/Constant/DealerConstant"

export function GetDealerListService() {
    return axios.get(DealerConstant.GetListDealerURL)
}
export function GetDealerService({ id }) {
    return axios.get(`${DealerConstant.GetDealerURL}${id}`);
};

export function CreateDealerService({ name, dealerEmail, dealerWebsite, dealerPhone, description, latitude, longtitude }) {
    return axios.post(DealerConstant.CreateDealerURL, {
        name: name,
        longtitude: longtitude,
        latitude: latitude,
        dealerEmail: dealerEmail,
        dealerWebsite: dealerWebsite,
        dealerPhone: dealerPhone,
        description: description
    })
}

export function EditDealerService({ id, name, dealerEmail, dealerWebsite, dealerPhone, description, longtitude, latitude }) {
    return axios.put(`${DealerConstant.UpdateDealerURL}${id}`, {
        name: name,
        longtitude: longtitude,
        latitude: latitude,
        id: id,
        dealerEmail: dealerEmail,
        dealerWebsite: dealerWebsite,
        dealerPhone: dealerPhone,
        description: description
    })
}