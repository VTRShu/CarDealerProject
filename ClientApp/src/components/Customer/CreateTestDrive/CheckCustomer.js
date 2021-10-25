import React from 'react';
import { Layout, Form, Button, Input, Modal } from "antd";
import { Row, Col } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from 'rc-field-form';
import { useLastLocation } from 'react-router-last-location';
const { Content } = Layout;
const CheckCustomer = () => {
    const history = useHistory();
    const lastLocation = useLastLocation();
    const { modelId, service, dealerId } = useParams();
    const onFinish = (value) => {
        const check = value.phoneOrEmail

        if (modelId === undefined || modelId === null && service === undefined || service === null) {
            history.push(`/create-test-drive/${check}`);
        } else {
            history.push(`/create-test-drive/${modelId}/${service}/${check}`);
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
