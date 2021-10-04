import { Breadcrumb, Layout, Button, Modal, Form, Input, Menu, Dropdown } from "antd";
import "antd/dist/antd.css";
import "./HeaderProject.css";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import { DownOutlined, CarOutlined } from '@ant-design/icons';
import React from "react";
import { FaCar } from 'react-icons/fa'
import CurrentUserContext from '../../Share/Context/CurrentUserContext'
import { ChangePasswordService } from '../../Services/AuthenticationService'
import Cookies from 'universal-cookie';
import styles from './Header.module.css'
const { Header } = Layout;

const HeaderProject = () => {
    const history = useHistory();
    const [form] = Form.useForm();
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    console.log(currentUser.location);
    console.log(currentUser.role)
    const cookies = new Cookies();
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const [isModalLogoutVisible, setIsModalLogoutVisible] = useState(false);
    //Modal for changePassword
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalSuccessVisible, setIsModalSuccesVisible] = useState();
    const showModalChangePassword = () => {
        setIsModalVisible(true);
    }
    const [error, setError] = useState(true);
    const handleChange = (e) => e.target.value && setError(false);
    const handleOk = (values) => {
        ChangePasswordService({
            userCode: currentUser.code,
            oldPassword: values.OldPassword,
            newPassword: values.NewPassword
        })
            .then(function (response) {
                form.resetFields();
                setIsModalVisible(false);
                setIsModalSuccesVisible(true);
                handleLogoutOk();
                history.push('/login')
            }).catch(function (error) {
                if (error.response.data == "Password is incorrect") {
                    setError('Old password is incorrect!');
                    form.setFields([{
                        name: 'OldPassword',
                        errors: [<b style={{ color: 'red' }}>Old password is incorrect!</b>],
                    }])
                };
            })
    }


    const handleCancel = () => {
        form.resetFields();
        setIsModalVisible(false);
    };
    const handleClose = () => {
        setIsModalSuccesVisible(false);
    }
    const showLogOutModal = () => {
        setIsModalLogoutVisible(true);
    };
    const handleLogoutOk = () => {
        sessionStorage.removeItem('key');
        setCurrentUser({
            token: null,
            role: null,
            dealer: null,
            code: null,
            firstLogin: null,
            user: null
        });
        history.push('/login')
        cookies.remove('token');
        cookies.remove('code');
        cookies.remove('userName');
        cookies.remove('role');
        cookies.remove('token');
        cookies.remove('firstLogin');
        cookies.remove('dealer');
        console.log(currentUser)
        setIsModalLogoutVisible(false);
    }

    const handleLogoutCancel = () => {
        setIsModalLogoutVisible(false);
    }
    const menu = (
        <Menu>
            <Menu.Item key="0">
                <b><Link style={{ color: 'red' }} onClick={showModalChangePassword}>Change Password</Link></b>
            </Menu.Item>
            <Menu.Item key="1">
                <b><Link style={{ color: 'red' }} onClick={showLogOutModal}>Logout</Link></b>
            </Menu.Item>
        </Menu>
    );
    console.log(window.location.href);
    var url = window.location.href;
    var check = "manager";
    return (
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            <div>
                <div className="logo">
                    <div style={{ marginLeft: "4%", padding: "1%" }}>
                        <img src="https://www.mercedes-benz.com.vn/vi/_jcr_content/logo.noscale.cloudsvg.imageLogo.20180312094632.svg" />
                        <div className="title" style={{ display: "inline-block" }}>
                            <p style={{ color: "white", fontSize: "10px" }}>Mercedes-Benz <br />
                                The best or nothing
                            </p>
                        </div>
                    </div>
                </div>
                <Modal title="Change Password" visible={isModalSuccessVisible} onCancel={handleClose} footer={null}>
                    <>
                        <b style={{ marginLeft: "17%" }}>Your password has been changed successfully</b>
                        <br />
                        <br />
                        <div className={styles.buttonGroup}>
                            <Button style={{ marginLeft: "42%" }} className={styles.cancelButton} onClick={handleClose}>Close</Button>
                        </div>
                    </>
                </Modal>
                <Header >
                    {
                        url.includes(check) ?
                            <Menu theme="dark" mode="horizontal">
                                {currentUser.role === null || currentUser.role === undefined ?
                                    <Menu.Item style={{ marginLeft: '95%' }}><Link style={{ color: 'white' }} to='/login'>Login</Link></Menu.Item>
                                    : <Dropdown overlay={menu}>
                                        <Menu.Item className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                            Welcome {currentUser.user} <DownOutlined />
                                        </Menu.Item>
                                    </Dropdown>
                                }
                            </Menu>
                            :
                            <Menu theme="dark" mode="horizontal">
                                <Menu.Item> <Link to="/"><FaCar style={{ fontSize: '20px', marginBottom: '5px' }} /> ALL Models</Link></Menu.Item>
                                <Menu.Item> <Link to="/">Buy your mercedes</Link></Menu.Item>
                                <Menu.Item> <Link to="/">Service, Parts , Accessories</Link></Menu.Item>
                                <Menu.Item> <Link to="/">Mercedes World</Link></Menu.Item>
                                <Menu.Item> <Link to="/">Mercedes-Benz VietNam</Link></Menu.Item>
                            </Menu>
                    }
                </Header >
            </div>
        </CurrentUserContext.Provider>
    )
}

export default HeaderProject;