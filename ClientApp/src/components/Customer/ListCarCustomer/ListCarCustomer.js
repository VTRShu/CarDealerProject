import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Input, Button, Layout, Pagination, Modal } from 'antd';
import { FilterFilled, InfoCircleFilled } from '@ant-design/icons';
import styles from './ListCarCustomer.module.css'
import { GetCarListMasterService, GetCarService, GetAllCarMasterService } from '../../../Services/CarService'
import './ListCarCustomerAntStyle.css';
import 'font-awesome/css/font-awesome.min.css';
import Carousel from '../../CustomCarousel/Carousel'
import CarouselForModal from '../../CustomCarousel/CarouselForModal';
import CarConstant from '../../../Share/Constant/CarConstant'
import { Link, useParams, useHistory } from "react-router-dom";
import { Select } from 'antd';
import GoogleMapReact from 'google-map-react';
import { FaGasPump, FaMapMarkerAlt } from 'react-icons/fa';
import { FcEngineering } from 'react-icons/fc';
import { GiGears } from 'react-icons/gi';
import { IoMdArrowRoundBack } from 'react-icons/io';
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
const ListCarCustomer = () => {
    const [image, setImage] = useState();
    const [searchCars, setSearchCars] = useState();
    const [valueType, setValueType] = useState([]);
    const [valueModel, setValueModel] = useState([]);
    const [pageIndex, setPageIndex] = useState(CarConstant.PageIndexDefault);
    const [pageSizeOld, setPageSizeOld] = useState(CarConstant.PageSizeDefault);
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
        images: { imageSrc: null },
        isAvailable: null,
    })
    const { model } = useParams();
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

            GetCarListMasterService({ index: pageIndex, size: pageSizeOld }).then(function (response) {
                setSearchCars(response.data);
            }).catch(function (error) {
                console.error(error);
            })
        } else if (valueType.length !== 0) {
            GetAllCarMasterService().then(function (response) {
                let data = response.data.filter(x => x.isAvailable === true && valueType.includes(x.type.name));
                setSearchCars({ ...searchCars, items: data.slice((pageIndex - 1) * pageSizeOld, pageIndex * pageSizeOld) });
                setTotal(data);
            }).catch(function (error) {
                console.log(error);
            })
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

            GetCarListMasterService({ index: pageIndex, size: pageSizeOld }).then(function (response) {
                setSearchCars(response.data);
            }).catch(function (error) {
                console.error(error);
            })

        } else if (valueModel.length !== 0) {

            GetAllCarMasterService().then(function (response) {
                let data = response.data.filter(x => x.isAvailable === true && valueModel.includes(x.model.name));
                setSearchCars({ ...searchCars, items: data.slice((pageIndex - 1) * pageSizeOld, pageIndex * pageSizeOld) });
                setTotal(data);
            }).catch(function (error) {
                console.log(error);
            })

        }
    }, [valueModel]);
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    useEffect(() => {
        if (valueType.length !== 0 || valueModel.length !== 0) {
            setSearchCars({ ...searchCars, items: total.slice((pageIndex - 1) * pageSizeOld, pageIndex * pageSizeOld) })
        } else {
            console.log(model)
            GetCarListMasterService({ index: pageIndex, size: pageSizeOld }).then(function (response) {
                if (model === undefined || model === null) {
                    setSearchCars(response.data);
                } else {
                    let data = response.data.items.filter(x => x.isAvailable === true && model.includes(x.model.name));
                    setSearchCars({ ...searchCars, items: data.slice((pageIndex - 1) * pageSizeOld, pageIndex * pageSizeOld) });
                    setTotal(data);
                }
            }).catch(function (err) {
                console.log(err);
            })
        }
    }, [pageSizeOld, pageIndex])
    const history = useHistory();
    return (
        <Content className={styles.antLayoutContent}>

            <Row> <Button onClick={() => history.goBack()} className={styles.create}>
                <IoMdArrowRoundBack style={{ fontSize: '20px' }} />
            </Button>
            </Row>
            <br />
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                <Col span={4}>
                    <Select {...selectTypeProps} />
                </Col>
                <Col span={4}>
                    <Select {...selectModelProps} />
                </Col>
                <Col span={4} offset={2}> <a href="https://localhost:5001/Images/interactions.attachments.0.Mobile price list September 2021.pdf"> <Button>View Price list</Button></a> </Col>
            </Row>
            <br />
            {
                searchCars !== undefined ?
                    <>

                        <Row>
                            <div className={styles.carCustomer}>
                                {searchCars.items.map(carInfo => {
                                    const images = [
                                        {
                                            id: '1',
                                            url: carInfo.images[0].imageSrc,
                                        },
                                        {
                                            id: '2',
                                            url: carInfo.images[1].imageSrc,
                                        },
                                        {
                                            id: '3',
                                            url: carInfo.images[2].imageSrc,
                                        },
                                        {
                                            id: '4',
                                            url: carInfo.images[3].imageSrc,
                                        },
                                        {
                                            id: '5',
                                            url: carInfo.images[4].imageSrc,
                                        },
                                        {
                                            id: '6',
                                            url: carInfo.images[5].imageSrc,
                                        },
                                    ];
                                    return (

                                        <div key={carInfo.id} className={styles.boxCar}>
                                            <div><Carousel images={images} pxs={150}></Carousel></div>
                                            <div style={{ marginLeft: '9%' }} id={carInfo.id} ><h3>{carInfo.name}</h3></div>
                                            <div style={{ marginLeft: '9%' }} id={carInfo.id}><h4>{carInfo.price} VND</h4></div>
                                            <div style={{ marginLeft: '9%' }} id={carInfo.id}>{carInfo.power},{carInfo.fuelType},{carInfo.transmission}</div>

                                            <div style={{ marginLeft: '9%' }} id={carInfo.id} >{carInfo.equipment}</div>

                                            <div id={carInfo.id} style={{ marginLeft: '9%', display: 'flex', flexDirection: 'row' }}>
                                                <div ><FaMapMarkerAlt style={{ fontSize: '20px' }} /></div>
                                                <div>
                                                    <p>{carInfo.dealer.name}</p>
                                                    <p>{carInfo.dealer.description}</p>
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'center' }} ><Button style={{ width: '100%' }}><Link to={`/car-infor/${carInfo.id}`}>More Detail</Link></Button></div>
                                        </div>

                                    )
                                })}
                            </div>
                        </Row>
                        <Row>

                        </Row>
                        <Row style={{ marginRight: '7%' }} justify="end">
                            <Col>
                                {valueType.length !== 0 || valueModel.length !== 0
                                    ? <Pagination size={'small'} total={total.length} defaultCurrent={1} itemRender={itemRender} showSizeChanger={true} onChange={handleChangePage} />
                                    : <Pagination size={'small'} total={searchCars.totalRecords} defaultCurrent={1} itemRender={itemRender} showSizeChanger={true} onChange={handleChangePage} />
                                }
                            </Col>
                        </Row>
                    </> : ""
            }
        </Content>
    )
}
export default ListCarCustomer;