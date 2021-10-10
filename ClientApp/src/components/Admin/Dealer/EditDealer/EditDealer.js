import React from "react";
import "antd/dist/antd.css";
import { useState, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { EditDealerService, GetDealerService } from '../../../../Services/DealerService'
import { Layout, Form, Button, Select, Input, DatePicker, Radio, Upload, Space, Modal, Divider, InputNumber } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { Row, Col } from "antd";
const { Option } = Select;
const { Content } = Layout;
const EditDealer = () => {
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
        }).then(function (response) {
            console.log(response);
            history.push(`/list-dealer/ok/${response.data.id}`);
        }).catch(function (error) {
            console.log(error)
        })
    }
    useEffect(() => {
        (async () => {
            GetDealerService({ id }).then(function (response) {
                setDealer(response.data)
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