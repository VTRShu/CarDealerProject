import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Input, Button, Layout, Pagination, Modal } from 'antd';
import { FilterFilled, InfoCircleFilled } from '@ant-design/icons';
import styles from './ListCar.module.css'
import {
    GetAllCarAdminService, GetAllCarMasterService,
    GetCarListAdminService, GetCarListMasterService,
    GetCarService, DisableCarService
} from '../../../../Services/CarService';
import './ListCarAntStyle.css';
import 'font-awesome/css/font-awesome.min.css';
import Carousel from '../../../CustomCarousel/Carousel';
import CarouselForModal from '../../../CustomCarousel/CarouselForModal';
import CarConstant from '../../../../Share/Constant/CarConstant'
import { Link, useLocation } from "react-router-dom";
import { useLastLocation } from 'react-router-last-location';
import CurrentUserContext from '../../../../Share/Context/CurrentUserContext'
import { Select } from 'antd';
import Slider from "react-slick";
import GoogleMapReact from 'google-map-react';
import { isForOfStatement } from 'typescript';
import { FaGasPump } from 'react-icons/fa';
import { FcEngineering } from 'react-icons/fc';
import { GiGears } from 'react-icons/gi';
const { Search } = Input;
const { Content } = Layout;
function itemRender(current, type, originalElement) {
    if (type === 'prev') {
        return <Button size="small" style={{ fontSize: '14px', marginRight: '10px' }} >Previous</Button>;
    }
    if (type === 'next') {
        return <Button size="small" style={{ fontSize: '14px', marginLeft: '8px', marginRight: '10px' }}>Next</Button>;
    }
    return originalElement;
}

const optionsType = [{ label: 'Sedan', value: 'Sedan' }, { label: 'SUV', value: 'SUV' }, { label: 'Coupe', value: 'Coupe' }, { label: 'Van/MPV', value: 'Van/MPV' }];
const optionsModel = [
    { label: 'C-CLASS', value: 'C-Class' },
    { label: 'E-CLASS', value: 'E-Class' },
    { label: 'A-CLASS', value: 'A-Class' },
    { label: 'S-CLASS', value: 'S-Class' },
    { label: 'MayBach S-CLASS', value: 'MayBach S-Class' },
    { label: 'CLA-CLASS', value: 'CLA-Class' },
    { label: 'GLC', value: 'GLC' },
    { label: 'GLB', value: 'GLB' },
    { label: 'GLA', value: 'GLA' },
    { label: 'GLK', value: 'GLK' },
    { label: 'GLE', value: 'GLE' },
    { label: 'GLS', value: 'GLS' },
    { label: 'MayBach GLS', value: 'MayBach GLS' },
    { label: 'GLC Coupe', value: 'GLC Coupe' },
    { label: 'GLE Coupe', value: 'GLE Coupe' },
    { label: 'V-CLASS', value: 'V-Class' },
    { label: 'AMG GT', value: 'AMG GT' },
    { label: 'G-CLASS', value: 'G-Class' },
]
const AnyReactComponent = ({ text }) => <div style={{ wordWrap: 'normal' }}><img style={{ height: '22px', width: '20px' }} src="https://localhost:5001/Images/copy_492419507.png" /><b style={{ color: 'red' }}>{text}</b></div>;
const ListCar = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const [image, setImage] = useState();
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [searchCars, setSearchCars] = useState();
    const [valueType, setValueType] = useState([]);
    const [valueModel, setValueModel] = useState([]);
    const location = useLocation();
    const lastLocation = useLastLocation();
    const [pageIndex, setPageIndex] = useState(CarConstant.PageIndexDefault);
    const [pageSizeOld, setPageSizeOld] = useState(CarConstant.PageSizeDefault);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalDisableVisible, setIsModalDisableVisible] = useState(false);
    const [searchValue, setsearchValue] = useState('');
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
        images: { imageSrc: null },
        isAvailable: null,
    })
    const [total, setTotal] = useState(0);
    const handleChangePage = (page, pageSize) => {
        if (page !== pageIndex) {
            setPageIndex(page);
        }
        if (pageSize !== pageSizeOld) {
            setPageSizeOld(pageSize);
        }
    }

    const selectTypeProps = {
        suffixIcon: <FilterFilled />,
        style: {
            width: '100%',
        },
        mode: 'multiple',
        value: valueType,
        options: optionsType,
        onChange: (newValue) => {
            setValueType(newValue);
        },
        placeholder: 'Body Type',
        maxTagCount: 'responsive',
        showArrow: true,
        optionFilterProp: 'label'
    }
    useEffect(() => {
        if (valueType.length === 0 && total !== 0) {
            if (currentUser.role === 'Master') {
                GetCarListMasterService({ index: pageIndex, size: pageSizeOld }).then(function (response) {
                    setSearchCars(response.data);
                }).catch(function (error) {
                    console.error(error);
                })
            } else if (currentUser.role === 'Admin') {
                GetCarListAdminService({ index: pageIndex, size: pageSizeOld }).then(function (response) {
                    setSearchCars(response.data);
                }).catch(function (error) {
                    console.error(error);
                })
            }
        } else if (valueType.length !== 0) {
            if (currentUser.role === 'Master') {
                GetAllCarMasterService().then(function (response) {
                    let data = response.data.filter(x => x.isAvailable === true && valueType.includes(x.type.name));
                    setSearchCars({ ...searchCars, items: data.slice((pageIndex - 1) * pageSizeOld, pageIndex * pageSizeOld) });
                    setTotal(data);
                }).catch(function (error) {
                    console.log(error);
                })
            } else if (currentUser.role === 'Admin') {
                GetAllCarAdminService().then(function (response) {
                    let data = response.data.filter(x => x.isAvailable === true && valueType.includes(x.type.name));
                    setSearchCars({ ...searchCars, items: data.slice((pageIndex - 1) * pageSizeOld, pageIndex * pageSizeOld) });
                    setTotal(data);
                }).catch(function (error) {
                    console.log(error);
                })
            }
        }
    }, [valueType]);
    const selectModelProps = {
        suffixIcon: <FilterFilled />,
        style: {
            width: '100%',
        },
        mode: 'multiple',
        value: valueModel,
        options: optionsModel,
        onChange: (newValue) => {
            setValueModel(newValue);
        },
        placeholder: 'Model',
        maxTagCount: 'responsive',
        showArrow: true,
        optionFilterProp: 'label'
    }
    useEffect(() => {
        if (valueModel.length === 0 && total !== 0) {
            if (currentUser.role === 'Master') {
                GetCarListMasterService({ index: pageIndex, size: pageSizeOld }).then(function (response) {
                    setSearchCars(response.data);
                }).catch(function (error) {
                    console.error(error);
                })
            } else if (currentUser.role === 'Admin') {
                GetCarListAdminService({ index: pageIndex, size: pageSizeOld }).then(function (response) {
                    setSearchCars(response.data);
                }).catch(function (error) {
                    console.error(error);
                })
            }
        } else if (valueModel.length !== 0) {
            if (currentUser.role === 'Master') {
                GetAllCarMasterService().then(function (response) {
                    let data = response.data.filter(x => x.isAvailable === true && valueModel.includes(x.model.name));
                    setSearchCars({ ...searchCars, items: data.slice((pageIndex - 1) * pageSizeOld, pageIndex * pageSizeOld) });
                    setTotal(data);
                }).catch(function (error) {
                    console.log(error);
                })
            } else if (currentUser.role === 'Admin') {
                GetAllCarAdminService().then(function (response) {
                    let data = response.data.filter(x => x.isAvailable === true && valueModel.includes(x.model.name));
                    setSearchCars({ ...searchCars, items: data.slice((pageIndex - 1) * pageSizeOld, pageIndex * pageSizeOld) });
                    setTotal(data);
                }).catch(function (error) {
                    console.log(error);
                })
            }
        }
    }, [valueModel]);
    //show car detail
    const showModal = (evt) => {
        GetCarService({ id: evt.target.id }).then(function (response) {
            setCar(response.data);
            setImage(response.data.images)
            setImage([
                {
                    uid: '1',
                    url: response.data.images[0].imageSrc,
                },
                {
                    uid: '2',
                    url: response.data.images[1].imageSrc,
                },
                {
                    uid: '3',
                    url: response.data.images[2].imageSrc,
                },
                {
                    uid: '4',
                    url: response.data.images[3].imageSrc,
                },
                {
                    uid: '5',
                    url: response.data.images[4].imageSrc,
                },
                {
                    uid: '6',
                    url: response.data.images[5].imageSrc,
                }]);
            setIsModalVisible(true);
        }).catch(function (err) {
            console.log(err);
        })
    }
    //Show modal for delete
    // const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
    // const showModalDelete = evt => {
    //     GetCarService({ id: evt.currentTarget.id }).then(function (response) {
    //         setCar(response.data);
    //         setIsModalDeleteVisible(true);
    //     }).catch(function (error) {
    //         console.log(error);
    //     })
    // }
    // const handleDeleteOk =()=>{

    // }
    // const handleDeleteCancel = () => {
    //     setIsModalDisableVisible(false);
    // };
    //Show modal for make Not Available
    const showModalDisable = evt => {
        GetCarService({ id: evt.currentTarget.id }).then(function (response) {
            setCar(response.data);
            setIsModalDisableVisible(true);
        }).catch(function (error) {
            console.log(error);
        })
    }

    const handleDisableOk = () => {
        DisableCarService({ id: car.id }).then(function (response) {
            if (response.status === 200) {
                setSearchCars({ ...searchCars, items: searchCars.items.filter(x => x.id !== car.id) });
                setIsModalDisableVisible(false);
            }
        }).catch(function (error) {
            console.log(error);
            setIsModalDisableVisible(false);
        })
    }

    const handleDisableCancel = () => {
        setIsModalDisableVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        window.location.reload();
    };

    const handleSearch = (value) => {
        if (value !== '') {
            let searchInput = value.toUpperCase().trim();
            if (currentUser.role === 'Master') {
                GetAllCarMasterService().then(function (response) {
                    let data = response.data.filter(x => x.isAvailable === true
                        && (x.name.toUpperCase().includes(searchInput)
                            || x.dealer.name.toUpperCase().includes(searchInput)))
                    setSearchCars({ ...searchCars, items: data.slice((pageIndex - 1) * pageSizeOld, pageIndex * pageSizeOld) });
                    setTotal(data);
                    setsearchValue(searchInput);
                }).catch(function (error) {
                    console.log(error);
                })
            } else if (currentUser.role === 'Admin') {
                GetAllCarAdminService().then(function (response) {
                    let data = response.data.filter(x => x.isAvailable === true
                        && (x.name.toUpperCase().includes(searchInput)
                            || x.dealer.name.toUpperCase().includes(searchInput)))
                    setSearchCars({ ...searchCars, items: data.slice((pageIndex - 1) * pageSizeOld, pageIndex * pageSizeOld) });
                    setTotal(data);
                    setsearchValue(searchInput);
                }).catch(function (error) {
                    console.log(error);
                })
            }
        } else {
            if (currentUser.role === 'Master') {
                GetCarListMasterService({ index: pageIndex, size: pageSizeOld }).then(function (response) {
                    setSearchCars(response.data);
                }).catch(function (error) {
                    console.error(error);
                })
            } else if (currentUser.role === 'Admin') {
                GetCarListAdminService({ index: pageIndex, size: pageSizeOld }).then(function (response) {
                    setSearchCars(response.data);
                }).catch(function (error) {
                    console.error(error);
                })
            }
        }
    }
    useEffect(() => {
        let didCancel = false;
        if (valueType.length !== 0 || valueModel.length !== 0 || searchValue !== '') {
            setSearchCars({ ...searchCars, items: total.slice((pageIndex - 1) * pageSizeOld, pageIndex * pageSizeOld) })
        } else {
            if (currentUser.role === 'Master') {
                GetCarListMasterService({ index: pageIndex, size: pageSizeOld }).then(function (response) {
                    if (!didCancel) {
                        if (lastLocation !== null && location.pathname.includes('/list-car/ok')) {
                            if (lastLocation.pathname === '/create-car') {
                                GetCarService({ id: location.pathname.split('/')[3] }).then(function (res) {
                                    response.data.items = response.data.items.filter(x => x.id !== res.data.id);
                                    if (pageIndex === 1) {
                                        response.data.items.unshift(res.data);
                                    }
                                    setSearchCars(response.data);
                                }).catch(function (error) {
                                    console.log(error);
                                })
                            } else if (lastLocation.pathname.includes('/edit-car/')) {
                                GetCarService({ id: lastLocation.pathname.substring(10, lastLocation.pathname.length) }).then(function (res) {
                                    response.data.items = response.data.items.filter(x => x.id !== res.data.id);
                                    if (pageIndex === 1) {
                                        response.data.items.unshift(res.data);
                                    }
                                    setSearchCars(response.data);
                                }).catch(function (err) {
                                    console.error(err);
                                })
                            }
                            setTotal(0);
                        } else {
                            setSearchCars(response.data);
                        }
                    }
                }).catch(function (err) {
                    console.log(err);
                })
            } else if (currentUser.role === 'Admin') {
                GetCarListAdminService({ index: pageIndex, size: pageSizeOld }).then(function (response) {
                    if (!didCancel) {
                        if (lastLocation !== null && location.pathname.includes('/list-car/ok')) {
                            if (location.pathname === '/create-car') {
                                GetCarService({ id: location.pathname.split('/')[3] }).then(function (res) {
                                    response.data.items = response.data.items.filter(x => x.id !== res.data.id);
                                    if (pageIndex === 1) {
                                        response.data.items.unshift(res.data);
                                    }
                                    setSearchCars(response.data);
                                }).catch(function (error) {
                                    console.log(error);
                                })
                            } else if (lastLocation.pathname.includes('/edit-car/')) {
                                GetCarService({ id: lastLocation.pathname.substring(10, lastLocation.pathname.length) }).then(function (res) {
                                    response.data.items = response.data.items.filter(x => x.id !== res.data.id);
                                    if (pageIndex === 1) {
                                        response.data.items.unshift(res.data);
                                    }
                                    setSearchCars(response.data);
                                }).catch(function (err) {
                                    console.error(err);
                                })
                            }
                            setTotal(0);
                        } else {
                            setSearchCars(response.data);
                        }
                    }
                }).catch(function (err) {
                    console.log(err);
                })
            }
        }
        return () => didCancel = true;
    }, [pageSizeOld, pageIndex, lastLocation, location.pathname])


    return (
        <Content className={styles.antLayoutContent} >
            <Row>
                <h2 className={styles.title}>Car List</h2>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                <Col span={4}>
                    <Select {...selectTypeProps} />
                </Col>
                <Col span={4}>
                    <Select {...selectModelProps} />
                </Col>
                <Col span={10}>
                    <Search onSearch={handleSearch} />
                </Col>
                <Col span={2}>

                </Col>
                <Col span={4}>
                    <Button className={styles.create}>
                        <Link to='/create-car'>Create new car</Link>
                    </Button>
                </Col>
            </Row>
            <Modal title={car !== null ? "Are you sure?" : "Can not disable car"} visible={isModalDisableVisible}
                onOk={handleDisableOk} onCancel={handleDisableCancel} centered={true} closable={car !== null ? false : true}
                footer={null} style={{ height: '20', borderRadius: '20px', fontWeight: '30px' }} maskClosable={car !== null ? false : true}>
                {
                    <>
                        <b style={{ marginLeft: '25%' }}>Do you want to mark this car not available?</b>
                        <br />
                        <br />
                        <div className={styles.buttonGroup}>
                            <Button className={styles.create}
                                style={{ marginLeft: '22%' }}
                                onClick={handleDisableOk}>Disable</Button>
                            <Button className={styles.cancelButton}
                                style={{ marginLeft: '20%' }}
                                onClick={handleDisableCancel}>Cancel</Button>
                        </div>
                    </>
                }
            </Modal>
            <br />
            {
                searchCars !== undefined ?
                    <>{
                        car !== null ?
                            <Modal width={'90%'} title="Car Information" visible={isModalVisible} footer={null} onCancel={handleCancel} centered={true}>

                                <div style={{ width: '100%' }}>
                                    <div style={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap' }}>
                                        <div style={{ flexBasis: '100%' }}><h2>{car.name}</h2></div>
                                        <div style={{ flexBasis: '60%' }}>
                                            <CarouselForModal id={car.id} autoplay images={image} style={{ height: '40vh', width: '100%' }}></CarouselForModal>
                                        </div>
                                        <div style={{ flexBasis: '40%' }}>
                                            <div style={{ marginTop: '5%' }}><b style={{ borderBottom: '1px solid gray', fontSize: '30px' }}>{car.price} VND</b></div>
                                            <div style={{ marginTop: '1%', fontSize: '20px' }}> <FcEngineering /> {car.power}   <FaGasPump />{car.fuelType}</div>
                                            <div style={{ marginTop: '1%', fontSize: '20px' }}><GiGears />{car.transmission}</div>
                                        </div>
                                    </div>
                                </div>

                                <div >
                                    <div style={{ width: '100%', height: '60vh' }}>
                                        <GoogleMapReact
                                            bootstrapURLKeys={{ key: 'AIzaSyD6whTP5DIVEj4asLVRm0Wyjef8vXlIIpY' }}
                                            defaultCenter={{ lat: 16.466393028698914, lng: 107.5614913406225 }}
                                            //defaultCenter={{ lat: dealer.latitude, lng: dealer.longtitude }}
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
                                <div style={{ display: 'flex', }}>
                                    <div style={{ width: '50%' }}>
                                        <table className={styles.tableModal}>
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
                            </Modal>

                            : ''
                    }
                        <Row className={"ListTable"}>
                            <table style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th className={styles.borderTable}>{CarConstant.Images}</th>
                                        <th></th>
                                        <th className={styles.borderTable}>{CarConstant.Name}</th>
                                        <th></th>
                                        <th className={styles.borderTable}>{CarConstant.Date}</th>
                                        <th></th>
                                        <th className={styles.borderTable}>{CarConstant.Price}</th>
                                        <th></th>
                                        <th className={styles.borderTable}>Some Information</th>
                                        <th></th>
                                        <th className={styles.borderTable}>{CarConstant.Dealer}</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        searchCars.items.map(car => {
                                            const images = [
                                                {
                                                    id: '1',
                                                    url: car.images[0].imageSrc,
                                                },
                                                {
                                                    id: '2',
                                                    url: car.images[1].imageSrc,
                                                },
                                                {
                                                    id: '3',
                                                    url: car.images[2].imageSrc,
                                                },
                                                {
                                                    id: '4',
                                                    url: car.images[3].imageSrc,
                                                },
                                                {
                                                    id: '5',
                                                    url: car.images[4].imageSrc,
                                                },
                                                {
                                                    id: '6',
                                                    url: car.images[5].imageSrc,
                                                },
                                            ];
                                            return (
                                                <tr key={car.id}>
                                                    <td className={styles.borderImage} id={car.id}>
                                                        <Carousel id={car.id} autoplay images={images} pxs={150}></Carousel>
                                                    </td>
                                                    <td></td>
                                                    <td className={styles.borderRow} onClick={showModal} id={car.id}>{car.name}</td>
                                                    <td></td>
                                                    <td className={styles.borderRow} onClick={showModal} id={car.id}>{car.date}</td>
                                                    <td></td>
                                                    <td className={styles.borderRow} onClick={showModal} id={car.id}>{car.price}</td>
                                                    <td></td>
                                                    <td className={styles.borderRow} onClick={showModal} id={car.id}>{car.power},{car.fuelType},{car.transmission}</td>
                                                    <td></td>
                                                    <td className={styles.borderRow} onClick={showModal} id={car.id}>{car.dealer.name}</td>
                                                    <td></td>
                                                    <td>
                                                        <Link to={`/edit-car/${car.id}`}><i className="bi bi-pencil-fill"></i></Link>
                                                        {/* <i className="bi bi-x-circle" onClick={showModalDelete} id={car.id}></i> */}
                                                        <i className="bi bi-eye-slash" onClick={showModalDisable} id={car.id}></i>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </Row>
                        <Row>

                        </Row>
                        <Row style={{ marginRight: '7%' }} justify="end">
                            <Col>
                                {valueType.length !== 0 || valueModel.length !== 0 || searchValue !== ''
                                    ? <Pagination size={'small'} total={total.length} defaultCurrent={1} itemRender={itemRender} showSizeChanger={true} onChange={handleChangePage} />
                                    : <Pagination size={'small'} total={searchCars.totalRecords} defaultCurrent={1} itemRender={itemRender} showSizeChanger={true} onChange={handleChangePage} />
                                }
                            </Col>
                        </Row>


                    </> : ''
            }
        </Content >
    )
}

export default ListCar;