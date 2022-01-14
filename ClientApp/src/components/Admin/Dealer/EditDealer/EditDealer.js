import React from "react";
import "antd/dist/antd.css";
import { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { EditDealerService, GetDealerService } from '../../../../Services/DealerService'
import { Layout, Form, Button, Select, Input, DatePicker, Radio, Upload, Space, Modal, Divider, InputNumber, Checkbox } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { Row, Col } from "antd";
const { Option } = Select;
const { Content } = Layout;
const EditDealer = () => {
    const EmailRegex = new RegExp("^[a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-z0-9]@[a-z0-9][-\.]{0,1}([a-z][-\.]{0,1})*[a-z0-9]\.[a-z0-9]{1,}([\.\-]{0,1}[a-z]){0,}[a-z0-9]{0,}$");
    const selectBefore = (
        <Select defaultValue="https://" className="select-before">
            <Option value="http://">http://</Option>
            <Option value="https://">https://</Option>
        </Select>
    );
    const selectAfter = (
        <Select defaultValue=".com" className="select-after">
            <Option value=".com">.com</Option>
            <Option value=".com.vn">.com.vn</Option>
            <Option value=".vn">.vn</Option>
        </Select>
    );
    let history = useHistory();
    const { id } = useParams();
    const [form] = Form.useForm();
    const [dealer, setDealer] = useState([]);
    const [defaultCheckedList, setDefaultCheckedList] = useState([]);
    const onFinishFailed = () => {
        console.log("Failed:");
    };
    const onFinish = (value) => {
        EditDealerService({
            name: value.name,
            id: id,
            dealerEmail: value.dealerEmail,
            dealerWebsite: value.dealerWebsite,
            dealerPhone: value.dealerPhone,
            description: value.description,
            longtitude: value.longtitude,
            latitude: value.latitude,
            serviceId1: value.services[0] === undefined ? 7 : value.services[0],
            serviceId2: value.services[1] === undefined ? 7 : value.services[1],
            serviceId3: value.services[2] === undefined ? 7 : value.services[2]
        }).then(function (response) {
            console.log(response);
            history.push(`/list-dealer/ok/${response.data.id}`);
        }).catch(function (error) {
            console.log(error)
        })
    }
    const [defaultValue, setDefaultValue] = useState([]);
    useEffect(() => {
        (async () => {
            GetDealerService({ id }).then(function (response) {
                setDealer(response.data);
                setDefaultValue(dealer.services)
            }).catch(function (error) {
                console.log(error)
            });
        })();
    }, [id]);
    const handleCancel = () => {
        history.push(`/list-dealer`);
    };
    form.setFieldsValue(
        {
            name: dealer.name,
            dealerEmail: dealer.dealerEmail,
            dealerWebsite: dealer.dealerWebsite,
            dealerPhone: dealer.dealerPhone,
            description: dealer.description,
            longtitude: dealer.longtitude,
            latitude: dealer.latitude,
        });
    return (<Content>
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
            <h1 style={{ color: 'black', textAlign: 'center' }}>Edit Dealer {dealer.name}</h1>
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Name is required!",
                        whitespace: true,
                    },
                ]}
            >
                <Input placeholder="Input dealer name" />
            </Form.Item>
            <Form.Item
                label="Latitude"
                name="latitude"
                rules={[
                    {
                        required: true,
                        message: "latitude is required!",
                        whitespace: true,
                    },
                ]}
            >
                <Input type="number" placeholder="Input dealer latitude" />
            </Form.Item>
            <Form.Item
                label="Longtitude"
                name="longtitude"
                rules={[
                    {
                        required: true,
                        message: "Longtitude is required!",
                        whitespace: true,
                    },
                ]}
            >
                <Input type="number" placeholder="Input dealer longtitude" />
            </Form.Item>
            <Form.Item
                label="Dealer Email"
                name="dealerEmail"
                rules={[
                    {
                        type: "email",
                        required: true,
                        message: "The input is not valid E-mail!",
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
                <Input placeholder="Input email" />
            </Form.Item>
            <Form.Item
                label="Dealer Phone"
                name="dealerPhone"
                rules={[
                    {
                        required: true,
                        message: "Phone number is required!",
                    },
                ]}
            >
                <Input type="number" placeholder="input dealer phone number" />
            </Form.Item>
            <Form.Item
                label="Dealer Website"
                name="dealerWebsite"
                rules={[
                    {
                        required: true,
                        message: "Website is required!",
                    },
                ]}
            >
                <Input placeholder="Input website" />
            </Form.Item>
            <Form.Item
                label="Description"
                name="description"
                rules={[
                    {
                        required: true,
                        message: "Start Price is required!",
                        whitespace: true,
                    },
                ]}
            >
                <Input.TextArea />
            </Form.Item>
            <Form.Item name="services" label="Services">
                <Checkbox.Group>
                    <Row>
                        <Col span={10}>
                            <Checkbox value={2} style={{ lineHeight: '32px' }}>
                                New car sales
                            </Checkbox>
                        </Col>
                        <Col span={10}>
                            <Checkbox value={3} style={{ lineHeight: '32px' }} >
                                Services Workshop
                            </Checkbox>
                        </Col>
                        <Col span={10}>
                            <Checkbox value={4} style={{ lineHeight: '32px' }}>
                                Used car sales
                            </Checkbox>
                        </Col>

                    </Row>
                </Checkbox.Group>
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
    </Content>)
}

export default EditDealer;