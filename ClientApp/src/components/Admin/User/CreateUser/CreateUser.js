import "antd/dist/antd.css";
import moment from "moment-timezone";
import { useState, useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { CreateUserService } from '../../../../Services/UserService'
import { Layout, Form, Button, Select, Input, DatePicker, Radio, Upload, Space, Modal, Divider } from "antd";
import { GetDealerListService } from '../../../../Services/DealerService'
import { UploadOutlined } from '@ant-design/icons';
import { Row, Col } from "antd";
import CurrentUserContext from '../../../../Share/Context/CurrentUserContext'
import React from "react";
const { Option } = Select;
const { Content } = Layout;
const CreateUser = () => {
    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    const EmailRegex = new RegExp("^[a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-z0-9]@[a-z0-9][-\.]{0,1}([a-z][-\.]{0,1})*[a-z0-9]\.[a-z0-9]{1,}([\.\-]{0,1}[a-z]){0,}[a-z0-9]{0,}$");
    const [visible, setVisible] = useState(false);
    const [dealerData, setDealerData] = useState();
    const dateFormat = "DD/MM/YYYY";
    let history = useHistory();
    const [form] = Form.useForm();
    const onFinishFailed = () => {
        console.log("Failed:");
    };

    const handleCancel = () => {
        history.push(`/list-user`);
    };
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [dob, setDob] = useState([]);
    const onFinish = (values) => {
        var dobDate = moment.tz(dob, "Asia/Ho_Chi_Minh").format("MM/DD/YYYY");
        dobDate = new Date(dobDate).toDateString();
        if (currentUser.role === 'Admin') {
            console.log(values.upload[0].name);
            if (currentUser.role === 'Admin') {
                CreateUserService({
                    firstName: values.firstName.split(' ').join(''),
                    lastName: values.lastName,
                    dob: dobDate,
                    gender: values.gender,
                    type: values.type,
                    dealerName: currentUser.dealer.replaceAll("%20", " "),
                    email: values.email,
                    code: "null",
                    userName: "null",
                    imageName: values.upload[0].name,
                }).then(function (response) {
                    console.log(response);
                    history.push(`/list-user/ok/${response.data.code}`);
                }).catch(function (error) {
                    form.setFields([{
                        name: 'email',
                        errors: [<b style={{ color: 'red' }}>Email is already existed!</b>],
                    }])
                });
            }
        } else if (currentUser.role === 'Master') {
            CreateUserService({
                firstName: values.firstName.split(' ').join(''),
                lastName: values.lastName,
                dob: dobDate,
                gender: values.gender,
                type: values.type,
                dealerName: values.dealerName,
                email: values.email,
                code: "null",
                userName: "null",
                imageName: values.upload[0].name,
            }).then(function (response) {
                console.log(response);
                history.push(`/list-user/ok/${response.data.code}`);
            }).catch(function (error) {
                form.setFields([{
                    name: 'email',
                    errors: [<b style={{ color: 'red' }}>Email is already existed!</b>],
                }])
            });
        }
    }
    useEffect(() => {
        (async () => {
            GetDealerListService({
            })
                .then((res) => {
                    setDealerData(res.data);
                    setVisible(false);
                })
                .catch((err) => console.log(err));
        })();
    }, [visible]);
    // const [valueSelect, setValueSelect] = useState();
    // const onChangeSelect = (value) => {
    //     setValueSelect(value)
    //     console.log(value)
    // }
    // useEffect(() => {
    //     if (valueSelect === 0) {
    //         form.setFieldsValue({ dealerName: null })

    //     } console.log(form.getFieldValue("dealerName"))
    // }, [valueSelect])
    return (
        <Content>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 16,
                }}
                name="validate_other"
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                <h1 style={{ color: 'black', textAlign: 'center' }}>Create New User</h1>
                <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                        {
                            required: true,
                            message: "First name is required. Please input First Name!",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                        {
                            required: true,
                            message: " Last Name is required. Please input Last Name!",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Date of Birth"
                    wrapperCol={{
                        span: 24,
                    }}
                    name="dob"
                    rules={[
                        {
                            required: true,
                            message: "Date of Birth is required. Should be a valid date in dd/mm/yyyy format",
                        },
                        () => ({
                            validator(_, value) {
                                var today = new Date();
                                console.log(value.year());
                                var temp = today.getFullYear() - value.year();
                                if (temp > 18) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error("User is under 18. Please select a different date")
                                );
                            },
                        }),
                    ]}
                >
                    <DatePicker onChange={(newValue) => { setDob(newValue) }} placeholder={'DD/MM/YYYY'} format={dateFormat} />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[
                        {
                            required: true,
                            message: "Gender is required. Please select your Gender! ",
                        },
                    ]}
                >
                    <Radio.Group>
                        <Radio value="Male">Male</Radio>
                        <Radio value="Female">Female</Radio>
                    </Radio.Group>
                </Form.Item>
                {currentUser.role !== 'Master'
                    // || valueSelect === 0 
                    ? "" :

                    <Form.Item
                        name="dealerName"
                        label="Dealer"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please select dealer!",
                            }
                        ]}>
                        <Select
                            style={{ width: "100%" }}
                            placeholder="Choose dealer"
                            dropdownRender={(menu) => (
                                <div>
                                    {menu}
                                    <Divider style={{ margin: "4px 0" }} />
                                </div>
                            )}
                        >
                            {dealerData &&
                                dealerData.length > 0 &&
                                dealerData.map((item) => (
                                    <Option value={item.name} key={item.name}>
                                        {item.name}
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item>
                }
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: " Email is required. Please input email!",
                            whitespace: true,
                        },
                        () => ({
                            validator(_, value) {
                                if (EmailRegex.test(value)) {
                                    return Promise.resolve();
                                } else {
                                    return Promise.reject(
                                        new Error("Please enter a valid email address!")
                                    )
                                }
                            },
                        }),
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="type"
                    label="Type"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Type is required. Please select your Type",
                        },
                    ]}
                >
                    <Select placeholder="Please select a Type"
                    // onChange={onChangeSelect} 
                    >
                        {currentUser.role === 'Admin' ?
                            <>
                                <Option value={2}>Staff</Option>
                            </>
                            :
                            <>
                                <Option value={0}>Master</Option>
                                <Option value={1}>Admin</Option>
                                <Option value={2}>Staff</Option>
                            </>}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="upload"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="Upload your profile"
                >
                    <Upload name="logo" action="https://localhost:5001/api/Image" maxCount={1} listType="picture">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
                <Row>
                    <Col span={18}>
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
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            <Button danger onClick={() => handleCancel()}>
                                Cancel
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Content>
    )

}
export default CreateUser;