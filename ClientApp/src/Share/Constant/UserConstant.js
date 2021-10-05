import CommonConstant from './CommonConstant';
const UserConstant = {
    Dealer: "Dealer",
    FirstName: "First Name",
    LastName: "Last Name",
    Dob: "Date Of Birth",
    Gender: "Gender",
    Code: "Code",
    UserName: "User Name",
    Email: "Email",
    FullName: "Full Name",
    AdminType: "Admin Type",
    StaffType: "Staff Type",
    MasterType: "Master Type",
    Type: "Type",
    Image: "Profile",
    PageIndexDefault: 1,
    PageSizeDefault: 10,
    GetListUserMasterURL: `${CommonConstant.Server}/api/Admin/master/list/user`,
    GetListUserAdminURL: `${CommonConstant.Server}/api/Admin/admin/list/user`,
    GetUserURL: `${CommonConstant.Server}/api/Admin/user/Code?code=`,
    EditUserURL: `${CommonConstant.Server}/api/Admin/user/update/`,
    DisableUserURL: `${CommonConstant.Server}/api/Admin/user/Disable/`,
    CreateUserURL: `${CommonConstant.Server}/api/Admin/user/create`,
    GetAllUserAdminURL: `${CommonConstant.Server}/api/Admin/user/admin/listAll`,
    GetAllUserMasterURL: `${CommonConstant.Server}/api/Admin/user/master/listAll`
}
export default UserConstant;