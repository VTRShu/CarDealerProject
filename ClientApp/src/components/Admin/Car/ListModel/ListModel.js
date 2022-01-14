import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Input, Button, Layout } from 'antd';
import { FilterFilled, InfoCircleFilled } from '@ant-design/icons';
import styles from './ListModel.module.css'
import 'font-awesome/css/font-awesome.min.css';
import Carousel from '../../../CustomCarousel/Carousel';
import {
    GetModelListService, GetModelService
} from '../../../../Services/ModelService';
import './ListModelAntStyle.css'
import ModelConstant from '../../../../Share/Constant/ModelConstant'
import { Link, useLocation } from "react-router-dom";
import { useLastLocation } from 'react-router-last-location';
import CurrentUserContext from '../../../../Share/Context/CurrentUserContext';
import { Select } from 'antd';
const { Search } = Input;
const { Content } = Layout;
const options = [{ label: 'Sedan', value: 'Sedan' }, { label: 'SUV', value: 'SUV' }, { label: 'Coupe', value: 'Coupe' }, { label: 'Van/MPV', value: 'Van/MPV' }];
const ListModel = () => {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [value, setValue] = useState([]);
    const location = useLocation();
    const lastLocation = useLastLocation();
    const [searchModel, setSearchModel] = useState();
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
        placeholder: 'Type',
        maxTagCount: 'responsive',
        showArrow: true,
        optionFilterProp: 'label'
    };
    useEffect(() => {
        if (value.length === 0) {
            GetModelListService().then(function (response) {
                response.data.sort(function (a, b) {
                    return a.startPrice - b.startPrice;
                })
                setSearchModel(response.data);
            }).catch(function (error) {
                console.log(error);
            })
        } else if (value.length !== 0) {
            GetModelListService().then(function (response) {
                let data = response.data.filter(x => value.includes(x.type.name));
                setSearchModel(data);
            }).catch(function (error) {
                console.log(error);
            })
        }
    }, [value]);

    useEffect(() => {
        let didCancel = false;
        GetModelListService().then(function (response) {
            if (!didCancel) {
                if (lastLocation !== null && location.pathname.includes('/list-model/ok')) {
                    if (lastLocation.pathname === '/create-model') {
                        GetModelService({ name: location.pathname.split('/')[3] }).then(function (res) {
                            response.data = response.data.filter(x => x.id !== res.data.id);
                            response.data.unshift(res.data);
                            setSearchModel(response.data);
                        }).catch(function (error) {
                            console.log(error);
                        })
                    } else if (lastLocation.pathname.includes('/edit-model/')) {
                        GetModelService({ name: lastLocation.pathname.substring(12, lastLocation.pathname.length) }).then(function (res) {
                            response.data = response.data.filter(x => x.name !== res.data.name);
                            response.data.unshift(res.data);
                            setSearchModel(response.data);
                        }).catch(function (error) {
                            console.log(error);
                        })
                    }
                } else {
                    response.data.sort(function (a, b) {
                        return a.startPrice - b.startPrice;
                    });
                    setSearchModel(response.data);
                }
            }
        }).catch(function (error) {
            console.log(error);
        })
    }, [lastLocation, location.pathname])

    const handleSearch = (value) => {
        if (value !== '') {
            let searchValue = value.toUpperCase().trim();
            GetModelListService().then(function (response) {
                let data = response.data.filter(x => x.name.toUpperCase().includes(searchValue))
                setSearchModel(data);
                setSearchValue(searchValue);
            }).catch(function (error) {
                console.log(error);
            })
        } else {
            GetModelListService().then(function (response) {
                response.data.sort(function (a, b) {
                    return a.startPrice - b.startPrice;
                })
                setSearchModel(response.data);
                setSearchValue('');
            }).catch(function (error) {
                console.log(error);
            })
        }
    }
    return (
        <Content className={styles.antLayoutContent}>
            <Row>
                <h2 className={styles.title}>Model List</h2>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                <Col span={5}>
                    <Select {...selectProps} />
                </Col>
                <Col span={10}>
                    <Search onSearch={handleSearch} />
                </Col>
                <Col span={4}></Col>
                {currentUser.role === 'Master' ?
                    <Col span={5}>
                        <Button className={styles.create}>
                            <Link to='/create-model'>Create new model</Link>
                        </Button>
                    </Col> : ""
                }
            </Row>
            <br />
            {
                searchModel !== undefined ?
                    <>
                        <Row className={"ListTable"}>
                            <table style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th className={styles.borderTable}>{ModelConstant.Image}</th>
                                        <th></th>
                                        <th className={styles.borderTable}>{ModelConstant.Name}</th>
                                        <th></th>
                                        <th className={styles.borderTable}>{ModelConstant.Type}</th>
                                        <th></th>
                                        <th className={styles.borderTable}>{ModelConstant.StartPrice}</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchModel.map(model => {
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
                                            <tr key={model.name}>
                                                <td className={styles.borderImage} id={model.name} >
                                                    <Carousel id={model.name} images={images} pxs={200}></Carousel>
                                                </td>
                                                <td></td>
                                                <td className={styles.borderRow} id={model.name} >Mercedes-{model.name}</td>
                                                <td></td>
                                                <td className={styles.borderRow} id={model.name} >{model.type.name}</td>
                                                <td></td>
                                                <td className={styles.borderRow} id={model.name} >{model.startPrice} VND</td>
                                                <td></td>
                                                <td>
                                                    {currentUser.role === "Master" ? <Link to={`/edit-model/${model.name}`}><i className="bi bi-pencil-fill"></i></Link> : ""}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </Row>
                    </>
                    : ''
            }
        </Content >
    )
}
export default ListModel