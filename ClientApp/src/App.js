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
import { useState } from 'react';
import HeaderProject from "./components/HeaderProject/HeaderProject"
import SlideProject from './components/SlideProject/SlideProject';
import UploadFile from './components/UploadFile/UploadFile';
import Cookies from 'universal-cookie';
import { CookiesProvider } from "react-cookie";
import { LastLocationProvider } from 'react-router-last-location';
import CurrentUserContext from "./Share/Context/CurrentUserContext"
import Login from './components/Admin/Login/Login'
import ListUserPage from './Pages/Admin/User/ListUserPage'
const { Header, Footer, Sider } = Layout;
const App = () => {
    const cookies = new Cookies();
    const initialValues = {
        token: cookies.get('token'),
        role: cookies.get('role'),
        location: cookies.get('dealer'),
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
                                        <Login />
                                        <ListUserPage />
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

