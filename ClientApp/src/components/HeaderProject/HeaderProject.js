import { Breadcrumb, Layout, Button, Modal, Form, Input, Menu, Dropdown } from "antd";
import "antd/dist/antd.css";
import "./HeaderProject.css";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import { DownOutlined, CarOutlined } from '@ant-design/icons';
import React from "react";
import { FaCar } from 'react-icons/fa'
const { Header } = Layout;

const HeaderProject = () => {


    return (
        <div>
            <div className="logo">
                <div style={{ marginLeft: "4%", padding: "1%" }}>
                    <img src="https://www.mercedes-benz.com.vn/vi/_jcr_content/logo.noscale.cloudsvg.imageLogo.20180312094632.svg" />
                    <div className="title" style={{ display: "inline-block" }}>
                        <p style={{ fontSize: "10px" }}>Mercedes-Benz <br />
                            The best or nothing
                        </p>
                    </div>
                </div>
            </div>
            <Header >

                <Menu theme="dark" mode="horizontal">
                    <Menu.Item> <Link to="/"><FaCar style={{ fontSize: '20px', marginBottom: '5px' }} /> ALL Models</Link></Menu.Item>
                    <Menu.Item> <Link to="/">Buy your mercedes</Link></Menu.Item>
                    <Menu.Item> <Link to="/">Service, Parts , Accessories</Link></Menu.Item>
                    <Menu.Item> <Link to="/">Mercedes World</Link></Menu.Item>
                    <Menu.Item> <Link to="/">Mercedes-Benz VietNam</Link></Menu.Item>
                </Menu>
            </Header >
        </div>
    )
}

export default HeaderProject;