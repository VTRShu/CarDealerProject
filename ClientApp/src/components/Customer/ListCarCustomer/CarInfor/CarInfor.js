import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Input, Button, Layout, Pagination, Modal, Form } from 'antd';
import { FilterFilled, InfoCircleFilled } from '@ant-design/icons';
import styles from './CarInfor.module.css'
import 'font-awesome/css/font-awesome.min.css';
import CarouselForModal from '../../../CustomCarousel/CarouselForModal'
import { Link, useParams } from "react-router-dom";
import { GetCarService } from '../../../../Services/CarService'
import { CreateQuoteService } from '../../../../Services/BookingService';
import { Select } from 'antd';
import GoogleMapReact from 'google-map-react';
import { FaGasPump, FaMapMarkerAlt } from 'react-icons/fa';
import { FcEngineering } from 'react-icons/fc';
import { GiGears } from 'react-icons/gi';
const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;
const AnyReactComponent = ({ text }) => <div style={{ wordWrap: 'normal' }}><img style={{ height: '22px', width: '20px' }} src="https://localhost:5001/Images/copy_492419507.png" /><b style={{ color: 'red' }}>{text}</b></div>;
const CarInfor = () => {
    const [image, setImage] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [car, setCar] = useState({
        name: null,
        price: null,
        date: null,
        type: { name: null },
        dealer: { name: null, longtitude: null, latitude: null, description: null },
        model: { name: null },
        color: null,
        fuelType: null,
        power: null,
        maximumSpeed: null,
        width: null,
        length: null,
        torque: null,
        upholstery: null,
        transmission: null,
        acceleration: null,
        weight: null,
        height: null,
        displacement: null,
        images: [{ imageSrc: null }, { imageSrc: null }, { imageSrc: null }, { imageSrc: null }, { imageSrc: null }, { imageSrc: null }],
        isAvailable: null,
    })
    const { id } = useParams();
    const showRequestQuoteModal = () => {
        setIsModalVisible(true);
    }

    const { form } = Form.useForm();
    const handleCancel = () => {
        setIsModalVisible(false);
    }
    const onFinish = (value) => {
        CreateQuoteService({
            carId: id,
            dealerId: car.dealer.id,
            title: value.title,
            fullName: value.fullName,
            email: value.email,
            phoneNumber: value.phoneNumber,
            note: value.note,
            serviceId: 6
        }).then((response) => {
            console.log("data", response.data);
            setIsModalVisible(false)
        }).catch((err) => {
            console.log(err);
        });
    }
    useEffect(() => {
        GetCarService({ id: id }).then(function (response) {
            setCar(response.data);
        }).catch(function (err) {
            console.log(err);
        })
    }, []);

    console.log(car.images[1].imageSrc)
    return (
        <Content className={styles.antLayoutContent}>
            <Modal title='Request for quote' visible={isModalVisible}
                onCancel={handleCancel}
                footer={null} >
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
                >
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


                    <Form.Item
                        shouldUpdate
                        className="submit"
                        wrapperCol={{
                            span: 10,
                            offset: 10,
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

                </Form>
            </Modal>
            {car !== null ?
                <>

                    <div style={{ width: '100%' }} key={car.id}>
                        <div style={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap' }}>
                            <div style={{ flexBasis: '100%' }}><h2>{car.name}</h2></div>
                            <div style={{ flexBasis: '60%' }}>
                                <CarouselForModal images={[
                                    { uid: '1', url: `${car.images[0].imageSrc}` },
                                    { uid: '2', url: `${car.images[1].imageSrc}` },
                                    { uid: '3', url: `${car.images[2].imageSrc}` },
                                    { uid: '4', url: `${car.images[3].imageSrc}` },
                                    { uid: '5', url: `${car.images[4].imageSrc}` },
                                    { uid: '6', url: `${car.images[5].imageSrc}` }
                                ]} style={{ height: '40vh', width: '100%' }}></CarouselForModal>
                            </div>
                            <div style={{ flexBasis: '40%' }}>
                                <div style={{ marginTop: '5%' }}><b style={{ fontSize: '30px' }}>{car.price} VND</b></div>
                                <hr />
                                <div style={{ marginTop: '1%', fontSize: '20px' }}> <FcEngineering /> {car.power}   <FaGasPump />{car.fuelType}</div>
                                <div style={{ marginTop: '1%', fontSize: '20px' }}><GiGears />{car.transmission}</div>
                                <hr />
                                <div style={{ alignItems: 'end' }}>
                                    <Button style={{ width: '100%', marginTop: '10%' }} onClick={showRequestQuoteModal}>Request for quote</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div >
                        <div style={{ width: '100%', height: '60vh' }} >
                            <GoogleMapReact

                                bootstrapURLKeys={{ key: 'AIzaSyD6whTP5DIVEj4asLVRm0Wyjef8vXlIIpY' }}
                                defaultCenter={{ lat: 16.45585700602323, lng: 107.57402262179006 }}
                                defaultZoom={5}
                                yesIWantToUseGoogleMapApiInternals={true}
                            >
                                <AnyReactComponent
                                    lat={car.dealer.latitude}
                                    lng={car.dealer.longtitude}
                                    text={car.dealer.name}
                                />
                            </GoogleMapReact>
                            <p>{car.dealer.description}</p>
                        </div>
                    </div>
                    <br />
                    <div style={{ display: 'flex', }} >
                        <div style={{ width: '50%' }}>
                            <table className={styles.tableModal} >
                                <tr>
                                    <td>Color</td>
                                    <td>{car.color} </td>
                                </tr>
                                <tr>
                                    <td> Fuel Type</td>
                                    <td>{car.fuelType} </td>
                                </tr>
                                <tr>
                                    <td>Power </td>
                                    <td>{car.power} </td>
                                </tr>
                                <tr>
                                    <td>Maximum speed (km/h) </td>
                                    <td>{car.maximumSpeed} km/h</td>
                                </tr>
                                <tr>
                                    <td>Length</td>
                                    <td>{car.length} mm</td>
                                </tr>
                                <tr>
                                    <td>Width</td>
                                    <td>{car.width} mm</td>
                                </tr>
                                <tr>
                                    <td>Displacement (cc)</td>
                                    <td>{car.displacement} </td>
                                </tr>
                            </table>
                        </div>
                        <div style={{ width: '50%' }}>
                            <table className={styles.tableModal}>
                                <tr>
                                    <td>Upholstery</td>
                                    <td> {car.upholstery}</td>
                                </tr>
                                <tr>
                                    <td>Transmission </td>
                                    <td> {car.transmission}</td>
                                </tr>
                                <tr>
                                    <td> 0 - 100 Kmh</td>
                                    <td> {car.acceleration}s</td>
                                </tr>
                                <tr>
                                    <td> Weight</td>
                                    <td> {car.weight} kg</td>
                                </tr>
                                <tr>
                                    <td>height </td>
                                    <td> {car.height} mm</td>
                                </tr>
                                <tr>
                                    <td>Fuel Consumption (km/ℓ) </td>
                                    <td> 7.9 - 14.84</td>
                                </tr>
                                <tr>
                                    <td> Torque</td>
                                    <td> {car.torque}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </>
                : ""}
        </Content >

    )
}
export default CarInfor;