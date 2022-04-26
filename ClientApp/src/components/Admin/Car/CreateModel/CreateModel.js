import React from "react";
import "antd/dist/antd.css";
import { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { CreateModelService } from '../../../../Services/ModelService'
import { Layout, Form, Button, Select, Input, DatePicker, Radio, Upload, Space, Modal, Divider, InputNumber } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { Row, Col } from "antd";
const { Option } = Select;
const { Content } = Layout;
const CreateModel = () => {
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        const name = [];
        e.fileList.forEach(a => {
            name.push(a.name)
        });
        const unique = Array.from(new Set(name));
        if (e.fileList.length < 3) {
            form.setFields([{
                name: 'upload',
                errors: [<b style={{ color: 'red' }}>Pls select 3 picture for customer to view!</b>],
            }])
        } else {
            if (name.length === unique.length) {
                form.setFields([{
                    name: 'upload',
                    errors: null,
                }])
            } else {
                form.setFields([{
                    name: 'upload',
                    errors: [<b style={{ color: 'red' }}>You selected duplicate picture!</b>],
                }])
            }
        }
        return e && e.fileList;

    };
    const normFilePDF = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        console.log(e.file.name.slice(-4))
        if (e.file.name.slice(-4) !== '.pdf') {
            form.setFields([{
                name: 'uploadFile',
                errors: [<b style={{ color: 'red' }}>Select PDF file only!</b>],
            }])
        } else {
            form.setFields([{
                name: 'uploadFile',
                errors: null,
            }])
        }
        return e && e.fileList;

    };
    let history = useHistory();
    const [form] = Form.useForm();
    const onFinishFailed = () => {
        console.log("Failed:");
    };


    const handleCancel = () => {
        history.push(`/list-model`);
    };
    const onFinish = (value) => {
        CreateModelService({
            fileInforName: value.uploadFile[0].name,
            name: value.name,
            description: value.description,
            typeId: value.type,
            startPrice: value.startPrice,
            imageName1: value.upload[0].name,
            imageName2: value.upload[1].name,
            imageName3: value.upload[2].name,
        }).then(function (response) {
            console.log(response);
            history.push(`/list-model/ok/${response.data.name}`);
        }).catch(function (error) {
            form.setFields([{
                name: 'name',
                errors: [<b style={{ color: 'red' }}>Model is already existed!</b>],
            }])
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
                <h1 style={{ color: 'black', textAlign: 'center' }}>Create New Model</h1>
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
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Start Price"
                    name="startPrice"
                    rules={[
                        {
                            required: true,
                            message: "Start Price is required!",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
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
                            message: "Type is required!",
                        },
                    ]}
                >
                    <Select placeholder="Please select a Type">
                        <Option value={1}>Sedan</Option>
                        <Option value={2}>SUV</Option>
                        <Option value={3}>Coupe</Option>
                        <Option value={4}>Van/MPV</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="upload"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="Upload Model Image"
                >
                    <Upload action="https://localhost:5001/api/Image" maxCount={3} multiple listType="picture">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    name="uploadFile"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFilePDF}
                    extra="Upload model PDF file for description"
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
                                        form.getFieldsError().filter(({ errors }) => errors.length).length > 0
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
export default CreateModel;