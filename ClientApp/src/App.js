import React from 'react';
import {
    Switch,
    Route,
    HashRouter,
} from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";
import { Layout } from 'antd';
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
import CreateUser from './components/Admin/User/CreateUser/CreateUser'
import EditUserPage from './Pages/Admin/User/EditUserPage'
import CreateUserPage from './Pages/Admin/User/CreateUserPage'
import ListModelPage from './Pages/Admin/Car/ListModelPage';
import CreateModelPage from './Pages/Admin/Car/CreateModelPage';
import EditModelPage from './Pages/Admin/Car/EditModelPage';
import ListDealerPage from './Pages/Admin/Dealer/ListDealerPage';
import CreateDealerPage from './Pages/Admin/Dealer/CreateDealerPage';
import EditDealerPage from './Pages/Admin/Dealer/EditDealerPage'
import GoogleMap from './components/GoogleMap/GoogleMap'
const { Header, Footer, Sider } = Layout;
const App = () => {
    const cookies = new Cookies();
    const initialValues = {
        token: cookies.get('token'),
        role: cookies.get('role'),
        dealer: cookies.get('dealer'),
        code: cookies.get('code'),
        firstLogin: cookies.get('firstLogin'),
        user: cookies.get('userName')
    }
    const [currentUser, setCurrentUser] = useState(initialValues)
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

                                                    </> : (currentUser.role === 'Admin' ?
                                                        <>
                                                            <Route path="/list-user"><ListUserPage /></Route>
                                                            <Route path="/list-dealer"><ListDealerPage /></Route>
                                                            <Route path="/create-user"><CreateUserPage /></Route>
                                                            <Route path="/edit-user/:code"><EditUserPage /></Route>
                                                        </> : <Login />)
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

