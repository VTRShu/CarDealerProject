import CommonConstant from './CommonConstant';
const CustomerConstant = {
    Title: 'Title',
    FullName: 'Full Name',
    Email: 'Email',
    PhoneNumber: 'Phone Number',
    Services: 'Booked Services',
    PageIndexDefault: 1,
    PageSizeDefault: 10,
    GetAllCustomerURL: `${CommonConstant.Server}/api/Customer/All/Customer`,
    GetListCustomerURL: `${CommonConstant.Server}/api/Customer/list`,
    GetCustomerURL: `${CommonConstant.Server}/api/Customer/customer/get/`,
    GetCustomerByIdURL: `${CommonConstant.Server}/api/Customer/customer/getById/`
}
export default CustomerConstant;