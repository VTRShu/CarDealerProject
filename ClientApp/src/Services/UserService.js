import axios from "axios";
import UserConstant from '../Share/Constant/UserConstant';

export function CreateUserService({ firstName, lastName, dob, gender, type, userName, dealerName, code, imageName, email }) {
  return axios.post(UserConstant.CreateUserURL, {
    firstName: firstName,
    lastName: lastName,
    dob: dob,
    dealerName: dealerName,
    code: code,
    gender: gender,
    userName: userName,
    type: type,
    imageName: imageName,
    email: email,
  });
}

export function GetListUserMasterService({ index, size }) {
  return axios.get(UserConstant.GetListUserMasterURL, {
    params: {
      pageSize: size,
      pageIndex: index
    }
  });
}
export function GetListUserAdminService({ index, size }) {
  return axios.get(UserConstant.GetListUserAdminURL, {
    params: {
      pageSize: size,
      pageIndex: index
    }
  });
}

export function DisableUserService({ code }) {
  return axios.put(`${UserConstant.DisableUserURL}${code}`);
}

export function GetUserService({ code }) {
  return axios.get(`${UserConstant.GetUserURL}${code}`);
};


export function EditUserService({ firstName, lastName, dob, gender, type, userName, dealerId, code, imageName, email }) {
  return axios.put(`${UserConstant.EditUserURL}${code}`, {
    firstName: firstName,
    lastName: lastName,
    dob: dob,
    dealerId: dealerId,
    code: code,
    gender: gender,
    userName: userName,
    type: type,
    imageName: imageName,
    email: email,
  });
}

export function GetAllUserMasterSerivce() {
  return axios.get(UserConstant.GetAllUserMasterURL)
}
export function GetAllUserAdminSerivce() {
  return axios.get(UserConstant.GetAllUserAdminURL)
}