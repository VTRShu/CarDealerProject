import React from "react";
import "antd/dist/antd.css";
import { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Layout, Form, Button, Select, Input, DatePicker, Radio, Upload, Space, Modal, Divider } from "antd";
import { EditModelService, GetModelService } from '../../../../Services/ModelService'
import { UploadOutlined } from '@ant-design/icons';
import { Row, Col } from "antd";
const { Option } = Select;
const { Content } = Layout;
const EditModel = () => {
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
    const history = useHistory();

    const [form] = Form.useForm();
    const { name } = useParams();
    const [model, setModel] = useState([]);
    const [images, setImages] = useState([]);
    const [type, setType] = useState([]);
    const handleCancel = () => {
        history.push(`/list-model`);
    };

    const onFinishFailed = () => {
        console.log("Failed:");
    };
    const onFinish = (value) => {
        EditModelService({
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
            console.log(error);
        });
    }
    const [files, setFiles] = useState([{
        uid: null,
        name: null,
        url: null,
        thumbnail: null,
    }]);
    useEffect(() => {
        (async () => {
            GetModelService({ name })
                .then((res) => {
                    setModel(res.data);
                    setImages(res.data.images);
                    setType(res.data.type);
                    setFiles([{
                        uid: '1',
                        name: res.data.images[0].imageName,
                        url: res.data.images[0].imageSrc,
                        thumbnail: res.data.images[0].imageSrc,
                    }, {
                        uid: '2',
                        name: res.data.images[1].imageName,
                        url: res.data.images[1].imageSrc,
                        thumbnail: res.data.images[1].imageSrc,
                    }, {
                        uid: '3',
                        name: res.data.images[2].imageName,
                        url: res.data.images[2].imageSrc,
                        thumbnail: res.data.images[2].imageSrc,
                    }]);
                })
                .catch((err) => console.log(err));
        })();
    }, [name]);


    form.setFieldsValue(
        {
            name: model.name,
            startPrice: model.startPrice,
            description: model.description,
            type: type.id,
            upload: files
        });

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
                <h1 style={{ color: 'black', textAlign: 'center' }}>Edit Model {model.name}</h1>
                <Form.Item
                    label="Name"
                    name="name"

                >
                    <Input disabled />
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
                    <Select disabled placeholder="Please select a Type">
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
                    <Upload action="https://localhost:5001/api/Image" multiple listType="picture">
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
export default EditModel;