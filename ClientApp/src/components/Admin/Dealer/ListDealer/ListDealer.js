import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Input, Button, Layout, Modal } from 'antd';
import { FilterFilled, InfoCircleFilled } from '@ant-design/icons';
import styles from './ListDealer.module.css'
import 'font-awesome/css/font-awesome.min.css';
import {
    GetDealerListService, GetDealerService
} from '../../../../Services/DealerService';
import './ListDealerAntStyle.css'
import DealerConstant from '../../../../Share/Constant/DealerConstant'
import { Link, useLocation } from "react-router-dom";
import { useLastLocation } from 'react-router-last-location';
import { Select } from 'antd';
import CurrentUserContext from '../../../../Share/Context/CurrentUserContext';
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div style={{ wordWrap: 'normal' }}><img style={{ height: '22px', width: '20px' }} src="https://localhost:5001/Images/copy_492419507.png" />{text}</div>;
const { Search } = Input;
const { Content } = Layout;
const options = [{ label: 'Ha Noi', value: 'Ha Noi' }]
const ListDealer = () => {

    const { currentUser, setCurrentUser } = useContext(CurrentUserContext)
    const [value, setValue] = useState([]);
    const location = useLocation();
    const lastLocation = useLastLocation();
    const [searchDealer, setSearchDealer] = useState();
    const [searchValue, setSearchValue] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dealer, setDealer] = useState({
        name: null,
        latitude: null,
        longitude: null,
        description: null,
        dealerService: null,
        dealerPhone: null,
        dealerWebsite: null,
        services: [{ name: null }]
    })

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
                response.data.sort(function (a, b) {
                    return (`${a.name}`).localeCompare(`${b.name}`);
                })
                setSearchDealer(response.data);
                console.log(response.data)
            }).catch(function (error) {
                console.log(error);
            })
        } else if (value.length !== 0) {
            GetDealerListService().then(function (response) {
                let data = response.data.filter(x => value.includes(x.description));
                setSearchDealer(data);
            }).catch(function (error) {
                console.log(error);
            })
        }
    }, [value]);

    const showModal = (evt) => {
        GetDealerService({ id: evt.currentTarget.id }).then(function (response) {
            // handle success
            setDealer(response.data);
            setIsModalVisible(true);
        })
            .catch(function (error) {
                console.log(error);
            })
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
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
            if (!didCancel) {
                if (lastLocation !== null && location.pathname.includes('/list-dealer/ok')) {
                    if (lastLocation.pathname === '/create-dealer') {
                        GetDealerService({ id: location.pathname.split('/')[3] }).then(function (res) {
                            response.data = response.data.filter(x => x.id !== res.data.id);
                            response.data.unshift(res.data);
                            setSearchDealer(response.data);
                        }).catch(function (error) {
                            console.log(error);
                        })
                    } else if (lastLocation.pathname.includes('/edit-dealer/')) {
                        GetDealerService({ id: lastLocation.pathname.substring(13, lastLocation.pathname.length) }).then(function (res) {
                            response.data = response.data.filter(x => x.id !== res.data.id);
                            response.data.unshift(res.data);
                            setSearchDealer(response.data);
                        }).catch(function (error) {
                            console.log(error);
                        })
                    }
                } else {
                    response.data.sort(function (a, b) {
                        return (`${a.name}`).localeCompare(`${b.name}`);
                    });

                    setSearchDealer(response.data);
                    console.log(response.data)
                }
            }
        }).catch(function (error) {
            console.log(error);
        })
    }, [lastLocation, location.pathname])
    return (
        <Content className={styles.antLayoutContent}>
            <Row>
                <h2 className={styles.title}>Dealer List</h2>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                <Col span={5}>
                    <Select {...selectProps} />
                </Col>
                <Col span={10}>
                    <Search onSearch={handleSearch} />
                </Col>
                <Col span={4}></Col>
                {currentUser.role === 'Master' ? <Col span={5}>
                    <Button className={styles.create}>
                        <Link to='/create-dealer'>Create new dealer</Link>
                    </Button>
                </Col> : ""}
            </Row>


            {searchDealer !== undefined ?
                <>
                    {dealer !== null ?

                        <Modal width={700} title="Dealer Information" visible={isModalVisible} footer={null} onCancel={handleCancel} centered={true}>
                            <div style={{ height: '50vh', width: '100%' }}>
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: 'AIzaSyD6whTP5DIVEj4asLVRm0Wyjef8vXlIIpY' }}
                                    defaultCenter={{ lat: 16.466393028698914, lng: 107.5614913406225 }}
                                    //defaultCenter={{ lat: dealer.latitude, lng: dealer.longtitude }}
                                    defaultZoom={5}
                                    yesIWantToUseGoogleMapApiInternals={true}
                                >
                                    <AnyReactComponent
                                        lat={dealer.latitude}
                                        lng={dealer.longtitude}
                                    />
                                </GoogleMapReact>
                            </div>
                            <table className={styles.tableModal}>
                                <tr>
                                    <td>Name</td>
                                    <td>{dealer.name} </td>
                                </tr>
                                <tr>
                                    <td>Email </td>
                                    <td>{dealer.dealerEmail} </td>
                                </tr>
                                <tr>
                                    <td>Phone </td>
                                    <td>{dealer.dealerPhone}</td>
                                </tr>
                                <tr>
                                    <td>Website </td>
                                    <td><a style={{ color: 'blue' }} href="https://www.langha.haxaco.mercedes-benz.com.vn/">{dealer.dealerWebsite}</a></td>
                                </tr>
                                <tr>
                                    <td>Description </td>
                                    <td>{dealer.description}</td>
                                </tr>
                                <tr>
                                    <td>Services </td>
                                    <td>{dealer.services}</td>
                                </tr>
                            </table>
                        </Modal> : ''
                    }
                    <Row className={"ListTable"}>
                        <table style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th className={styles.borderTable}>{DealerConstant.Name}</th>
                                    <th></th>
                                    <th className={styles.borderTable}>{DealerConstant.DealerEmail}</th>
                                    <th></th>
                                    <th className={styles.borderTable}>{DealerConstant.DealerPhone}</th>
                                    <th></th>
                                    <th className={styles.borderTable}>{DealerConstant.DealerWebsite}</th>
                                    <th></th>
                                    <th className={styles.borderTable}>{DealerConstant.Services}</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchDealer.map(dealer => {
                                    return (
                                        <tr key={dealer.id}>
                                            <td className={styles.borderRow} onClick={showModal} id={dealer.id}>{dealer.name}</td>
                                            <td></td>
                                            <td className={styles.borderRow} onClick={showModal} id={dealer.id}>{dealer.dealerEmail}</td>
                                            <td></td>
                                            <td className={styles.borderRow} onClick={showModal} id={dealer.id}>{dealer.dealerPhone}</td>
                                            <td></td>
                                            <td className={styles.borderRow} onClick={showModal} id={dealer.id}>{dealer.dealerWebsite}</td>
                                            <td></td>
                                            <td className={styles.borderRow} onClick={showModal} id={dealer.id}>{dealer.services}</td>
                                            <td></td>
                                            <td>

                                                {currentUser.role === "Master" ? <Link to={`/edit-dealer/${dealer.id}`}><i className="bi bi-pencil-fill"></i></Link> : ""}
                                                {/* <i className="bi bi-x-circle" onClick={showModalDisable} id={dealer.id}></i> */}
                                            </td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    </Row>
                </> : ""
            }
        </Content>
    )
}
export default ListDealer;