import React from 'react';
import {
    Switch,
    Route,
    Redirect,
    HashRouter,
} from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";
import { UnlockOutlined } from "@ant-design/icons";
import { Layout, Form, Input, Button, Modal } from 'antd';
import { parseJwt } from './Share/parseJwt/parseJwt'
import { Content } from "antd/lib/layout/layout";
import { useLastLocation } from 'react-router-last-location';
import { useState } from 'react';
import HeaderProject from "./components/HeaderProject/HeaderProject"
import SlideProject from './components/SlideProject/SlideProject';
import UploadFile from './components/UploadFile/UploadFile';
import Cookies from 'universal-cookie';
import { CookiesProvider } from "react-cookie";
import { LastLocationProvider } from 'react-router-last-location';
import CurrentUserContext from "./Share/Context/CurrentUserContext";
import Login from './components/Admin/Login/Login';
import ListUserPage from './Pages/Admin/User/ListUserPage';
import EditUserPage from './Pages/Admin/User/EditUserPage'
import CreateUserPage from './Pages/Admin/User/CreateUserPage'
import ListModelPage from './Pages/Admin/Car/ListModelPage';
import CreateModelPage from './Pages/Admin/Car/CreateModelPage';
import EditModelPage from './Pages/Admin/Car/EditModelPage';
import ListDealerPage from './Pages/Admin/Dealer/ListDealerPage';
import CreateDealerPage from './Pages/Admin/Dealer/CreateDealerPage';
import EditDealerPage from './Pages/Admin/Dealer/EditDealerPage'
import ListCarPage from './Pages/Admin/Car/ListCarPage'
import CreateCarPage from './Pages/Admin/Car/CreateCarPage'
import EditCarPage from './Pages/Admin/Car/EditCarPage'
import ListBookingPage from './Pages/BookingPage/ListBookingPage'
import CustomerPage from './Pages/Customer/CustomerPage';
import ListModelCustomerPage from './Pages/CustomerPage/ListModelCustomer';
import SideBar from './components/SideBar/SideBar'
import CreateTestDrivePage from './Pages/CustomerPage/CreateTestDrivePage'
import CheckCustomer from './components/Customer/CreateTestDrive/CheckCustomer'
import ListCarCustomerPage from './Pages/CustomerPage/ListCarCustomerPage'
import CarInfor from './components/Customer/ListCarCustomer/CarInfor/CarInfor'
import ListDealerCustomerPage from './Pages/CustomerPage/ListDealerCustomerPage'
import CreateBookingWSPage from './Pages/CustomerPage/CreateBookingWSPage'
import CheckCustomerWS from './components/Customer/CreateBookingWS/checkCustomerWS'
import ListBookingWSPage from './Pages/BookingPage/ListBookingWSPage'
import FooterProject from './components/FooterProject/FooterProject'
import ViewOwnSolvedBookPage from './Pages/BookingPage/ViewOwnSolvedBookPage';
import { ChangePasswordService } from './Services/AuthenticationService'
const { Header, Footer, Sider } = Layout;
const App = () => {
    const [currentCustomer, setCurrentCustomer] = useState()
    const cookies = new Cookies();
    const tokenDecryption = parseJwt(cookies.get('token'))


    const initialValues = {
        token: cookies.get('token'),
        role: tokenDecryption ? tokenDecryption["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] : null,
        dealer: tokenDecryption ? tokenDecryption["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/locality"] : null,
        code: tokenDecryption ? tokenDecryption["http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata"].split(';')[0] : null,
        firstLogin: tokenDecryption ? tokenDecryption["http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata"].split(';')[1] : null,
        user: tokenDecryption ? tokenDecryption["http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata"].split(';')[2] : null,
        profile: tokenDecryption ? tokenDecryption["http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata"].split(';')[3] : null,
    }


    console.log(tokenDecryption ? tokenDecryption[["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]] : null)
    const [currentUser, setCurrentUser] = useState(initialValues)
    console.log(currentUser);

    var url = window.location.href;
    var check = "manager";
    if (!url.includes("/create-test-drive") && !url.includes("/create-bookws")) {
        sessionStorage.clear();
    }
    const [isModal1stVisible, setIsModal1stVisible] = useState(false);
    const [isModalSuccessVisible, setIsModalSuccesVisible] = useState(false);
    const [form] = Form.useForm();
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const handleOkFor1st = (values) => {

        if (currentUser.role === 'Master') {
            ChangePasswordService({
                userCode: currentUser.code,
                oldPassword: 'Master123@123',
                newPassword: values.NewPassword
            })
                .then(function (response) {
                    setIsModalSuccesVisible(true);
                    setIsModal1stVisible(false);

                }).catch(function (error) {
                    console.log(error);
                })
        } else if (currentUser.role === 'Admin') {
            ChangePasswordService({
                userCode: currentUser.code,
                oldPassword: 'Admin123@123',
                newPassword: values.NewPassword
            })
                .then(function (response) {
                    setIsModalSuccesVisible(true);
                    setIsModal1stVisible(false);

                }).catch(function (error) {
                    console.log(error);
                })
        } else if (currentUser.role === 'Staff') {
            ChangePasswordService({
                userCode: currentUser.code,
                oldPassword: 'Staff123@123',
                newPassword: values.NewPassword
            })
                .then(function (response) {
                    setIsModalSuccesVisible(true);
                    setIsModal1stVisible(false);

                }).catch(function (error) {
                    console.log(error);
                })
        }
    };
    const handleCancel1stTime = () => {
        setIsModal1stVisible(false);
    };
    const handleClose = () => {
        window.location.reload();
        setIsModalSuccesVisible(false);
        cookies.remove('token');
    }

    return (
        <HashRouter>

            <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
                <CookiesProvider>
                    <LastLocationProvider>
                        <Switch>
                            <Layout>
                                <HeaderProject />
                                <Modal title="Change Password" visible={isModal1stVisible || currentUser.firstLogin === 'True'} closable={null} footer={null} centered={true}>

                                    <Form
                                        onFinish={handleOkFor1st}
                                        onFinishFailed={handleCancel1stTime}
                                        form={form}
                                    >
                                        <p style={{ textAlign: "left", marginLeft: '15%', fontWeight: '600' }}>This is the first time you logged in.<br />You have to change your password to continue.</p>
                                        <p></p>

                                        <Form.Item
                                            name="NewPassword"
                                            values="NewPassword"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Please input your New Password",
                                                },
                                                () => ({
                                                    validator(_, value) {
                                                        if (value === 'Admin123@123' || value === 'Staff123@123' || value === 'Master123@123') {

                                                            return Promise.reject(
                                                                new Error(
                                                                    "You can't change your password to the same password as default"
                                                                )
                                                            )
                                                        } else {
                                                            return Promise.resolve();
                                                        }
                                                    }
                                                }),
                                                () => ({
                                                    validator(_, value) {
                                                        if (strongRegex.test(value)) {
                                                            return Promise.resolve();
                                                        } else {
                                                            return Promise.reject(
                                                                new Error(
                                                                    "Require lowercase , uppercase , numeric and special Character and at least 8 characters "
                                                                )
                                                            );
                                                        }
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input.Password
                                                style={{ width: "70%", marginLeft: '15%' }}
                                                placeholder="Enter your new password"
                                                prefix={<UnlockOutlined />}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            shouldUpdate
                                            className="submit"
                                        >
                                            {() => (
                                                <Button
                                                    style={{ borderRadius: '7px', marginLeft: '40%', backgroundColor: "red", color: "white" }}
                                                    danger
                                                    type="primary"
                                                    htmlType="submit"
                                                    disabled={
                                                        !form.isFieldsTouched(true) ||
                                                        form.getFieldsError().filter(({ errors }) => errors.length)
                                                            .length > 0
                                                    }
                                                >
                                                    Save
                                                </Button>
                                            )}
                                        </Form.Item>
                                    </Form>
                                </Modal>
                                <Modal centered={true} title="Change Password" visible={isModalSuccessVisible} onCancel={handleClose} footer={null}>
                                    <>
                                        <b>Your password has been changed successfully,Please login again!</b>
                                        <br />
                                        <br />
                                        <div style={{ padding: '10px', display: 'flex' }}>
                                            <Button style={{ marginLeft: "42%", borderRadius: '7px' }} onClick={handleClose}>Close</Button>
                                        </div>
                                    </>
                                </Modal>
                                {url.includes(check) ?

                                    <>
                                        {(currentUser.role === null || currentUser.role === undefined) ?
                                            <Login />
                                            :
                                            <>
                                                {currentUser.role === 'Master' ?
                                                    <>
                                                        <Route path="/list-user"><ListUserPage /></Route>
                                                        <Route path="/create-user"><CreateUserPage /></Route>
                                                        <Route path="/list-model"><ListModelPage /></Route>
                                                        <Route path="/create-model"> <CreateModelPage /></Route>
                                                        <Route path="/list-dealer"><ListDealerPage /></Route>
                                                        <Route path="/create-dealer"> <CreateDealerPage /> </Route>
                                                        <Route path="/edit-dealer/:id"> <EditDealerPage /> </Route>
                                                        <Route path="/list-car"><ListCarPage /> </Route>
                                                        <Route path="/list-booking"><ListBookingPage /> </Route>
                                                        <Route path="/list-customer"><CustomerPage /></Route>
                                                        <Route exact path="/"><CustomerPage /></Route>
                                                        <Route path="/edit-model/:name"> <EditModelPage /></Route>
                                                    </> : (currentUser.role === 'Admin' ?
                                                        <>

                                                            <Route path="/list-car"><ListCarPage /> </Route>
                                                            <Route path="/list-user"><ListUserPage /></Route>
                                                            <Route exact path="/"><ListUserPage /></Route>
                                                            <Route path="/list-dealer"><ListDealerPage /></Route>
                                                            <Route path="/create-user"><CreateUserPage /></Route>
                                                            <Route path="/edit-user/:code"><EditUserPage /></Route>
                                                            <Route path="/list-model"><ListModelPage /></Route>
                                                            <Route path="/list-customer"><CustomerPage /></Route>
                                                            <Route path="/list-booking"><ListBookingPage /> </Route>
                                                            <Route path="/list-bookws"><ListBookingWSPage /></Route>
                                                        </> : (currentUser.role === 'Staff' ?
                                                            <>
                                                                <Route path="/list-dealer"><ListDealerPage /></Route>
                                                                <Route exact path="/"><ListCarPage /> </Route>
                                                                <Route path="/list-car"><ListCarPage /> </Route>
                                                                <Route path="/create-car"><CreateCarPage /> </Route>
                                                                <Route path="/edit-car/:id"><EditCarPage /> </Route>
                                                                <Route path="/list-booking"><ListBookingPage /> </Route>
                                                                <Route path="/list-bookws"><ListBookingWSPage /></Route>
                                                                <Route path="/own-solved-book"><ViewOwnSolvedBookPage /></Route>
                                                            </>
                                                            : <Login />))
                                                }
                                            </>
                                        }
                                    </> :
                                    <>
                                        <Route exact path="/">
                                            <SlideProject />
                                            <ListModelCustomerPage />
                                            <SideBar />
                                        </Route>
                                        <Route path="/list-car-customer/:model?"><ListCarCustomerPage /></Route>
                                        {sessionStorage.getItem('input') === undefined || sessionStorage.getItem('input') === null ? <Route path="/create-test-drive/:modelName?"> <CheckCustomer /></Route> : <Route path="/create-test-drive/:modelName?"><CreateTestDrivePage /></Route>}

                                        <Route path="/car-infor/:id"><CarInfor /></Route>
                                        <Route path="/list-dealer-customer"><ListDealerCustomerPage /></Route>
                                        {sessionStorage.getItem('input') === undefined || sessionStorage.getItem('input') === null ? <Route path="/create-bookws"><CheckCustomerWS /></Route> : <Route path="/create-bookws/"><CreateBookingWSPage /></Route>}
                                        ư
                                    </>
                                }
                                <FooterProject />
                            </Layout>
                        </Switch>
                    </LastLocationProvider>
                </CookiesProvider>
            </CurrentUserContext.Provider>

        </HashRouter>
    );
};

export default App;

