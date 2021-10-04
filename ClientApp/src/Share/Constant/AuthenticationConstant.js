import CommonConstant from './CommonConstant';

const AuthenticationConstant = {
    LoginURL: `${CommonConstant.Server}/api/authentication/login`,
    AdminRole: 'Admin',
    StaffRole: 'Staff',
    MasterRole: 'Master',
    ChangePasswordURL: `${CommonConstant.Server}/api/authentication/new-password`
};

export default AuthenticationConstant;