import axios from "axios";
import ModelConstant from '../Share/Constant/ModelConstant'
export function GetModelListService() {
    return axios.get(ModelConstant.GetAllModelURL);
}
export function CreateModelService({ name, fileInforName, description, startPrice, typeId, imageName1, imageName2, imageName3 }) {
    return axios.post(ModelConstant.CreateModelURL, {
        name: name,
        description: description,
        startPrice: startPrice,
        typeId: typeId,
        fileInforName: fileInforName,
        imageName1: imageName1,
        imageName2: imageName2,
        imageName3: imageName3,
    });
}

export function EditModelService({ fileInforName, name, description, startPrice, typeId, imageName1, imageName2, imageName3 }) {
    return axios.put(`${ModelConstant.UpdateModelURL}${name}`, {
        name: name,
        description: description,
        startPrice: startPrice,
        typeId: typeId,
        fileInforName: fileInforName,
        imageName1: imageName1,
        imageName2: imageName2,
        imageName3: imageName3,
    })
}


export function GetModelService({ name }) {
    return axios.get(`${ModelConstant.GetModelURL}${name}`);
};