import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Input, Button, Layout, Modal } from 'antd';
import { FilterFilled, InfoCircleFilled } from '@ant-design/icons';
import styles from './ListDealerCustomer.module.css'
import 'font-awesome/css/font-awesome.min.css';
import {
    GetDealerListService, GetDealerService
} from '../../../Services/DealerService';
import './ListDealerCustomerAntStyle.css'
import DealerConstant from '../../../Services/DealerService'
import { Link } from "react-router-dom";
import { Select } from 'antd';
import GoogleMapReact from 'google-map-react';
import { FaMapMarkerAlt } from 'react-icons/fa';
const { Search } = Input;
const { Content } = Layout;
const options = [{ label: 'Ha Noi', value: 'Ha Noi' }]
const Location = ({ text }) => <div style={{ wordWrap: 'normal' }}><img style={{ height: '22px', width: '20px' }} src="https://localhost:5001/Images/copy_492419507.png" />{text}</div>;
const ListDealerCustomer = () => {
    const [value, setValue] = useState([]);
    const [searchDealer, setSearchDealer] = useState();
    const [searchValue, setSearchValue] = useState();
    const selectProps = {
        suffixIcon: <FilterFilled />,
        style: {
            width: '100%',
        },
        mode: 'multiple',
        value,
        options,
        onChange: (newValue) => {
            setValue(newValue);
        },
        placeholder: 'City',
        maxTagCount: 'responsive',
        showArrow: true,
        optionFilterProp: 'label'
    };
    useEffect(() => {
        if (value.length === 0) {
            GetDealerListService().then(function (response) {
                setSearchDealer(response.data);
                console.log(response.data)
            }).catch(function (error) {
                console.log(error);
            })
        } else if (value.length !== 0) {
            GetDealerListService().then(function (response) {
                let data = response.data.filter(x => x.description.includes(value));
                setSearchDealer(data);
            }).catch(function (error) {
                console.log(error);
            })
        }
    }, [value]);
    const handleSearch = (value) => {
        if (value !== '') {
            let searchValue = value.toUpperCase().trim();
            GetDealerListService().then(function (response) {
                let data = response.data.filter(x => x.name.toUpperCase().includes(searchValue))
                setSearchDealer(data);
                setSearchValue(searchValue);
            }).catch(function (error) {
                console.log(error);
            })
        } else {
            GetDealerListService().then(function (response) {
                response.data.sort(function (a, b) {
                    return (`${a.name}`).localeCompare(`${b.name}`);
                })
                setSearchDealer(response.data);
                setSearchValue('');
            }).catch(function (error) {
                console.log(error);
            })
        }
    }
    useEffect(() => {
        let didCancel = false;
        GetDealerListService().then(function (response) {
            setSearchDealer(response.data);
        }).catch(function (error) {
            console.log(error);
        })
    }, [])
    const [dealer, setDealer] = useState({
        name: null,
        latitude: null,
        longitude: null,
        description: null,
        dealerService: null,
        dealerPhone: null,
        dealerWebsite: null,
        services: []
    })
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = (evt) => {
        console.log(`FUCK YOUUUU ${evt.target.id}`)
        GetDealerService({ id: evt.currentTarget.id }).then(function (response) {
            // handle success
            setDealer(response.data);
            setIsModalVisible(true);
        })
            .catch(function (error) {
                console.log(error);
            })
    }
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Content className={styles.antLayoutContent}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                <Col span={5}>
                    <Select {...selectProps} />
                </Col>
                <Col span={10}>
                    <Search onSearch={handleSearch} />
                </Col>
            </Row>
            <br />
            {
                searchDealer !== undefined ?
                    <>
                        {dealer !== null ?

                            <Modal width={700} title="Dealer Information" visible={isModalVisible} footer={null} onCancel={handleCancel} centered={true}>
                                <div key={dealer.id} style={{ height: '50vh', width: '100%' }}>
                                    <GoogleMapReact
                                        bootstrapURLKeys={{ key: 'AIzaSyC406nqnTQhQ7nnK0NLsl49RAZADNiiQgE' }}
                                        defaultCenter={{ lat: dealer.latitude, lng: dealer.longtitude }}
                                        defaultZoom={17}
                                        yesIWantToUseGoogleMapApiInternals={true}
                                    >
                                        <Location
                                            lat={dealer.latitude}
                                            lng={dealer.longtitude}
                                        />
                                    </GoogleMapReact>
                                </div>

                                <div><h5><b>{dealer.name}</b></h5></div>
                                <div>{dealer.dealerEmail}</div>
                                <div>{dealer.dealerPhone}</div>
                                <div><a style={{ color: 'blue' }} href={dealer.dealerWebsite}>{dealer.dealerWebsite}</a></div>

                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div ><FaMapMarkerAlt style={{ fontSize: '20px' }} /></div>
                                    <div>
                                        <p>{dealer.name}</p>
                                        <p>{dealer.description}</p>
                                    </div>
                                </div>
                                <div><h6>Services</h6></div>
                                <div>{dealer.services.map(serv => {
                                    return (
                                        <p>{serv.name}</p>
                                    )
                                })}</div>
                                {/* <Button style={{ width: '100%' }} ><Link to={`/check-customer/${dealer.id}`}>Request Test Drive</Link></Button> */}

                            </Modal> : ''
                        }
                        <div style={{ height: '90vh', width: '100%' }}>
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: "AIzaSyC406nqnTQhQ7nnK0NLsl49RAZADNiiQgE" }}
                                defaultCenter={{ lat: 16.45585700602323, lng: 107.57402262179006 }}
                                defaultZoom={6}
                                yesIWantToUseGoogleMapApiInternals={true}

                            >
                                {searchDealer.map(dealer => {
                                    const Marker = ({ text }) => <div id={dealer.id} onClick={showModal} style={{ wordWrap: 'normal' }}><img id={dealer.id} style={{ height: '22px', width: '20px' }} src="https://localhost:5001/Images/copy_492419507.png" />{text}</div>;
                                    return (
                                        <Marker
                                            lat={dealer.latitude}
                                            lng={dealer.longtitude}
                                        />
                                    )
                                })
                                }
                            </GoogleMapReact>
                        </div>

                    </> : ""
            }
        </Content >
    )
}
export default ListDealerCustomer;