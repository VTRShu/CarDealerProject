import React from 'react';
import { Layout, Form, Button, Input, Modal } from "antd";
import { Row, Col } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from 'rc-field-form';
import { useLastLocation } from 'react-router-last-location';
import { IoMdArrowRoundBack } from 'react-icons/io';
const { Content } = Layout;
const CheckCustomer = () => {
    const history = useHistory();
    const { modelName } = useParams();

    const onFinish = (value) => {
        sessionStorage.setItem('input', value.phoneOrEmail);
        if (modelName === undefined || modelName === null) {
            history.push(`/create-test-drive/`);
            window.location.reload();
        } else {
            history.push(`/create-test-drive/${modelName}`);
            window.location.reload();
        }

    }
    const onFinishFailed = () => {
        console.log("Failed:");
    };
    const handleCancel = () => {
        history.push(`/`);
    };
    const { form } = useForm()
    return (
        <Content >
            <Row> <Button onClick={() => history.push('/')} style={{ backgroundColor: 'black', color: 'white', borderRadius: '7px' }}>
                <IoMdArrowRoundBack style={{ fontSize: '20px' }} />
            </Button>
            </Row>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 16,
                }}
                name="validate_other"
                form={form}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="phoneOrEmail"
                    label="Phone Number(Or Email)"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Input your phone number or email!",
                        },
                    ]}
                >
                    <Input />
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
                                    style={{ width: 73 }}
                                    type="primary"
                                    htmlType="submit"

                                >
                                    Submit
                                </Button>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            <Button style={{ width: 73 }} danger onClick={() => handleCancel()}>
                                Cancel
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Content>
    )
}
export default CheckCustomer;
