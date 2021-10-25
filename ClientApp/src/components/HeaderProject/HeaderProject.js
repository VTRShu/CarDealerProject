import { Breadcrumb, Layout, Button, Modal, Form, Input, Menu, Dropdown } from "antd";
import "antd/dist/antd.css";
import "./HeaderProject.css";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import { DownOutlined, CarOutlined, UnlockOutlined, UserOutlined, UserAddOutlined } from '@ant-design/icons';
import React from "react";
import { FaCar } from 'react-icons/fa'
import CurrentUserContext from '../../Share/Context/CurrentUserContext'
import { ChangePasswordService } from '../../Services/AuthenticationService'
import Cookies from 'universal-cookie';
import styles from './Header.module.css'


const { Header } = Layout;
const { SubMenu } = Menu;
const HeaderProject = () => {
    const history = useHistory();
    const [form] = Form.useForm();
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
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
        setCurrentUser({
            token: null,
            role: null,
            dealer: null,
            code: null,
            firstLogin: null,
            user: null
        });
        cookies.remove('token');
        window.location.replace("/manager");
        setIsModalLogoutVisible(false);
    }

    const handleLogoutCancel = () => {
        setIsModalLogoutVisible(false);
    }
    var url = window.location.href;
    var check = "manager";



    return (
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            <Modal title="Change Password" visible={isModalVisible} onOk={handleOk} closable={false} onCancel={handleCancel} centered={true}
                footer={null}>
                <Form
                    form={form}
                    wrapperCol={{
                        span: 20,
                    }}
                    onFinish={handleOk}
                    onFinishFailed={handleCancel}
                >
                    <Form.Item
                        style={{ textAlign: 'center', justifyContent: 'center' }}
                        name="OldPassword"
                        values="OldPassword"
                        validateStatus={handleOk !== 'Password is incorrect' ? 'success' : 'Old Password is incorrect'}
                        rules={[
                            {
                                required: true,
                                message: "Please input your Old Password",
                            },
                        ]}

                    >
                        <Input.Password
                            placeholder="Old Password"
                            onChange={handleChange}
                            prefix={<UnlockOutlined />} />
                    </Form.Item>

                    <Form.Item
                        style={{ textAlign: 'center', justifyContent: 'center' }}
                        name="NewPassword"
                        values="NewPassword"
                        rules={[
                            {
                                required: true,
                                message: "Please input your New Password",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (getFieldValue("OldPassword") !== value) {
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject(
                                            new Error(
                                                "New Password and Old Password must not match!"
                                            )
                                        )
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
                                                "Require lowercase , uppercase , numeric and special Character and at least 8 Characters"
                                            )
                                        );
                                    }
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder="New Password"
                            prefix={<UnlockOutlined />}
                        />
                    </Form.Item>
                    <Button onClick={handleCancel}
                        style={{ marginRight: '25%', marginLeft: '20%', color: "black", float: "right" }}>Cancel</Button>
                    <Form.Item
                        shouldUpdate
                        className="submit"
                        wrapperCol={{
                            span: 16,
                            offset: 21,
                        }}
                    >
                        {() => (
                            <Button
                                style={{ marginRight: '40%', paddingLeft: '20px', paddingRight: '20px', backgroundColor: "red", color: "white", float: "right" }}
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

            <Modal title="Are you sure?" visible={isModalLogoutVisible}
                onOk={handleLogoutOk} onCancel={handleLogoutCancel} centered={true}
                footer={null} style={{ height: '20', borderRadius: '20px', fontWeight: '30px' }}>
                {
                    <>
                        <b style={{ marginLeft: '32%' }}>Do you want to log out?</b>
                        <br />
                        <br />
                        <div className={styles.buttonGroup}>
                            <Button className={styles.create}
                                style={{ marginLeft: '25%', paddingLeft: '10px', paddingRight: '10px' }}
                                onClick={handleLogoutOk}>Log out</Button>
                            <Button className={styles.cancelButton}
                                style={{ marginLeft: '20%' }}
                                onClick={handleLogoutCancel}>Cancel</Button>
                        </div>
                    </>
                }
            </Modal>
            <div>
                <div className="logo">
                    <div style={{ marginLeft: "4%", padding: "1%" }}>
                        <Link to="/">
                            <img src="https://www.mercedes-benz.com.vn/vi/_jcr_content/logo.noscale.cloudsvg.imageLogo.20180312094632.svg" />
                            <div className="title" style={{ display: "inline-block" }}>
                                <p style={{ color: "white", fontSize: "10px" }}>Mercedes-Benz <br />
                                    The best or nothing
                                </p>
                            </div>
                        </Link>
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
                                    <Menu.Item style={{ marginLeft: '95%' }}><Link style={{ color: 'white' }} to='/manager'>Login</Link></Menu.Item>
                                    : (currentUser.role === 'Staff' ?
                                        <>

                                            <Menu.Item><Link to="/list-dealer">List Dealers</Link></Menu.Item>
                                            <SubMenu title="Manage Car Information">
                                                <Menu.Item key="5"><Link to="/list-car">List Cars</Link></Menu.Item>
                                                <Menu.Item key="6"><Link to="/create-car">Create new car</Link></Menu.Item>
                                            </SubMenu>
                                            <Menu.Item><Link to="/list-booking">List booking</Link></Menu.Item>
                                            <SubMenu key="sub4" style={{ marginLeft: '55%' }} title={`Welcome ${currentUser.user}`}>
                                                <Menu.Item key="3" onClick={showModalChangePassword}>Change Password </Menu.Item>
                                                <Menu.Item key="4" onClick={showLogOutModal}>Logout</Menu.Item>
                                            </SubMenu>
                                            <Menu.Item style={{ padding: '0' }}><img src={currentUser.profile} style={{ borderRadius: '30px', width: '60px', height: '60px' }} /></Menu.Item>
                                        </>

                                        : <>
                                            <SubMenu key="sub1" title="User">
                                                <Menu.Item><Link to="/list-user">List Users</Link></Menu.Item>
                                                <Menu.Item><Link to="/create-user">Create User</Link></Menu.Item>
                                            </SubMenu>

                                            <SubMenu key="sub2" title="Dealer">
                                                <Menu.Item><Link to="/list-dealer">List Dealers</Link></Menu.Item>
                                                {currentUser.role === 'Master' ?
                                                    <Menu.Item><Link to="/create-dealer">Create Dealer</Link></Menu.Item> : ""
                                                }
                                            </SubMenu>

                                            <SubMenu key="sub3" title="Car">
                                                <SubMenu title="Model">
                                                    <Menu.Item key="1"><Link to="/list-model">All current models</Link></Menu.Item>
                                                    {currentUser.role === 'Master' ?
                                                        <Menu.Item key="2"><Link to="/create-model">Create new model</Link></Menu.Item> : ""
                                                    }
                                                </SubMenu>
                                                <Menu.Item key="5"><Link to="/list-car">List Cars</Link></Menu.Item>
                                            </SubMenu>

                                            <SubMenu title="Customer">
                                                {currentUser.role === 'Master' ? "" :
                                                    <SubMenu key="sub6" title="Booking">
                                                        <Menu.Item><Link to="/list-booking">research booking list</Link></Menu.Item>
                                                        <Menu.Item><Link to="/list-bookws">Workshop services booking list</Link></Menu.Item>
                                                    </SubMenu>
                                                }
                                                <Menu.Item><Link to="/list-customer">List customer</Link></Menu.Item>
                                            </SubMenu>

                                            <SubMenu key="sub4" style={{ marginLeft: '62%' }} title={`Welcome ${currentUser.user}`}>
                                                <Menu.Item key="3" onClick={showModalChangePassword}>Change Password </Menu.Item>
                                                <Menu.Item key="4" onClick={showLogOutModal}>Logout</Menu.Item>
                                            </SubMenu>
                                            <Menu.Item style={{ padding: '0' }}><img src={currentUser.profile} style={{ borderRadius: '30px', width: '60px', height: '60px' }} /></Menu.Item>

                                        </>)
                                }
                            </Menu>
                            :
                            <Menu theme="dark" mode="horizontal">
                                <Menu.Item> <FaCar style={{ fontSize: '20px', marginBottom: '5px' }} /> ALL Models</Menu.Item>
                                <Menu.Item> Buy your mercedes</Menu.Item>
                                <Menu.Item> Service, Parts , Accessories</Menu.Item>
                                <Menu.Item> Mercedes World</Menu.Item>
                                <Menu.Item> Mercedes-Benz VietNam</Menu.Item>
                            </Menu>
                    }
                </Header >
            </div>
        </CurrentUserContext.Provider >
    )
}

export default HeaderProject;