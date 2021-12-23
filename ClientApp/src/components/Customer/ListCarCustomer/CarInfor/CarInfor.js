import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Input, Button, Layout, Pagination, Modal, Form } from 'antd';
import { FilterFilled, InfoCircleFilled } from '@ant-design/icons';
import styles from './CarInfor.module.css'
import "./CarInforAntStyle.css"
import 'font-awesome/css/font-awesome.min.css';
import CarouselForModal from '../../../CustomCarousel/CarouselForModal'
import { Link, useParams, useHistory } from "react-router-dom";
import { GetCarService } from '../../../../Services/CarService'
import { CreateQuoteService } from '../../../../Services/BookingService';
import { Select } from 'antd';
import GoogleMapReact from 'google-map-react';
import { FaGasPump, FaMapMarkerAlt } from 'react-icons/fa';
import { FcEngineering } from 'react-icons/fc';
import { GiGears } from 'react-icons/gi';
import { AiOutlineMail, AiFillPhone } from 'react-icons/ai';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { CgWebsite } from 'react-icons/cg'
const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;
const AnyReactComponent = ({ text }) => <div style={{ wordWrap: 'normal' }}><img style={{ height: '22px', width: '20px' }} src="https://localhost:5001/Images/copy_492419507.png" /><b style={{ color: 'red' }}>{text}</b></div>;
const CarInfor = () => {
    const EmailRegex = new RegExp("^[a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-z0-9]@[a-z0-9][-\.]{0,1}([a-z][-\.]{0,1})*[a-z0-9]\.[a-z0-9]{1,}([\.\-]{0,1}[a-z]){0,}[a-z0-9]{0,}$");
    const history = useHistory();
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
            dealer: car.dealer.name,
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
            <Row> <Button onClick={() => history.goBack()} className={styles.create}>
                <IoMdArrowRoundBack style={{ fontSize: '20px' }} />
            </Button>
            </Row>
            <Modal title='Request for quote' visible={isModalVisible}
                onCancel={handleCancel}
                footer={null} >
                <Form

                    wrapperCol={{
                        span: 23,
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
                    <Form.Item
                        name="note"

                        hasFeedback

                    >
                        <TextArea placeholder="Note" />
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

                    <div style={{ width: '100%', background: 'linear-gradient(0deg, white 30%, rgb(105,105,105) 70%)' }} key={car.id}>
                        <div style={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap' }}>

                            <div style={{ flexBasis: '60%', }}>
                                <CarouselForModal images={[
                                    { uid: '1', url: `${car.images[0].imageSrc}` },
                                    { uid: '2', url: `${car.images[1].imageSrc}` },
                                    { uid: '3', url: `${car.images[2].imageSrc}` },
                                    { uid: '4', url: `${car.images[3].imageSrc}` },
                                    { uid: '5', url: `${car.images[4].imageSrc}` },
                                    { uid: '6', url: `${car.images[5].imageSrc}` }
                                ]} style={{ height: '40vh', width: '100%' }}></CarouselForModal>
                            </div>
                            <div style={{ flexBasis: '40%', border: '1px solid gray', padding: '5%', backgroundColor: 'white' }}>
                                <div><h1 style={{ color: 'black', fontSize: '40px' }}>{car.name}</h1></div>
                                <div style={{ marginTop: '5%' }}><b style={{ fontSize: '30px' }}>{car.price} VND</b></div>
                                <hr />
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ margin: '2%', fontSize: '20px' }}> <FcEngineering /> {car.power}  </div>
                                    <div style={{ margin: '2%', fontSize: '20px' }}><FaGasPump />{car.fuelType}</div>
                                    <div style={{ margin: '2%', fontSize: '20px' }}><GiGears />{car.transmission}</div>
                                </div>
                                <hr />
                                <div style={{ alignItems: 'end' }}>
                                    <Button style={{ width: '100%', marginTop: '10%', backgroundColor: '#00adef', color: 'white' }} onClick={showRequestQuoteModal}>Request for quote</Button>
                                </div>

                            </div>
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
                    <div >
                        <div style={{ width: '100%', height: '60vh' }} >
                            <GoogleMapReact
                                key={car.id}
                                bootstrapURLKeys={{ key: `AIzaSyC406nqnTQhQ7nnK0NLsl49RAZADNiiQgE`, language: 'en' }}
                                defaultCenter={{ lat: car.dealer.latitude, lng: car.dealer.longtitude }}
                                defaultZoom={15}
                                yesIWantToUseGoogleMapApiInternals
                            >
                                <AnyReactComponent
                                    lat={car.dealer.latitude}
                                    lng={car.dealer.longtitude}
                                    text={car.dealer.name}
                                />
                            </GoogleMapReact>


                        </div>


                        <p style={{ fontSize: '15px' }}><FaMapMarkerAlt /> {car.dealer.description}</p>
                        <p style={{ fontSize: '18px' }}><a style={{ color: '#00adef' }} href={`mailto:${car.dealer.dealerEmail}`}><AiOutlineMail />  {car.dealer.dealerEmail}</a></p>
                        <p style={{ fontSize: '18px' }}><a style={{ color: '#00adef' }} href={`tel:${car.dealer.dealerPhone}`}><AiFillPhone /> {car.dealer.dealerPhone}</a></p>
                        <p style={{ fontSize: '18px' }}><a style={{ color: '#00adef' }} href={car.dealer.dealerWebsite}><cgWebsite /> {car.dealer.dealerWebsite}</a></p>
                    </div>
                    <div>
                        <h3 style={{ textAlign: 'center' }}>Equipment(Standard)</h3>
                        <div style={{ display: 'flex', color: 'black', fontSize: '17px', border: "1px solid rgb(135,206,250)", borderRadius: "10px", backgroundColor: 'rgb(245,245,245)' }}>
                            <div style={{ flexBasis: '50%' }}>
                                <ul className="equipmentList">
                                    <li>Adaptive brake lights</li>
                                    <li>360° camera</li>
                                    <li>PARKTRONIC</li>
                                    <li>Door sill panels with illuminated</li>
                                    <li>seat heating Plus for outer rear seats</li>
                                    <li>Electrically-adjustable rear seats including memory function</li>
                                    <li>Panoramic sliding sunroof</li>
                                    <li>Head-up Display</li>
                                    <li>Boot lid convenience closing feature</li>
                                    <li>Runflat tyres</li>
                                    <li>Summer tyres</li>
                                    <li>Wireless charging</li>
                                    <li>THERMOTRONIC automatic climate control in front</li>
                                    <li>Double cup holder</li>
                                    <li>Tyre pressure warning system</li>
                                    <li>Easy adjust luxury head restraints for driver and front passenger</li>
                                    <li>Multicontour rear seat</li>
                                    <li>MAGIC VISION CONTROL heated, adaptive windscreen wiper system</li>
                                    <li>Power closing for doors</li>
                                    <li>Velour floor mat</li>
                                    <li>Automatic front passenger airbag deactivation</li>
                                    <li>Chauffeur position passenger seat</li>
                                    <li>Rear sidebags</li>
                                    <li>heat-insulating, noise-insulating and infrared-reflecting laminated glass</li>
                                </ul>
                            </div>
                            <div style={{ flexBasis: '50%' }}>
                                <ul className="equipmentList">
                                    <li>Ashtray</li>
                                    <li>Double sunblind for driver and front passenger</li>
                                    <li>Climatised front seats</li>
                                    <li>THERMOTRONIC automatic climate control in the rear</li>
                                    <li>Active High Beam Assist</li>
                                    <li>beltbag</li>
                                    <li>Burmester® high-end 3D surround sound system with 25 loudspeakers, 1450 watts system output</li>
                                    <li>Memory function rear</li>
                                    <li>9G-Tronic</li>
                                    <li>Air conditioning preinstallation for hot countries</li>
                                    <li>Executive seat</li>
                                    <li>Climatised rear seats</li>
                                    <li>Multifunction steering wheel in wood/leather</li>
                                    <li>KEYLESS-GO</li>
                                    <li>Multi-Beam LED headlamps with integral LED daytime running lamps</li>
                                    <li>Touchpad controller on center console</li>
                                    <li>Multi-Beam LED headlamps</li>
                                    <li>Entertainment system in rear</li>
                                    <li>Underbody protection</li>
                                    <li>COMAND Online</li>
                                    <li>COMAND remote control</li>
                                    <li>HANDS-FREE ACCESS</li>
                                    <li>Exclusive trim package</li>
                                    <li>Night View Assist Plus</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
                : ""}
        </Content >

    )
}
export default CarInfor;