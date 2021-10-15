import React from 'react';
import {
    Switch,
    Route,
    HashRouter,
} from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";
import { Layout } from 'antd';
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
const { Header, Footer, Sider } = Layout;
const App = () => {
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

    return (
        <HashRouter>

            <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
                <CookiesProvider>
                    <LastLocationProvider>
                        <Switch>
                            <Layout>
                                <HeaderProject />
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
                                                        <Route path="/edit-user/:code"><EditUserPage /></Route>
                                                        <Route path="/list-model"><ListModelPage /></Route>
                                                        <Route path="/create-model"> <CreateModelPage /></Route>
                                                        <Route path="/edit-model/:name"> <EditModelPage /></Route>
                                                        <Route path="/list-dealer"><ListDealerPage /></Route>
                                                        <Route path="/create-dealer"> <CreateDealerPage /> </Route>
                                                        <Route path="/edit-dealer/:id"> <EditDealerPage /> </Route>
                                                        <Route path="/list-car"><ListCarPage /> </Route>
                                                        <Route path="/create-car"><CreateCarPage /> </Route>
                                                        <Route path="/edit-car/:id"><EditCarPage /> </Route>
                                                        <Route path="/list-booking"><ListBookingPage /> </Route>
                                                        <Route path="/list-customer"><CustomerPage /></Route>
                                                    </> : (currentUser.role === 'Admin' ?
                                                        <>
                                                            <Route path="/list-car"><ListCarPage /> </Route>
                                                            <Route path="/list-user"><ListUserPage /></Route>
                                                            <Route path="/list-dealer"><ListDealerPage /></Route>
                                                            <Route path="/create-user"><CreateUserPage /></Route>
                                                            <Route path="/edit-user/:code"><EditUserPage /></Route>
                                                            <Route path="/list-model"><ListModelPage /></Route>
                                                            <Route path="/create-model"> <CreateModelPage /></Route>
                                                            <Route path="/edit-model/:name"> <EditModelPage /></Route>
                                                            <Route path="/create-car"><CreateCarPage /> </Route>
                                                            <Route path="/edit-car/:id"><EditCarPage /> </Route>
                                                            <Route path="/list-customer"><CustomerPage /></Route>
                                                            <Route path="/list-booking"><ListBookingPage /> </Route>
                                                        </> : (currentUser.role === 'Staff' ?
                                                            <>
                                                                <Route path="/list-car"><ListCarPage /> </Route>
                                                                <Route path="/create-car"><CreateCarPage /> </Route>
                                                                <Route path="/edit-car/:id"><EditCarPage /> </Route>
                                                                <Route path="/list-customer"><CustomerPage /></Route>
                                                                <Route path="/list-booking"><ListBookingPage /> </Route>
                                                            </>
                                                            : <Login />))
                                                }
                                            </>
                                        }
                                    </> :
                                    <SlideProject />
                                }
                            </Layout>
                        </Switch>
                    </LastLocationProvider>
                </CookiesProvider>
            </CurrentUserContext.Provider>

        </HashRouter>
    );
};

export default App;

