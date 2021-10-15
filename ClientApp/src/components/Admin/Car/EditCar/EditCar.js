import "antd/dist/antd.css";
import moment from "moment-timezone";
import { useState, useContext, useEffect } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { EditCarService, GetCarService } from '../../../../Services/CarService'
import { Layout, Form, Button, Select, Input, DatePicker, Radio, Upload, Space, Modal, Divider } from "antd";
import { GetDealerListService } from '../../../../Services/DealerService'
import { GetModelListService } from '../../../../Services/ModelService'
import { UploadOutlined } from '@ant-design/icons';
import { Row, Col } from "antd";
import CurrentUserContext from '../../../../Share/Context/CurrentUserContext'
import React from "react";
const { Option } = Select;
const { Content } = Layout;
const EditCar = () => {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [form] = Form.useForm();
    const { id } = useParams();
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        const name = [];
        e.fileList.forEach(a => {
            name.push(a.name)
        });
        const unique = Array.from(new Set(name));
        if (e.fileList.length < 6) {
            form.setFields([{
                name: 'upload',
                errors: [<b style={{ color: 'red' }}>Pls select 6 picture for customer to view!</b>],
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
    let history = useHistory();
    const onFinishFailed = () => {
        console.log("Failed:");
    };
    const handleCancel = () => {
        history.push(`/list-car`);
    };
    const onFinish = (value) => {
        if (currentUser.role === 'Master') {
            EditCarService({
                name: value.name,
                price: value.price,
                typeId: value.type,
                modelId: value.model,
                color: value.color,
                fuelType: "Petrol",
                power: value.power,
                maximumSpeed: value.maximumSpeed,
                length: value.length,
                width: value.width,
                torque: value.torque,
                fuelConsumption: value.fuelConsumption,
                upholstery: value.upholstery,
                transmission: value.transmission,
                acceleration: value.acceleration,
                weight: value.weight,
                height: value.height,
                displacement: value.displacement,
                dealer: value.dealer,
                imageName1: value.upload[0].name,
                imageName2: value.upload[1].name,
                imageName3: value.upload[2].name,
                imageName4: value.upload[3].name,
                imageName5: value.upload[4].name,
                imageName6: value.upload[5].name,
            }).then(function (response) {
                console.log(response);
                history.push(`/list-car/ok/${response.data.id}`);
            }).catch(function (error) {
                console.log(error);
            })
        } else {
            EditCarService({
                name: value.name,
                price: value.price,
                typeId: value.type,
                modelId: value.model,
                color: value.color,
                fuelType: "Petrol",
                power: value.power,
                maximumSpeed: value.maximumSpeed,
                length: value.length,
                width: value.width,
                torque: value.torque,
                fuelConsumption: value.fuelConsumption,
                upholstery: value.upholstery,
                transmission: value.transmission,
                acceleration: value.acceleration,
                weight: value.weight,
                height: value.height,
                displacement: value.displacement,
                dealer: currentUser.dealer,
                imageName1: value.upload[0].name,
                imageName2: value.upload[1].name,
                imageName3: value.upload[2].name,
                imageName4: value.upload[3].name,
                imageName5: value.upload[4].name,
                imageName6: value.upload[5].name,
            }).then(function (response) {
                console.log(response);
                history.push(`/list-car/ok/${response.data.id}`);
            }).catch(function (error) {
                console.log(error);
            })
        }
    }
    const [dealerData, setDealerData] = useState();
    const [visible, setVisible] = useState(false);
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
    const [modelData, setModelData] = useState();
    const [visibleModel, setVisibleModel] = useState(false);
    useEffect(() => {
        (async () => {
            GetModelListService({
            })
                .then((res) => {
                    setModelData(res.data);
                    setVisibleModel(false);
                })
                .catch((err) => console.log(err));
        })();
    }, [visibleModel]);
    const [files, setFiles] = useState([{
        uid: null,
        name: null,
        url: null,
        thumbnail: null,
    }]);
    const [model, setModel] = useState([]);
    const [type, setType] = useState([]);
    const [car, setCar] = useState([]);
    const [dealer, setDealer] = useState([]);
    useEffect(() => {
        (async () => {
            GetCarService({ id })
                .then((res) => {
                    setCar(res.data);
                    setModel(res.data.model);
                    setType(res.data.type);
                    setDealer(res.data.dealer);
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
                    },
                    {
                        uid: '4',
                        name: res.data.images[3].imageName,
                        url: res.data.images[3].imageSrc,
                        thumbnail: res.data.images[3].imageSrc,
                    },
                    {
                        uid: '5',
                        name: res.data.images[4].imageName,
                        url: res.data.images[4].imageSrc,
                        thumbnail: res.data.images[4].imageSrc,
                    },
                    {
                        uid: '6',
                        name: res.data.images[5].imageName,
                        url: res.data.images[5].imageSrc,
                        thumbnail: res.data.images[5].imageSrc,
                    }]);
                })
                .catch((err) => console.log(err));
        })();
    }, [id]);
    form.setFieldsValue(
        {
            name: car.name,
            price: car.price,
            type: type.id,
            model: model.id,
            color: car.color,
            power: car.power,
            maximumSpeed: car.maximumSpeed,
            length: car.length,
            width: car.width,
            torque: car.torque,
            fuelConsumption: car.fuelConsumption,
            upholstery: car.upholstery,
            transmission: car.transmission,
            acceleration: car.acceleration,
            weight: car.weight,
            height: car.height,
            displacement: car.displacement,
            dealer: dealer.name,
            upload: files
        });
    return (
        <Content>
            <Form labelCol={{
                span: 4,
            }}
                wrapperCol={{
                    span: 16,
                }}
                name="validate_other"
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                <h1 style={{ color: 'black', textAlign: 'center' }}>Edit Car</h1>
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
                    label="Price"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: "price is required!",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input type="number" />
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
                    <Select style={{ width: '100%' }} placeholder="Please select a Type">
                        <Option value={1}>Sedan</Option>
                        <Option value={2}>SUV</Option>
                        <Option value={3}>Coupe</Option>
                        <Option value={4}>Van/MPV</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="model"
                    label="Model"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Please select Model!",
                        }
                    ]}>
                    <Select
                        style={{ width: "100%" }}
                        placeholder="Choose model"
                        dropdownRender={(menu) => (
                            <div>
                                {menu}
                                <Divider style={{ margin: "4px 0" }} />
                            </div>
                        )}
                    >
                        {modelData &&
                            modelData.length > 0 &&
                            modelData.map((item) => (
                                <Option value={item.id} key={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Color"
                    name="color"
                    rules={[
                        {
                            required: true,
                            message: "Color is required!",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Power"
                    name="power"
                    rules={[
                        {
                            required: true,
                            message: "Power is required!",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Max speed"
                    name="maximumSpeed"
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
                    label="Length"
                    name="length"
                    rules={[
                        {
                            required: true,
                            message: "Length is required!",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    label="Width"
                    name="width"
                    rules={[
                        {
                            required: true,
                            message: "Width is required!",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    label="Torque"
                    name="torque"
                    rules={[
                        {
                            required: true,
                            message: "Torque is required!",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    label="Fuel Consumption"
                    name="fuelConsumption"
                    rules={[
                        {
                            required: true,
                            message: "Fuel Consumption is required!",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Upholstery"
                    name="upholstery"
                    rules={[
                        {
                            required: true,
                            message: "Upholstery is required!",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Transmission"
                    name="transmission"
                    rules={[
                        {
                            required: true,
                            message: "Transmission is required!",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="0 - 100 Kmh(s)"
                    name="acceleration"
                    rules={[
                        {
                            required: true,
                            message: "Acceleration is required!",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Weight"
                    name="weight"
                    rules={[
                        {
                            required: true,
                            message: "Weight is required!",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    label="Height"
                    name="height"
                    rules={[
                        {
                            required: true,
                            message: "height is required!",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    label="Displacement (cc)"
                    name="displacement"
                    rules={[
                        {
                            required: true,
                            message: "Displacement is required!",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input type="number" />
                </Form.Item>
                {currentUser.role === 'Master' ?
                    <Form.Item
                        name="dealer"
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
                                    <Option value={item.id} key={item.id}>
                                        {item.name}
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item> : ""}
                <Form.Item
                    name="upload"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="Upload Model Image"
                >
                    <Upload action="https://localhost:5001/api/Image" maxCount={6} multiple listType="picture">
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
                                // disabled={
                                //     !form.isFieldsTouched(true) ||
                                //     form.getFieldsError().filter(({ errors }) => errors.length)
                                //         .length > 0
                                // }
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
export default EditCar;