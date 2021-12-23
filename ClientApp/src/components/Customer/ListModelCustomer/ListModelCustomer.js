import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Input, Button, Layout, Menu, Dropdown } from 'antd';
import { FilterFilled, InfoCircleFilled } from '@ant-design/icons';
import styles from './ListModelCustomer.module.css'
import 'font-awesome/css/font-awesome.min.css';
import {
    GetModelListService
} from '../../../Services/ModelService';
import CarouselModel from '../../CustomCarousel/CarouselModel'
import './ListModelCustomerAntStyle.css'
import ModelConstant from '../../../Share/Constant/ModelConstant'
import { Link, useLocation, useHistory } from "react-router-dom";
import { useLastLocation } from 'react-router-last-location';
import { Select } from 'antd';
import Carousel from '../../CustomCarousel/Carousel';
import { GiSteeringWheel } from 'react-icons/gi';
import { FaBook } from 'react-icons/fa';
import { MdShoppingCart } from 'react-icons/md';
import { BsGearWideConnected } from 'react-icons/bs';
import { IoMdArrowRoundBack } from 'react-icons/io';
const { Search } = Input;
const { Content } = Layout;
const options = [{ label: 'Sedan', value: 'Sedan' }, { label: 'SUV', value: 'SUV' }, { label: 'Coupe', value: 'Coupe' }, { label: 'Van/MPV', value: 'Van/MPV' }];
const ListModelCustomer = () => {
    const history = useHistory();
    const [value, setValue] = useState([]);
    const location = useLocation();
    const contentStyle = {
        height: "160px",
        color: "#fff",
        lineHeight: "160px",
        textAlign: "center",
        background: "#364d79"
    };

    const lastLocation = useLastLocation();
    const [searchModel, setSearchModel] = useState();
    const [sedan, setSedan] = useState();
    const [suv, setSUV] = useState();
    const [coupe, setCoupe] = useState();
    const selectProps = {
        suffixIcon: <FilterFilled />,
        style: {
            width: '100%',
        },
        value,
        options,
        onChange: (newValue) => {
            setValue(newValue);
        },
        placeholder: 'Type',
        maxTagCount: 'responsive',
        showArrow: true,
        optionFilterProp: 'label'
    };
    useEffect(() => {
        if (value.length === 0) {
            GetModelListService().then(function (response) {
                setSearchModel(response.data);
                setSedan(response.data.filter(x => x.type.name == "Sedan"));
                setSUV(response.data.filter(x => x.type.name === "SUV"))
                setCoupe(response.data.filter(x => x.type.name === "Coupe"))
            }).catch(function (error) {
                console.log(error);
            })
        } else if (value.length !== 0) {
            GetModelListService().then(function (response) {
                let data = response.data.filter(x => value.includes(x.type.name));
                if (value === "Sedan") {
                    setSedan(data);
                    setSUV([]);
                    setCoupe([])
                } else if (value === "SUV") {
                    setSUV(data);
                    setSedan([]);
                    setCoupe([]);
                } else if (value === "Coupe") {
                    setCoupe(data);
                    setSedan([]);
                    setSUV([]);
                }

            }).catch(function (error) {
                console.log(error);
            })
        }
    }, [value]);

    useEffect(() => {
        GetModelListService().then(function (response) {
            setSearchModel(response.data);
            setSedan(response.data.filter(x => x.type.name == "Sedan"));
            setSUV(response.data.filter(x => x.type.name === "SUV"))
            setCoupe(response.data.filter(x => x.type.name === "Coupe"))
        }).catch(function (error) {
            console.log(error);
        })
    }, [])
    return (
        <Content className={styles.antLayoutContent}>
            <Row> <Button onClick={() => history.push('/')} style={{ backgroundColor: 'black', color: 'white', borderRadius: '7px' }}>
                <IoMdArrowRoundBack style={{ fontSize: '20px' }} />
            </Button>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                <Col span={5}>
                    <Select {...selectProps} />
                </Col>
            </Row>
            <br />
            <Row>
                <h3><i>Sedan</i></h3>
                {
                    sedan !== undefined ?
                        <>
                            <div className={styles.modelCustomer}>

                                {sedan.map(model => {
                                    const images = [
                                        {
                                            id: '1',
                                            url: model.images[0].imageSrc,
                                        },
                                        {
                                            id: '2',
                                            url: model.images[1].imageSrc,
                                        }, {
                                            id: '3',
                                            url: model.images[2].imageSrc,
                                        },
                                    ]
                                    return (
                                        <Dropdown overlay={<Menu>
                                            <Menu.Item ><FaBook style={{ fontSize: '18px' }} /> Learn More</Menu.Item>
                                            <Menu.Item> <Link to={`/create-test-drive/${model.name}`}><GiSteeringWheel style={{ fontSize: '18px' }} /> Book a test drive</Link></Menu.Item>
                                            <Menu.Item><BsGearWideConnected style={{ fontSize: '18px' }} /> Configure</Menu.Item>
                                            <Menu.Item><Link to={`/list-car-customer/${model.name}`}><MdShoppingCart style={{ fontSize: '18px' }} /> Search available car</Link></Menu.Item>
                                            <Menu.Item><a href={model.fileInfor.imageSrc}><FaBook /> brochures</a></Menu.Item>
                                        </Menu>} key={model.name}>
                                            <div className={styles.boxModel} key={model.name}>
                                                <div id={model.name}>{model.name}</div>
                                                <div id={model.name}>From {model.startPrice} VND</div>
                                                <div id={model.name}><Carousel id={model.name} images={images} pxs={200}></Carousel></div>
                                            </div>
                                        </Dropdown>
                                    )
                                })}
                            </div>
                        </>
                        : ''

                }
            </Row>
            <Row>
                <h3><i>SUV</i></h3>
                {
                    suv !== undefined ?
                        <>
                            <div className={styles.modelCustomer}>

                                {suv.map(model => {
                                    const images = [
                                        {
                                            id: '1',
                                            url: model.images[0].imageSrc,
                                        },
                                        {
                                            id: '2',
                                            url: model.images[1].imageSrc,
                                        }, {
                                            id: '3',
                                            url: model.images[2].imageSrc,
                                        },
                                    ]
                                    return (
                                        <Dropdown overlay={<Menu>
                                            <Menu.Item ><FaBook style={{ fontSize: '18px' }} /> Learn More</Menu.Item>
                                            <Menu.Item> <Link to={`/create-test-drive/${model.name}`}><GiSteeringWheel style={{ fontSize: '18px' }} /> Book a test drive</Link></Menu.Item>
                                            <Menu.Item><BsGearWideConnected style={{ fontSize: '18px' }} /> Configure</Menu.Item>
                                            <Menu.Item><Link to={`/list-car-customer/${model.name}`}><MdShoppingCart style={{ fontSize: '18px' }} /> Search available car</Link></Menu.Item>
                                            <Menu.Item><a href={model.fileInfor.imageSrc}><FaBook /> brochures</a></Menu.Item>
                                        </Menu>} key={model.name}>
                                            <div className={styles.boxModel} key={model.name}>
                                                <div id={model.name}>{model.name}</div>
                                                <div id={model.name}>From {model.startPrice} VND</div>
                                                <div id={model.name}><Carousel id={model.name} images={images} pxs={200}></Carousel></div>
                                            </div>
                                        </Dropdown>
                                    )
                                })}
                            </div>
                        </>
                        : ''

                }
            </Row>
            <Row>
                <h3><i>Coupe</i></h3>
                {
                    coupe !== undefined ?
                        <>
                            <div className={styles.modelCustomer1}>

                                {coupe.map(model => {
                                    const images = [
                                        {
                                            id: '1',
                                            url: model.images[0].imageSrc,
                                        },
                                        {
                                            id: '2',
                                            url: model.images[1].imageSrc,
                                        }, {
                                            id: '3',
                                            url: model.images[2].imageSrc,
                                        },
                                    ]
                                    return (
                                        <Dropdown overlay={<Menu>
                                            <Menu.Item ><FaBook style={{ fontSize: '18px' }} /> Learn More</Menu.Item>
                                            <Menu.Item> <Link to={`/create-test-drive/${model.name}`}><GiSteeringWheel style={{ fontSize: '18px' }} /> Book a test drive</Link></Menu.Item>
                                            <Menu.Item><BsGearWideConnected style={{ fontSize: '18px' }} /> Configure</Menu.Item>
                                            <Menu.Item><Link to={`/list-car-customer/${model.name}`}><MdShoppingCart style={{ fontSize: '18px' }} /> Search available car</Link></Menu.Item>
                                            <Menu.Item><a href={model.fileInfor.imageSrc}><FaBook /> brochures</a></Menu.Item>
                                        </Menu>} key={model.name}>
                                            <div className={styles.boxModel} key={model.name}>
                                                <div id={model.name}>{model.name}</div>
                                                <div id={model.name}>From {model.startPrice} VND</div>
                                                <div id={model.name}><CarouselModel id={model.name} images={images} pxs={200}></CarouselModel></div>
                                            </div>
                                        </Dropdown>
                                    )
                                })}
                            </div>
                        </>
                        : ''

                }
            </Row>
        </Content >
    )
}
export default ListModelCustomer