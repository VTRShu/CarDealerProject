import { useContext } from 'react';
import { Layout, Form, Button, Modal, Input, DatePicker, Radio, Select } from "antd";
import { Row, Col } from "antd";
import { useHistory, useParams } from "react-router-dom";
import styles from './CreateTestDrive.module.css'
import radio from './CreateTestDrive.css';
import React, { useState, useEffect } from "react";
import { GetDealerListService, GetDealerService } from '../../../Services/DealerService'
import { GetModelListService } from '../../../Services/ModelService';
import { CreateBookingService } from '../../../Services/BookingService';
import { GetCustomerService } from '../../../Services/CustomerService';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { parseJwt } from '../../../Share/parseJwt/parseJwt'
import Carousel from '../../CustomCarousel/Carousel';
import moment from 'moment-timezone';
import GoogleMapReact from 'google-map-react';

const { Search } = Input;
const { TextArea } = Input;
const { Option } = Select;
const { Content } = Layout;
const CreateTestDrive = () => {
    moment.tz.setDefault("Asian/Vientine");
    let history = useHistory();
    const dateFormat = "DD/MM/YYYY";
    const today = new Date(moment().tz("Asia/Ho_Chi_Minh"));
    const [isModalSuccessVisible, setIsModalSuccessVisible] = useState(false);
    const [isModalErrorVisible, setIsModalErrorVisible] = useState(false);
    function disabledDate(current) {
        return moment.tz(current, "Asia/Ho_Chi_Minh").format("YYYY/MM/DD") < moment().tz("Asia/Ho_Chi_Minh").format("YYYY/MM/DD");
    }
    const EmailRegex = new RegExp("^[a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-z0-9]@[a-z0-9][-\.]{0,1}([a-z][-\.]{0,1})*[a-z0-9]\.[a-z0-9]{1,}([\.\-]{0,1}[a-z]){0,}[a-z0-9]{0,}$");

    const [form] = Form.useForm();
    const handleCancel = () => {
        window.location.replace('/');
    };
    const [currentCustomer, setCurrentCustomer] = useState()

    const check = sessionStorage.getItem('input')
    const { modelName } = useParams();
    const onFinish = (value) => {

        if (modelName !== undefined && customer === undefined) {
            CreateBookingService({
                model: modelName,
                dealer: value.dealer,
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
                setIsModalSuccessVisible(true)
            }).catch((err) => {
                console.log(err);
                setIsModalErrorVisible(true);
            });
        } else if (modelName !== undefined && customer !== undefined) {
            CreateBookingService({
                model: modelName,
                dealer: value.dealer,
                appointment: value.appointment,
                timePeriod: value.timePeriod,
                title: customer.title,
                fullName: customer.fullName,
                email: customer.email,
                phoneNumber: customer.phoneNumber,
                note: value.note,
                serviceId: 1
            }).then((res) => {
                console.log("data", res.data);
                setIsModalSuccessVisible(true)
            }).catch((err) => {
                console.log(err);
                setIsModalErrorVisible(true);
            });
        } else if (modelName === undefined && customer !== undefined) {
            CreateBookingService({
                model: value.model,
                dealer: value.dealer,
                appointment: value.appointment,
                timePeriod: value.timePeriod,
                title: customer.title,
                fullName: customer.fullName,
                email: customer.email,
                phoneNumber: customer.phoneNumber,
                note: value.note,
                serviceId: 1
            }).then((res) => {
                console.log("data", res.data);
                setIsModalSuccessVisible(true)
            }).catch((err) => {
                console.log(err);
                setIsModalErrorVisible(true);
            });
        } else {
            CreateBookingService({
                model: value.model,
                dealer: value.dealer,
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
                setIsModalSuccessVisible(true)
            }).catch((err) => {
                console.log(err);
                setIsModalErrorVisible(true);
            });
        }
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
            cars: { modelName: null, isAvailable: null },
            description: null,
            dealerEmail: null,
            dealerPhone: null,
            dealerWeb: null,
        }
    )
    const [modelData, setModelData] = useState(
        {
            id: null,
            name: null,
            image: { imageSrc: null }
        }
    )
    const [isModalModelVisible, setIsModalModelVisible] = useState(false)
    const [images, setImages] = useState()
    const showModalModel = () => {
        GetModelListService({}).then(function (res) {
            setModelData(res.data);
            setIsModalModelVisible(true);
        })
            .catch(function (error) {
            })
    };
    const [valueModel, setValueModel] = useState();
    const onChangeModel = e => {
        setValueModel(e.target.value);
    };
    const handleOkModel = () => {
        if (modelName === undefined || modelName === null) {
            setIsModalModelVisible(false);
            form.setFieldsValue({ model: valueModel });

        } else {
            form.setFieldsValue({ model: modelName });
        }

    };

    const handleModalModelCancel = () => {
        setIsModalModelVisible(false);
        setValueModel(null);
        form.setFieldsValue({ model: null });
        if (valueModel === undefined || valueModel !== null) {
            form.setFields([{
                name: 'model',
                errors: [<b style={{ color: 'red' }}>Please select model</b>],
            }])
        }
    };

    const [carList, setCarList] = useState([]);
    const [valueDealer, setValueDealer] = useState();
    const [isModalDealerVisible, setIsModalDealerVisible] = useState(false);
    const showModalDealer = () => {
        GetDealerListService().then(function (res) {
            setDealer(res.data.filter(x => x.cars.find(c => c.modelName === form.getFieldValue("model") && c.isAvailable === true)));
            setIsModalDealerVisible(true);
        })
            .catch(function (error) {
            })
    };
    if (modelName !== undefined) {
        form.setFieldsValue({ model: modelName });
    }
    const onChangeDealer = e => {
        setValueDealer(e.target.value);
        console.log(e.target.value);
    };
    const handleOkDealer = () => {
        setIsModalDealerVisible(false);
        setValueDealer(valueDealer);
        form.setFieldsValue({ dealer: valueDealer });
        if (valueDealer === undefined || valueDealer === null) {
            form.setFields([{
                name: 'dealer',
                errors: [<b style={{ color: 'red' }}>Please select dealer</b>],
            }])
        }
    };


    const handleModalDealerCancel = () => {
        setIsModalDealerVisible(false);
        setValueDealer(null);
        form.setFieldsValue({ dealer: null });
        if (valueDealer === undefined || valueDealer !== null) {
            form.setFields([{
                name: 'dealer',
                errors: [<b style={{ color: 'red' }}>Please select dealer</b>],
            }])
        }
    };
    const [customer, setCustomer] = useState()
    useEffect(() => {
        (async () => {
            GetCustomerService({ input: check }).then((res) => {
                if (res.data.token !== null || res.data.token !== undefined) {
                    const tokenCustomerDecrypt = parseJwt(res.data.token)
                    const initialValuesCustomer = {
                        fullName: tokenCustomerDecrypt ? tokenCustomerDecrypt["http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata"].split(';')[0] : null,
                        email: tokenCustomerDecrypt ? tokenCustomerDecrypt["http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata"].split(';')[1] : null,
                        phoneNumber: tokenCustomerDecrypt ? tokenCustomerDecrypt["http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata"].split(';')[2] : null,
                        title: tokenCustomerDecrypt ? tokenCustomerDecrypt["http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata"].split(';')[3] : null,
                    }
                    setIsModalRecognizeSuccess(true);
                    setCustomer(initialValuesCustomer);
                }
            })
                .catch(function (error) {
                    console.log(error);
                    setIsModalRecognizeFail(true);
                })
        })();
        console.log(customer);
        let isnum = /^\d+$/.test(check);
        if (check !== null || check !== undefined) {
            if (customer === undefined && check.includes("@")) {
                form.setFieldsValue(
                    {
                        email: check,
                    });
            } else if (customer === undefined && isnum) {
                form.setFieldsValue({
                    phoneNumber: check,
                })
            }
        }
    }, []);


    const handleClose = () => {
        history.push('/')
    }
    console.log(customer);
    const [isModalRecognizeFail, setIsModalRecognizeFail] = useState(false);
    const [isModalRecognizeSuccess, setIsModalRecognizeSuccess] = useState(false);
    const handleRecSClose = () => {
        setIsModalRecognizeSuccess(false);
    }
    const handleRecFClose = () => {
        setIsModalRecognizeFail(false);
    }

    return (
        <Content className={styles.antLayoutContent}>
            <Row> <Button onClick={() => history.goBack()} style={{ backgroundColor: 'black', color: 'white', borderRadius: '7px' }}>
                <IoMdArrowRoundBack style={{ fontSize: '20px' }} />
            </Button>
            </Row>
            <div >
                <img style={{ height: '700px', maxWidth: '100%' }} src="https://herbchambers.s3.amazonaws.com/_/HERB-CHAMBERS/lp/mercedes/test-drive/header.jpg" />
            </div>
            <Modal title="WELCOME" visible={isModalRecognizeSuccess} onCancel={handleRecSClose} footer={null}>
                <>
                    <b style={{ marginLeft: "21%" }}>Welcome back</b>
                    <br />
                    <br />
                    <div className={styles.buttonGroup}>
                        <Button style={{ marginLeft: "42%" }} className={styles.cancelButton} onClick={handleRecSClose}>Close</Button>
                    </div>
                </>
            </Modal>
            <Modal title="WELCOME" visible={isModalRecognizeFail} onCancel={handleRecFClose} footer={null}>
                <>
                    <b style={{ marginLeft: "21%" }}>Welcome to Mercedes-Benz Vietnam</b>
                    <p>Looks like this is your first time using our service</p>
                    <p>Please fill in the correct information in the Personal Details field so that you don't have to enter it again next time</p>
                    <br />
                    <br />
                    <div className={styles.buttonGroup}>
                        <Button style={{ marginLeft: "42%" }} className={styles.cancelButton} onClick={handleRecFClose}>Close</Button>
                    </div>
                </>
            </Modal>
            <Modal title="Success" visible={isModalSuccessVisible} onCancel={handleClose} footer={null}>
                <>
                    <b style={{ marginLeft: "21%" }}>Booking test drive successfully</b>
                    <p style={{ marginLeft: "21%" }}>Please check your email to confirm!</p>
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
                <h1 style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>Create Test Drive info</h1>
                <h3 style={{ marginLeft: '1%' }} > Test drive Details</h3>
                <div style={{ border: '1px solid rgb(211,211,211)', borderRadius: '10px', padding: '3%', margin: '1%' }}>
                    {(modelName === undefined || modelName === null) ?
                        <Form.Item
                            name="model"
                            value={setValueModel}
                            hasFeedback
                        >
                            <Input
                                style={{ width: "100%" }}
                                onClick={showModalModel}
                                value={valueModel}
                                placeholder="Select Model"
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
                                            {modelData && modelData.length > 0 && modelData.map(mod => {
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
                                                        <Radio.Group className={styles.radio} value={valueModel} onChange={onChangeModel} >
                                                            <Radio className={styles.radio} style={{ marginTop: 5 }} value={mod.name}>
                                                            </Radio>
                                                        </Radio.Group>
                                                        <div style={{ width: '100%' }}>
                                                            <div className={styles.boxModel} key={mod.name}>
                                                                <div id={mod.name}>{mod.name}</div>
                                                                <div id={mod.name}>From {mod.startPrice} VND</div>
                                                                <div id={mod.name}><Carousel id={mod.name} images={images} pxs={150}></Carousel></div>
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
                        : <Form.Item
                            label="Model"
                            name="model"
                            value={setValueModel}
                            hasFeedback
                        >
                            <Input
                                style={{ width: "100%" }}
                                value={modelName}
                                disabled
                            />
                        </Form.Item>
                    }
                    {form.getFieldValue("model") === undefined || form.getFieldValue("model") === null ? "" :
                        <Form.Item

                            name="dealer"
                            value={setValueDealer}
                            hasFeedback
                        >
                            <Input
                                placeholder="Your Dealer selection"
                                style={{ width: "100%" }}
                                onClick={showModalDealer}
                                value={valueDealer}
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
                                        <div value={valueDealer} style={{ height: '50vh', width: '100%' }}>
                                            <GoogleMapReact
                                                bootstrapURLKeys={{ key: 'AIzaSyC406nqnTQhQ7nnK0NLsl49RAZADNiiQgE' }}
                                                defaultCenter={{ lat: 16.45585700602323, lng: 107.55977472676392 }}
                                                defaultZoom={5}
                                                yesIWantToUseGoogleMapApiInternals={true}

                                            >
                                                {dealer && dealer.length > 0 && dealer.map(gmap => {
                                                    const Marker = ({ text, value }) => <div key={gmap.name} value={gmap.name} onClick={onChangeDealer} style={{ wordWrap: 'normal' }}><img style={{ height: '22px', width: '20px' }} src="https://localhost:5001/Images/copy_492419507.png" />{text}</div>;
                                                    return (
                                                        <Marker

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

                                                        <Radio.Group className={styles.radio} value={valueDealer} onChange={onChangeDealer} >
                                                            <Radio className={styles.radio} style={{ marginTop: 5 }} value={deal.name}>
                                                            </Radio>
                                                        </Radio.Group>
                                                        <div style={{ width: '100%' }}>

                                                            <div className={styles.boxModel} key={deal.name}>
                                                                <div id={deal.name}>{deal.name}</div>
                                                                <div id={deal.name}>{deal.description}</div>
                                                                <div id={deal.name}>{deal.dealerEmail}</div>
                                                                <div id={deal.name}>{deal.dealerPhone}</div>
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
                    }
                </div>
                <h3 style={{ marginLeft: '1%' }} >Appointment selection</h3>

                <div style={{ border: '1px solid rgb(211,211,211)', borderRadius: '10px', padding: '3%', margin: '1%' }} >
                    <Form.Item
                        wrapperCol={{
                            span: 24,
                        }}
                        name="appointment"
                        rules={[
                            {
                                required: true,
                                message: "appointment is required",
                            },
                            () => ({
                                validator(_, value) {
                                    if (value.day() === 0 || value.day() === 6) {
                                        return Promise.reject(
                                            new Error(
                                                "We're sorry we don't have this service on the weekend. Please select another date"
                                            )
                                        );
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    >
                        <DatePicker disabledDate={disabledDate} placeholder={'DD/MM/YYYY'} format={dateFormat} />
                    </Form.Item>
                    <Form.Item
                        name="timePeriod"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select placeholder="select time period">
                            <Option value="Morning (8h-12h)">Morning (8h-12h)</Option>
                            <Option value="Afternoon (13h-17h)">Afternoon (13h-17h)</Option>
                        </Select>
                    </Form.Item>
                </div>
                {customer === undefined ?
                    <>
                        <h3 style={{ marginLeft: '1%' }} > Personal Details</h3>
                        <div style={{ border: '1px solid rgb(211,211,211)', borderRadius: '10px', padding: '3%', margin: '1%' }}>
                            <Form.Item
                                name="title"

                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Select placeholder="Title">
                                    <Option value="Mr">Mr</Option>
                                    <Option value="Ms">Ms</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="fullName"

                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: "Full name is required",
                                    },
                                ]}
                            >
                                <Input placeholder="Full Name" />
                            </Form.Item>
                            <Form.Item
                                name="email"

                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: "Email is required",
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
                                <Input type="email" placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name="phoneNumber"

                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: "Phone Number is required",
                                    },
                                ]}
                            >
                                <Input type="number" placeholder="Phone Number" />
                            </Form.Item>
                        </div> </>
                    : ""
                }
                <Form.Item
                    name="note"
                    hasFeedback

                >
                    <TextArea
                        style={{ width: "93%", marginLeft: '6%' }}
                        placeholder="Note" />
                </Form.Item>
                <Row>
                    <Col span={15}>
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
                    <Col span={3}>
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