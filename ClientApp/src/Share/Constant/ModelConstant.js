import CommonConstant from './CommonConstant';
const ModelConstant = {
    Name: "Model",
    Description: "Description",
    StartPrice: "Start Price",
    Type: "Type",
    Image: "Review",
    GetAllModelURL: `${CommonConstant.Server}/api/Model/model/list`,
    CreateModelURL: `${CommonConstant.Server}/api/Model/model/create`,
    UpdateModelURL: `${CommonConstant.Server}/api/Model/model/update/`,
    GetModelURL: `${CommonConstant.Server}/api/Model/model/name?name=`,
}
export default ModelConstant;