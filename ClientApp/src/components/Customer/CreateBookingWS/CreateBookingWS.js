import { useContext } from 'react';
import { Layout, Form, Button, Modal, Input, DatePicker, Radio, Select, Checkbox } from "antd";
import { Row, Col } from "antd";
import { useHistory, useParams } from "react-router-dom";
import styles from './CreateBookingWS.module.css'
import radio from './CreateBookingWS.css';
import React, { useState, useEffect } from "react";
import { GetDealerListService } from '../../../Services/DealerService'
import { GetModelListService } from '../../../Services/ModelService';
import { CreateBookingWSService } from '../../../Services/BookingService';
import { GetCustomerService } from '../../../Services/CustomerService';
import Carousel from '../../CustomCarousel/Carousel';
import moment from 'moment-timezone';
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div style={{ wordWrap: 'normal' }}><img style={{ height: '22px', width: '20px' }} src="https://localhost:5001/Images/copy_492419507.png" />{text}</div>;
const { Search } = Input;
const { TextArea } = Input;
const { Option } = Select;
const { Content } = Layout;
const CreateBookingWS = () => {
    moment.tz.setDefault("Asian/Vientine");
    function disabledDate(current) {
        return moment.tz(current, "Asia/Ho_Chi_Minh").format("YYYY/MM/DD") < moment().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD");
    }
    const dateFormat = "DD/MM/YYYY";
    let history = useHistory();
    const [form] = Form.useForm();
    const handleCancel = () => {
        history.push(`/`);
    };
    const { check } = useParams();
    const [isModalErrorVisible, setIsModalErrorVisible] = useState(false);
    const [isModalSuccessVisible, setIsModalSuccessVisible] = useState(false);
    const onFinish = (value) => {
        CreateBookingWSService({
            dealerId: value.dealerId,
            appointment: value.appointment,
            timePeriod: value.timePeriod,
            title: value.title,
            fullName: value.fullName,
            email: value.email,
            phoneNumber: value.phoneNumber,
            serviceId: 5,
            specificRequest: value.specificRequest.toString(),
            licensePlate: value.licensePlate,
            mileage: value.mileage,
            carIdentification: value.carIdentification,
        }).then((res) => {
            console.log("data", res.data);
            setIsModalSuccessVisible(true);
        }).catch((err) => {
            console.log(err);
            setIsModalErrorVisible(true);
        });
    }
    const onFinishFailed = () => {
        console.log("Failed:");
    };
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
    const [valueDealerId, setValueDealerId] = useState();
    const [isModalDealerVisible, setIsModalDealerVisible] = useState(false);
    const showModalDealer = () => {
        GetDealerListService({}).then(function (res) {
            setDealer(res.data.filter(x => x.services.find(x => x.id === 3)));
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
    const [customer, setCustomer] = useState();
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
    const handleClose = () => {
        history.push('/')
    }
    return (
        <Content className={styles.antLayoutContent}>
            <Modal title="Success" visible={isModalSuccessVisible} onCancel={handleClose} footer={null}>
                <>
                    <b style={{ marginLeft: "17%" }}>Booking workshop service successfully</b>
                    <p style={{ marginLeft: "17%" }}>Please check your email to confirm!</p>
                    <br />
                    <br />
                    <div className={styles.buttonGroup}>
                        <Button style={{ marginLeft: "42%" }} className={styles.cancelButton} onClick={handleClose}>Close</Button>
                    </div>
                </>
            </Modal>
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
                <h1 style={{ color: 'black', textAlign: 'center' }}>Workshop service booking</h1>
                <Form.Item
                    name="licensePlate"
                    label="My License Plate"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "License Plate is required",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="mileage"
                    label="My Mileage(optional)"
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    name="carIdentification"
                    label="My Car Identification(optional)"
                >
                    <Input />
                </Form.Item>


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
                <Form.Item name="specificRequest" label="Select Services(One or more)">
                    <Checkbox.Group>
                        <Row>
                            <Col span={10}>
                                <Checkbox value="Maintain" style={{ lineHeight: '32px' }}>
                                    Maintain
                                </Checkbox>
                            </Col>
                            <Col span={10}>
                                <Checkbox value="General Repair" style={{ lineHeight: '32px' }} >
                                    General Repair
                                </Checkbox>
                            </Col>
                            <Col span={10}>
                                <Checkbox value="Tyre Replacement" style={{ lineHeight: '32px' }} >
                                    Tyre Replacement
                                </Checkbox>
                            </Col>
                            <Col span={10}>
                                <Checkbox value="Wheel Alignment - Balance" style={{ lineHeight: '32px' }} >
                                    Wheel Alignment - Balance
                                </Checkbox>
                            </Col>
                            <Col span={10}>
                                <Checkbox value="Others" style={{ lineHeight: '32px' }}>
                                    Others
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
export default CreateBookingWS;