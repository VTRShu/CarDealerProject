import React from 'react';
import {
    Switch,
    Route,
    HashRouter,
} from "react-router-dom";
import "antd/dist/antd.css";
import { Layout } from 'antd';
import { Content } from "antd/lib/layout/layout";
import { useState } from 'react';
import HeaderProject from "./components/HeaderProject/HeaderProject"
import SlideProject from './components/SlideProject/SlideProject';
import UploadFile from './components/UploadFile/UploadFile';
const { Header, Footer, Sider } = Layout;
const App = () => {
    return (
        <HashRouter>
            <Switch>
                <Layout>
                    <HeaderProject />
                    <SlideProject />
                    <UploadFile />
                </Layout>
            </Switch>
        </HashRouter>
    );
};

export default App;

