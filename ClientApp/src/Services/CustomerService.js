import axios from "axios";
import CustomerConstant from "../Share/Constant/CustomerConstant";

export function GetAllCustomerSerivce() {
    return axios.get(CustomerConstant.GetAllCustomerURL);
}
export function GetListCustomerSerivce({ index, size }) {
    return axios.get(CustomerConstant.GetListCustomerURL, {
        params: {
            pageSize: size,
            pageIndex: index
        }
    });
}

export function GetCustomerService({ input }) {
    return axios.get(`${CustomerConstant.GetCustomerURL}${input}`)
}

export function GetCustomerByIdService({ id }) {
    return axios.get(`${CustomerConstant.GetCustomerByIdURL}${id}`)
}