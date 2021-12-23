import React from "react";
import "antd/dist/antd.css";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { EditUserService, GetUserService } from "../../../../Services/UserService"
import { Layout, Form, Button, Select, Input, DatePicker, Radio, Upload, Space, Modal, Divider } from "antd";
import CurrentUserContext from '../../../../Share/Context/CurrentUserContext'
import { GetDealerListService } from '../../../../Services/DealerService'
import { UploadOutlined } from '@ant-design/icons';
import moment from "moment";
import { Row, Col } from "antd";
const { Option } = Select;
const { Content } = Layout;
const EditUser = () => {
    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [visible, setVisible] = useState(false);
    const [dealerData, setDealerData] = useState();
    const [isFirstLog, setIsFirstLog] = useState(false);
    const history = useHistory();
    const [form] = Form.useForm();
    const { code } = useParams();
    const [user, setUser] = useState([]);
    const [image, setImage] = useState([]);
    const handleCancel = () => {
        history.push(`/list-user`);
    };

    const onFinishFailed = () => {
        console.log("Failed:");
    };
    const [dob, setDob] = useState([]);
    const onFinish = (values) => {
        if (currentUser.role === 'Admin') {
            if (currentUser.role === 'Admin') {
                EditUserService({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    dob: values.dob == null ? user.dob : values.dob,
                    gender: values.gender,
                    type: values.type,
                    dealerName: currentUser.dealer.replaceAll("%20", " "),
                    email: values.email,
                    code: code,
                    userName: values.userName,
                    imageName: (values.upload === null || values.upload === undefined) ? user.image.imageName : values.upload[0].name,
                }).then(function (response) {
                    console.log(response);
                    history.push(`/list-user/ok/${response.data.code}`);
                }).catch(function (error) {
                    console.log(error);
                });
            }
        } else if (currentUser.role === 'Master') {
            EditUserService({
                firstName: values.firstName.split(' ').join(''),
                lastName: values.lastName,
                dob: values.dob == null ? user.dob : values.dob,
                gender: values.gender,
                type: values.type,
                dealerName: values.dealerName,
                email: values.email,
                code: code,
                userName: values.userName,
                imageName: values.upload[0].name,
            }).then(function (response) {
                console.log(response);
                history.push(`/list-user/ok/${response.data.code}`);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
    useEffect(() => {
        (async () => {
            GetUserService({ code })
                .then((res) => {
                    setUser(res.data);
                    setImage(res.data.image);
                    setDob(res.data.dob)
                    console.log("data", res.data);
                })
                .catch((err) => console.log(err));
        })();
    }, [code]);
    const file = [{
        uid: '1',
        name: image.imageName,
        url: image.imageSrc,
        thumbnail: image.imageSrc
    }]
    form.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        dealerName: user.dealerName,
        email: user.email,
        type: user.type,
        upload: file,
        dob: moment(user.dob)
    });
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
    console.log(form.getFieldValue('upload'))
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
                <h1 style={{ color: 'black', textAlign: 'center' }}>Edit User {user.code}</h1>
                <Form.Item
                    label="First Name"
                    name="firstName"

                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    label="Last Name"
                    name="lastName"
                >
                    <Input disabled />
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
                    <DatePicker placeholder="DD/MM/YYYY" format="DD/MM/YYYY" />
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
                {currentUser.role === 'Master' ?
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
                    </Form.Item> : ""}
                <Form.Item
                    label="Email"
                    name="email"

                >
                    <Input disabled />
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
                    <Select placeholder="Please select a Type">
                        {currentUser.role === 'Admin' ?
                            <>
                                <Option value={1}>Admin</Option>
                                <Option value={2}>Staff</Option>
                            </>
                            : (currentUser.role === 'Staff' ? <>
                                <Option value={2}>Staff</Option>
                            </> :
                                <>
                                    <Option value={0}>Master</Option>
                                    <Option value={1}>Admin</Option>
                                    <Option value={2}>Staff</Option>
                                </>)}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="upload"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="Upload new profile"

                >
                    <Upload name="logo" action="https://localhost:5001/api/Image" listType="picture">
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
export default EditUser;