import React from "react";
import "antd/dist/antd.css";
import { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { CreateDealerService } from '../../../../Services/DealerService'
import { Layout, Form, Button, Select, Input, DatePicker, Radio, Upload, Space, Modal, Divider, InputNumber, Checkbox } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { Row, Col } from "antd";
const { Option } = Select;
const { Content } = Layout;
const CreateDealer = () => {
    const selectBefore = (
        <Select defaultValue="https://" className="select-before">
            <Option value="http://">http://</Option>
            <Option value="https://">https://</Option>
        </Select>
    );
    const selectAfter = (
        <Select defaultValue=".com.vn" className="select-after">
            <Option value=".com">.com</Option>
            <Option value=".com.vn">.com.vn</Option>
            <Option value=".vn">.vn</Option>
        </Select>
    );
    let history = useHistory();
    const [form] = Form.useForm();
    const onFinishFailed = () => {
        console.log("Failed:");
    };

    const handleCancel = () => {
        history.push(`/list-dealer`);
    };
    const onFinish = (value) => {
        CreateDealerService({
            name: value.name,
            dealerEmail: value.dealerEmail,
            dealerWebsite: value.protocol + value.dealerWebsite + value.topLevelDomain,
            dealerPhone: value.dealerPhone,
            description: value.description,
            longtitude: value.longtitude,
            latitude: value.latitude,
            serviceId1: value.services[0] === undefined ? 5 : value.services[0],
            serviceId2: value.services[1] === undefined ? 5 : value.services[1],
            serviceId3: value.services[2] === undefined ? 5 : value.services[2],
        }).then(function (response) {
            console.log(response);
            history.push(`/list-dealer/ok/${response.data.id}`);
        }).catch(function (error) {
            console.log(error)
        })
    }
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
                <h1 style={{ color: 'black', textAlign: 'center' }}>Create New Dealer</h1>
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
                    <Input addonBefore={<Form.Item noStyle name="protocol">{selectBefore}</Form.Item>} addonAfter={<Form.Item noStyle name="topLevelDomain">{selectAfter}</Form.Item>} placeholder="Input website" />
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
        </Content>
    )
}

export default CreateDealer