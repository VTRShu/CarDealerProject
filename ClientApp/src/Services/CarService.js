import axios from "axios";
import CarConstant from '../Share/Constant/CarConstant'

export function GetCarListMasterService({ index, size }) {
    return axios.get(CarConstant.GetCarListMasterURL, {
        params: {
            pageSize: size,
            pageIndex: index
        }
    });
}
export function GetCarListAdminService({ index, size }) {
    return axios.get(CarConstant.GetCarListAdminURL, {
        params: {
            pageSize: size,
            pageIndex: index
        }
    });
}
export function GetCarService({ id }) {
    return axios.get(`${CarConstant.GetCarURL}${id}`);
}
export function GetAllCarMasterService() {
    return axios.get(CarConstant.GetAllCarMasterURL);
}
export function GetAllCarAdminService() {
    return axios.get(CarConstant.GetAllCarAdminURL);
}
export function DisableCarService({ id }) {
    return axios.put(`${CarConstant.DisableCarURL}${id}`)
}
export function CreateCarService({ name, price, fuelConsumption, typeId, modelId, color, fuelType, power, maximumSpeed, length, width, torque, upholstery, transmission, acceleration, weight, height, displacement, dealer, imageName1, imageName2, imageName3, imageName4, imageName5, imageName6 }) {
    return axios.post(CarConstant.CreateCarURL, {
        name: name,
        price: price,
        typeId: typeId,
        modelId: modelId,
        color: color,
        fuelType: fuelType,
        power: power,
        maximumSpeed: maximumSpeed,
        length: length,
        width: width,
        torque: torque,
        upholstery: upholstery,
        transmission: transmission,
        acceleration: acceleration,
        fuelConsumption: fuelConsumption,
        weight: weight,
        height: height,
        displacement: displacement,
        dealer: dealer,
        imageName1: imageName1,
        imageName2: imageName2,
        imageName3: imageName3,
        imageName4: imageName4,
        imageName5: imageName5,
        imageName6: imageName6,
    })
}
export function EditCarService({ id, name, price, fuelConsumption, typeId, modelId, color, fuelType, power, maximumSpeed, length, width, torque, upholstery, transmission, acceleration, weight, height, displacement, dealer, imageName1, imageName2, imageName3, imageName4, imageName5, imageName6 }) {
    return axios.put(`${CarConstant.EditCarURL}${id}`, {
        name: name,
        price: price,
        typeId: typeId,
        modelId: modelId,
        color: color,
        fuelType: fuelType,
        power: power,
        maximumSpeed: maximumSpeed,
        length: length,
        width: width,
        torque: torque,
        upholstery: upholstery,
        transmission: transmission,
        acceleration: acceleration,
        fuelConsumption: fuelConsumption,
        weight: weight,
        height: height,
        displacement: displacement,
        dealer: dealer,
        imageName1: imageName1,
        imageName2: imageName2,
        imageName3: imageName3,
        imageName4: imageName4,
        imageName5: imageName5,
        imageName6: imageName6,
    })
}