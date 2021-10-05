import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Input, Button, Layout, Pagination, Modal } from 'antd';
import { FilterFilled, InfoCircleFilled } from '@ant-design/icons';
import styles from './UserList.module.css'
import {
    GetListUserMasterService, GetListUserAdminService,
    DisableUserService, GetUserService,
    GetAllUserMasterSerivce, GetAllUserAdminSerivce
} from '../../../../Services/UserService';
import './UserListAntStyle.css'
import UserConstant from '../../../../Share/Constant/UserConstant'
import { Link, useLocation } from "react-router-dom";
import { useLastLocation } from 'react-router-last-location';
import CurrentUserContext from '../../../../Share/Context/CurrentUserContext'
import { Select } from 'antd';
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
const options = [{ label: 'Admin', value: 1 }, { label: 'Staff', value: 2 }];
const ListUser = () => {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [value, setValue] = useState([]);
    const location = useLocation();
    const lastLocation = useLastLocation();
    const [searchUser, setSearchUser] = useState();
    const [pageIndex, setPageIndex] = useState(UserConstant.PageIndexDefault);
    const [pageSizeOld, setPageSizeOld] = useState(UserConstant.PageSizeDefault);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalDisableVisible, setIsModalDisableVisible] = useState(false);
    const [searchValue, setsearchValue] = useState('');
    const [user, setUser] = useState({
        firstName: null,
        lastName: null,
        dob: null,
        email: null,
        dealer: { name: null },
        gender: null,
        code: null,
        userName: null,
        type: null,
        image: { imageSrc: null },
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
    //filter by type
    useEffect(() => {
        if (value.length === 0 && total !== 0) {
            if (currentUser.role === 'Master') {
                GetListUserMasterService({ index: pageIndex, size: pageSizeOld }).then(function (response) {
                    response.data.items.sort(function (a, b) {
                        return (`${a.firstName} ${a.lastName}`).localeCompare(`${b.firstName} ${b.lastName}`)
                    })
                    setSearchUser(response.data);
                }).catch(function (error) {
                    console.log(error);
                })
            } else if (currentUser.role === 'Admin') {
                GetListUserAdminService({ index: pageIndex, size: pageSizeOld }).then(function (response) {
                    response.data.items.sort(function (a, b) {
                        return (`${a.firstName} ${a.lastName}`).localeCompare(`${b.firstName} ${b.lastName}`)
                    })
                    setSearchUser(response.data);
                }).catch(function (error) {
                    console.log(error);
                })
            }
        } else if (value.length !== 0) {
            if (currentUser.role === 'Master') {
                GetAllUserMasterSerivce().then(function (response) {
                    let data = response.data.filter(x => x.isDisabled === true && value.includes(x.type));
                    setSearchUser({ ...searchUser, items: data.slice((pageIndex - 1) * pageSizeOld, pageIndex * pageSizeOld) });
                    setTotal(data);
                }).catch(function (error) {
                    // handle error
                    console.log(error);
                })
            } else if (currentUser.role === 'Admin') {
                GetAllUserAdminSerivce().then(function (response) {
                    let data = response.data.filter(x => x.isDisabled === true && value.includes(x.type));
                    setSearchUser({ ...searchUser, items: data.slice((pageIndex - 1) * pageSizeOld, pageIndex * pageSizeOld) });
                    setTotal(data);
                }).catch(function (error) {
                    console.log(error);
                })
            }
        }
    }, [value])

    //show user detail
    const showModal = (evt) => {
        GetUserService({ code: evt.currentTarget.id }).then(function (response) {
            // handle success
            response.data.dob = `${response.data.dob.substring(8, 10)}/${response.data.dob.substring(5, 7)}/${response.data.dob.substring(0, 4)}`;
            response.data.type = response.data.type === 0 ? 'Master' : (response.data.type === 1 ? 'Admin' : 'Staff');
            setUser(response.data);
            setIsModalVisible(true);
        })
            .catch(function (error) {
                console.log(error);
            })
    };

    const handleDisableOk = () => {
        DisableUserService({ code: user.code }).then(function (response) {
            // handle success
            if (response.status === 200) {
                setSearchUser({ ...searchUser, items: searchUser.items.filter(x => x.code !== user.code) })
                setIsModalDisableVisible(false);
            }
        })
            .catch(function (error) {
                // handle error
                console.log(error);
                setIsModalDisableVisible(false);
            })
    }
    const handleDisableCancel = () => {
        setIsModalDisableVisible(false);
    }
    //Show modal for Disable
    const showModalDisable = evt => {
        GetUserService({ code: evt.currentTarget.id }).then(function (response) {
            setUser(response.data);
            setIsModalDisableVisible(true);
        })
            .catch(function (error) {
                console.log(error);
            })
    }
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSearch = (value) => {
        if (value !== '') {
            let filterValue = value.toUpperCase().trim();
            if (currentUser.role === 'Master') {
                GetAllUserMasterSerivce().then(function (response) {
                    let data = response.data.filter(x => x.isDisabled === true && (x.code.toUpperCase().includes(value)
                        || x.firstName.toUpperCase().includes(filterValue)
                        || x.lastName.toUpperCase().includes(filterValue)));
                    setSearchUser({ ...searchUser, items: data.slice((pageIndex - 1) * pageSizeOld, pageIndex * pageSizeOld) });
                    setTotal(data);
                    console.log(pageIndex);
                    setsearchValue(filterValue);
                }).catch(function (error) {
                    console.log(error);
                })
            } else if (currentUser.role === 'Admin') {
                GetAllUserAdminSerivce().then(function (response) {
                    let data = response.data.filter(x => x.isDisabled === true && (x.code.toUpperCase().includes(value)
                        || x.firstName.toUpperCase().includes(filterValue)
                        || x.lastName.toUpperCase().includes(filterValue)));
                    setSearchUser({ ...searchUser, items: data.slice((pageIndex - 1) * pageSizeOld, pageIndex * pageSizeOld) });
                    setTotal(data);
                    setsearchValue(filterValue);
                }).catch(function (error) {
                    console.log(error);
                })
            }
        } else {
            if (currentUser.role === 'Master') {
                GetListUserMasterService({ index: pageIndex, size: pageSizeOld }).then(function (response) {
                    response.data.items.sort(function (a, b) {
                        return (`${a.firstName} ${a.lastName}`).localeCompare(`${b.firstName} ${b.lastName}`)
                    })
                    setSearchUser(response.data);
                }).catch(function (error) {
                    console.log(error);
                })
            } else if (currentUser.role === 'Admin') {
                GetListUserAdminService({ index: pageIndex, size: pageSizeOld }).then(function (response) {
                    response.data.items.sort(function (a, b) {
                        return (`${a.firstName} ${a.lastName}`).localeCompare(`${b.firstName} ${b.lastName}`)
                    })
                    setSearchUser(response.data);
                }).catch(function (error) {
                    console.log(error);
                })
            }
        }
    }
    //show list user

    useEffect(() => {
        let didCancel = false;
        if (value.length !== 0 || searchValue !== '') {
            setSearchUser({ ...searchUser, items: total.slice((pageIndex - 1) * pageSizeOld, pageIndex * pageSizeOld) });
        } else {
            if (currentUser.role === 'Master') {
                GetListUserMasterService({ index: pageIndex, size: pageSizeOld }).then(function (response) {
                    if (!didCancel) {
                        if (lastLocation !== null && location.pathname.includes('/manage/list-user/ok')) {
                            if (lastLocation.pathname === '/manage/create') {
                                GetUserService({ code: location.pathname.split('/')[3] }).then(function (res) {
                                    // handle success
                                    response.data.items = response.data.items.filter(x => x.code !== res.data.code);
                                    if (pageIndex === 1) {
                                        response.data.items.unshift(res.data);
                                    }
                                    setSearchUser(response.data);
                                })
                                    .catch(function (error) {
                                        // handle error
                                        console.log(error);
                                    })
                            } else if (lastLocation.pathname.includes('/manage/edit/')) {
                                GetUserService({ code: lastLocation.pathname.substring(6, lastLocation.pathname.length) }).then(function (res) {
                                    // handle success
                                    response.data.items = response.data.items.filter(x => x.code !== res.data.code);
                                    if (pageIndex === 1) {
                                        response.data.items.unshift(res.data);
                                    }
                                    setSearchUser(response.data);
                                })
                                    .catch(function (error) {
                                        // handle error
                                        console.log(error);
                                    })
                            }
                            setTotal(0);
                        } else {
                            response.data.items.sort(function (a, b) {
                                return (`${a.firstName} ${a.lastName}`).localeCompare(`${b.firstName} ${b.lastName}`);
                            });
                            setSearchUser(response.data);
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            } else if (currentUser.role === 'Admin') {
                GetListUserAdminService({ index: pageIndex, size: pageSizeOld }).then(function (response) {
                    if (!didCancel) {
                        if (lastLocation !== null && location.pathname.includes('/manage/list-user/ok')) {
                            if (lastLocation.pathname === '/manage/create') {
                                GetUserService({ code: location.pathname.split('/')[3] }).then(function (res) {
                                    // handle success
                                    response.data.items = response.data.items.filter(x => x.code !== res.data.code);
                                    if (pageIndex === 1) {
                                        response.data.items.unshift(res.data);
                                    }
                                    setSearchUser(response.data);
                                })
                                    .catch(function (error) {
                                        // handle error
                                        console.log(error);
                                    })
                            } else if (lastLocation.pathname.includes('/manage/edit/')) {
                                GetUserService({ code: lastLocation.pathname.substring(6, lastLocation.pathname.length) }).then(function (res) {
                                    // handle success
                                    response.data.items = response.data.items.filter(x => x.code !== res.data.code);
                                    if (pageIndex === 1) {
                                        response.data.items.unshift(res.data);
                                    }
                                    setSearchUser(response.data);
                                })
                                    .catch(function (error) {
                                        // handle error
                                        console.log(error);
                                    })
                            }
                            setTotal(0);
                        } else {
                            response.data.items.sort(function (a, b) {
                                return (`${a.firstName} ${a.lastName}`).localeCompare(`${b.firstName} ${b.lastName}`);
                            });
                            setSearchUser(response.data);
                        }
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            }
        }

        return () => didCancel = true
    }, [pageSizeOld, pageIndex, lastLocation, location.pathname])
    return (
        <Content className={styles.antLayoutContent}>
            <Row>
                <h2 className={styles.title}>User List</h2>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                <Col span={5}>
                    <Select {...selectProps} />
                </Col>
                <Col span={10}>
                    <Search onSearch={handleSearch} />
                </Col>
                <Col span={4}></Col>
                <Col span={5}>
                    <Button className={styles.create}>
                        <Link to='/manager/create'>Create new user</Link>
                    </Button>
                </Col>
            </Row>
            <Modal title={user !== null ? "Are you sure?" : "Can not disable user"} visible={isModalDisableVisible}
                onOk={handleDisableOk} onCancel={handleDisableCancel} centered={true} closable={user !== null ? false : true}
                footer={null} style={{ height: '20', borderRadius: '20px', fontWeight: '30px' }} maskClosable={user !== null ? false : true}>
                {
                    <>
                        <b style={{ marginLeft: '25%' }}>Do you want to disable this user?</b>
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
                searchUser !== undefined ?
                    <>
                        {user !== null ?

                            <Modal width={350} title="User Information" visible={isModalVisible} footer={null} onCancel={handleCancel} centered={true}>
                                <table className={styles.tableModal}>

                                    <div><img style={{ width: '200px', height: '200px', marginLeft: '25%' }} src={user.image.imageSrc} className="card-img-top rounded-circle" /></div>

                                    <tr>
                                        <td>Full Name</td>
                                        <td> {`${user.firstName} ${user.lastName}`}</td>
                                    </tr>
                                    <tr>
                                        <td>Dealer</td>
                                        <td>{user.dealer.name}</td>
                                    </tr>
                                    <tr>
                                        <td>BirthDay</td>
                                        <td>{user.dob}</td>
                                    </tr>
                                    <tr>
                                        <td>Gender</td>
                                        <td>{user.gender}</td>
                                    </tr>
                                    <tr>
                                        <td>Type</td>
                                        <td>{user.type}</td>
                                    </tr>
                                </table>
                            </Modal> : ''
                        }

                        <Row className={"ListTable"}>
                            <table style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th className={styles.borderTable}>{UserConstant.Image}</th>
                                        <th></th>
                                        <th className={styles.borderTable}>{UserConstant.Code}</th>
                                        <th></th>
                                        <th className={styles.borderTable}>{UserConstant.FullName}</th>
                                        <th></th>
                                        <th className={styles.borderTable}>{UserConstant.Email}</th>
                                        <th></th>
                                        <th className={styles.borderTable}>{UserConstant.Dob}</th>
                                        <th></th>
                                        <th className={styles.borderTable}>{UserConstant.Dealer}</th>
                                        <th></th>
                                        <th className={styles.borderTable}>{UserConstant.Type}</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchUser.items.map(user => {
                                        return (
                                            <tr key={user.code}>
                                                <td className={styles.borderRow} onClick={showModal} id={user.code}><img src={user.image.imageSrc} style={{ width: '100px', height: '100px' }} /></td>
                                                <td></td>
                                                <td className={styles.borderRow} onClick={showModal} id={user.code}>{user.code}</td>
                                                <td></td>
                                                <td className={styles.borderRow} onClick={showModal} id={user.code}>{`${user.firstName} ${user.lastName}`}</td>
                                                <td></td>
                                                <td className={styles.borderRow} onClick={showModal} id={user.code}>{user.email}</td>
                                                <td></td>
                                                <td className={styles.borderRow} onClick={showModal} id={user.code}>
                                                    {`${user.dob.substring(8, 10)}/${user.dob.substring(5, 7)}/${user.dob.substring(0, 4)}`}
                                                </td>
                                                <td></td>
                                                <td className={styles.borderRow} onClick={showModal} id={user.code}>{user.dealer.name}</td>
                                                <td></td>
                                                <td className={styles.borderRow} onClick={showModal} id={user.code}>{user.type === 0 ? "Master" : (user.type === 1 ? "Admin" : "Staff")}</td>
                                                <td></td>
                                                <td>
                                                    <Link to={`/manager/edit/${user.code}`}><i className="bi bi-pencil-fill"></i></Link>
                                                    <i className="bi bi-x-circle" onClick={showModalDisable} id={user.code}></i>
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
                                {value.length !== 0 || searchValue !== ''
                                    ? <Pagination size={'small'} total={total.length} defaultCurrent={1} itemRender={itemRender} showSizeChanger={true} onChange={handleChangePage} />
                                    : <Pagination size={'small'} total={searchUser.totalRecords} defaultCurrent={1} itemRender={itemRender} showSizeChanger={true} onChange={handleChangePage} />
                                }
                            </Col>
                        </Row>
                    </>
                    : ''
            }
        </Content>
    )
}

export default ListUser;