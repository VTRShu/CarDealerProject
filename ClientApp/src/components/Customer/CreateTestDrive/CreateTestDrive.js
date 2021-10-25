import { useContext } from 'react';
import { Layout, Form, Button, Modal, Input, DatePicker, Radio, Select } from "antd";
import { Row, Col } from "antd";
import { useHistory, useParams } from "react-router-dom";
import styles from './CreateTestDrive.module.css'
import radio from './CreateTestDrive.css';
import React, { useState, useEffect } from "react";
import { GetDealerListService } from '../../../Services/DealerService'
import { GetModelListService } from '../../../Services/ModelService';
import { CreateBookingService } from '../../../Services/BookingService';
import { GetCustomerService } from '../../../Services/CustomerService';
import Carousel from '../../CustomCarousel/Carousel';
import moment from 'moment-timezone';
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div style={{ wordWrap: 'normal' }}><img style={{ height: '22px', width: '20px' }} src="https://localhost:5001/Images/copy_492419507.png" />{text}</div>;
const { Search } = Input;
const { TextArea } = Input;
const { Option } = Select;
const { Content } = Layout;
const CreateTestDrive = () => {
    moment.tz.setDefault("Asian/Vientine");
    let history = useHistory();
    const dateFormat = "DD/MM/YYYY";
    const today = new Date(moment().tz("Asia/Ho_Chi_Minh"));
    const [isModalErrorVisible, setIsModalErrorVisible] = useState(false);
    function disabledDate(current) {
        return moment.tz(current, "Asia/Ho_Chi_Minh").format("YYYY/MM/DD") < moment().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD");
    }

    const [form] = Form.useForm();
    const handleCancel = () => {
        history.push(`/`);
    };
    const { modelId, service, check } = useParams();
    const onFinish = (value) => {

        if (modelId !== undefined && service !== undefined) {
            CreateBookingService({
                modelId: modelId,
                dealerId: value.dealerId,
                appointment: value.appointment,
                timePeriod: value.timePeriod,
                title: value.title,
                fullName: value.fullName,
                email: value.email,
                phoneNumber: value.phoneNumber,
                note: value.note,
                serviceId: service
            }).then((res) => {
                console.log("data", res.data);
            }).catch((err) => {
                console.log(err);
                setIsModalErrorVisible(true);
            });
        } else {
            CreateBookingService({
                modelId: value.modelId,
                dealerId: value.dealerId,
                appointment: value.appointment,
                timePeriod: value.timePeriod,
                title: value.title,
                fullName: value.fullName,
                email: value.email,
                phoneNumber: value.phoneNumber,
                note: value.note,
                serviceId: 1
            }).then((res) => {
                console.log("data", res.data);
            }).catch((err) => {
                console.log(err);
                setIsModalErrorVisible(true);
            });
        }
    }

    const onFinishFailed = () => {
        console.log("Failed:");
    };
    const [model, setModel] = useState(
        {
            id: null,
            name: null,
            image: { imageSrc: null }
        }
    )
    const [isModalModelVisible, setIsModalModelVisible] = useState(false)
    const [dealer, setDealer] = useState(
        {
            id: null,
            name: null,
            longtitude: null,
            latitude: null,
            description: null,
            dealerEmail: null,
            dealerPhone: null,
            dealerWeb: null,
        }
    )

    const [images, setImages] = useState()
    const showModalModel = () => {
        GetModelListService({}).then(function (res) {
            setModel(res.data);
            setIsModalModelVisible(true);
        })
            .catch(function (error) {
            })
    };
    const [valueModelId, setValueModelId] = useState();
    const onChangeModel = e => {
        setValueModelId(e.target.value);
    };
    const handleOkModel = () => {
        if (modelId === undefined || modelId === null) {
            setIsModalModelVisible(false);
            console.log('checked', valueModelId);
            form.setFieldsValue({ modelId: valueModelId });
        } else {
            form.setFieldsValue({ modelId: modelId });
            console.log(modelId);
        }
    };
    const handleModalModelCancel = () => {
        setIsModalModelVisible(false);
        setValueModelId(null);
        form.setFieldsValue({ modelId: null });
        if (valueModelId === undefined || valueModelId !== null) {
            form.setFields([{
                name: 'modelId',
                errors: [<b style={{ color: 'red' }}>Please select model</b>],
            }])
        }
    };


    const [valueDealerId, setValueDealerId] = useState();
    const [isModalDealerVisible, setIsModalDealerVisible] = useState(false);
    const showModalDealer = () => {
        GetDealerListService({}).then(function (res) {
            setDealer(res.data);
            setIsModalDealerVisible(true);
        })
            .catch(function (error) {
            })
    };
    const onChangeDealer = e => {
        setValueDealerId(e.target.value);
    };
    const handleOkDealer = () => {
        setIsModalDealerVisible(false);
        console.log('checked', valueDealerId);
        form.setFieldsValue({ dealerId: valueDealerId });
    };
    const handleModalDealerCancel = () => {
        setIsModalDealerVisible(false);
        setValueDealerId(null);
        form.setFieldsValue({ dealerId: null });
        if (valueDealerId === undefined || valueDealerId !== null) {
            form.setFields([{
                name: 'dealerId',
                errors: [<b style={{ color: 'red' }}>Please select dealer</b>],
            }])
        }
    };
    const [customer, setCustomer] = useState()
    useEffect(() => {
        (async () => {
            GetCustomerService({ input: check }).then((res) => {
                setCustomer(res.data);
                console.log(customer);
            })
                .catch((err) => console.log(err));
        })();
    }, []);
    if (customer !== undefined) {
        form.setFieldsValue(
            {
                title: customer.title,
                fullName: customer.fullName,
                email: customer.email,
                phoneNumber: customer.phoneNumber
            });
    }
    return (
        <Content className={styles.antLayoutContent}>
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
                <h1 style={{ color: 'black', textAlign: 'center' }}>Create Test Drive info</h1>
                {(modelId === undefined || modelId === null) ?
                    <Form.Item
                        label="Model"
                        name="modelId"
                        value={setValueModelId}
                        hasFeedback
                    >
                        <Input
                            style={{ width: "100%" }}
                            onClick={showModalModel}
                            value={valueModelId}
                        />
                        <Modal width={550} visible={isModalModelVisible}
                            closable={false}
                            centered
                            footer={[
                                <Button key="submit" style={{ backgroundColor: "red", width: 73 }} type="primary" onClick={handleOkModel}>
                                    Save
                                </Button>,
                                <Button key="back" style={{ marginRight: 50, width: 73 }} onClick={handleModalModelCancel}>
                                    Cancel
                                </Button>,
                            ]}

                        >
                            <Row>
                                <Col span={8} style={{ textAlign: "center", fontWeight: "bold", color: "black", margin: 20 }}>Select model</Col>
                            </Row>
                            <br></br>
                            <Row>
                                {
                                    <div className={radio}>
                                        {model && model.length > 0 && model.map(mod => {
                                            const images = [
                                                {
                                                    id: '1',
                                                    url: mod.images[0].imageSrc,
                                                },
                                                {
                                                    id: '2',
                                                    url: mod.images[1].imageSrc,
                                                }, {
                                                    id: '3',
                                                    url: mod.images[2].imageSrc,
                                                },
                                            ]
                                            return (
                                                <div style={{ display: 'flex' }} className={radio}>
                                                    <Radio.Group className={styles.radio} value={valueModelId} onChange={onChangeModel} >
                                                        <Radio className={styles.radio} style={{ marginTop: 5 }} value={mod.id}>
                                                        </Radio>
                                                    </Radio.Group>
                                                    <div style={{ width: '100%' }}>
                                                        <div className={styles.boxModel} key={mod.id}>
                                                            <div id={mod.id}>{mod.name}</div>
                                                            <div id={mod.id}>From {mod.startPrice} VND</div>
                                                            <div id={mod.id}><Carousel id={mod.name} images={images} pxs={150}></Carousel></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        }
                                    </div>
                                }
                            </Row>
                        </Modal>
                    </Form.Item>
                    : ""
                }
                <Form.Item
                    label="Dealer"
                    name="dealerId"
                    value={setValueDealerId}
                    hasFeedback
                >
                    <Input
                        style={{ width: "100%" }}
                        onClick={showModalDealer}
                        value={valueDealerId}
                    />
                    <Modal width={'80%'} visible={isModalDealerVisible}
                        closable={false}
                        centered
                        footer={[
                            <Button key="submit" style={{ backgroundColor: "red", width: 73 }} type="primary" onClick={handleOkDealer}>
                                Save
                            </Button>,
                            <Button key="back" style={{ marginRight: 50, width: 73 }} onClick={handleModalDealerCancel}>
                                Cancel
                            </Button>,
                        ]}

                    >
                        <Row>
                            <Col span={8} style={{ textAlign: "center", fontWeight: "bold", color: "black", margin: 20 }}>Select dealer</Col>
                        </Row>
                        <br></br>
                        <Row>
                            {<>
                                <div style={{ height: '50vh', width: '100%' }}>
                                    <GoogleMapReact
                                        bootstrapURLKeys={{ key: 'AIzaSyD6whTP5DIVEj4asLVRm0Wyjef8vXlIIpY' }}
                                        defaultCenter={{ lat: 16.45585700602323, lng: 107.55977472676392 }}
                                        defaultZoom={5}
                                        yesIWantToUseGoogleMapApiInternals={true}
                                    >
                                        {dealer && dealer.length > 0 && dealer.map(gmap => {

                                            return (
                                                <AnyReactComponent
                                                    lat={gmap.latitude}
                                                    lng={gmap.longtitude}
                                                />
                                            )
                                        })}
                                    </GoogleMapReact>
                                </div>
                                <div className={radio}>
                                    {dealer && dealer.length > 0 && dealer.map(deal => {

                                        return (<>

                                            <br />
                                            <div style={{ display: 'flex' }} className={radio}>

                                                <Radio.Group className={styles.radio} value={valueDealerId} onChange={onChangeDealer} >
                                                    <Radio className={styles.radio} style={{ marginTop: 5 }} value={deal.id}>
                                                    </Radio>
                                                </Radio.Group>
                                                <div style={{ width: '100%' }}>

                                                    <div className={styles.boxModel} key={deal.id}>
                                                        <div id={deal.id}>{deal.name}</div>
                                                        <div id={deal.id}>{deal.description}</div>
                                                        <div id={deal.id}>{deal.dealerEmail}</div>
                                                        <div id={deal.id}>{deal.dealerPhone}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>)
                                    })
                                    }
                                </div>
                            </>}
                        </Row>
                    </Modal>
                </Form.Item>
                <Form.Item
                    label="Appointment"
                    wrapperCol={{
                        span: 24,
                    }}
                    name="appointment"
                    rules={[
                        {
                            required: true,
                            message: "appointment is required",
                        },

                    ]}
                >
                    <DatePicker disabledDate={disabledDate} placeholder={'DD/MM/YYYY'} format={dateFormat} />
                </Form.Item>
                <Form.Item
                    name="timePeriod"
                    label="Time Period"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select placeholder="select time period">
                        <Option value="Morning">Morning</Option>
                        <Option value="Afternoon">Afternoon</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="title"
                    label="Title"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select>
                        <Option value="Mr">Mr</Option>
                        <Option value="Ms">Ms</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="fullName"
                    label="Full name"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Full name is required",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Email is required",
                        },
                    ]}
                >
                    <Input type="email" />
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    label="Phone Number"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Phone Number is required",
                        },
                    ]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    name="note"
                    label="Note*"
                    hasFeedback

                >
                    <TextArea />
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
                                    Save
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
export default CreateTestDrive;