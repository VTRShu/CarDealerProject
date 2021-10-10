import CommonConstant from './CommonConstant';
const DealerConstant = {
    Name: "Dealer Name",
    Latitude: "Latitude",
    Longitude: "Longitude",
    Description: "location Description",
    DealerEmail: "Dealer Email",
    DealerPhone: "Dealer Phone",
    DealerWebsite: "Dealer Website",
    Services: "Services",
    GetListDealerURL: `${CommonConstant.Server}/api/Dealer/dealer/List`,
    CreateDealerURL: `${CommonConstant.Server}/api/Dealer/dealer/create`,
    UpdateDealerURL: `${CommonConstant.Server}/api/Dealer/dealer/update/`,
    GetDealerURL: `${CommonConstant.Server}/api/Dealer/dealer/`
}
export default DealerConstant;