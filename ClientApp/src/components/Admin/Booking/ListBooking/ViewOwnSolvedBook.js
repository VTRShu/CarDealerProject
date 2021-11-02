import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Input, Button, Layout, Pagination, Modal, Form, Upload, Menu } from 'antd';
import { FilterFilled, InfoCircleFilled, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import styles from './ListBooking.module.css'
import {
    ViewOwnAllTestService, ViewOwnAllQuoteService, ViewOwnAllBookwsService,
    ViewOwnListBookwsService, ViewOwnListQuoteService, ViewOwnListTestService,
    GetBookingService, GetBookWSService
} from '../../../../Services/BookingService';
import { GetUserService } from '../../../../Services/UserService'
import { GetModelListService } from '../../../../Services/ModelService';
import moment from "moment-timezone";
import './ListBookingAntStyle.css'
import 'font-awesome/css/font-awesome.min.css';
import BookingConstant from '../../../../Share/Constant/BookingConstant'
import { Link } from "react-router-dom";
import CurrentUserContext from '../../../../Share/Context/CurrentUserContext'
import { Select } from 'antd';
import { SiCheckmarx } from 'react-icons/si'
import { GiCheckMark } from 'react-icons/gi'
import { FaBook } from 'react-icons/fa'
import { UploadOutlined } from '@ant-design/icons';
import { Pie } from '@ant-design/charts';
const { Search } = Input;
const { Content } = Layout;
const { TextArea } = Input;
const { SubMenu } = Menu;
function itemRender(current, type, originalElement) {
    if (type === 'prev') {
        return <Button size="small" style={{ fontSize: '14px', marginRight: '10px' }} >Previous</Button>;
    }
    if (type === 'next') {
        return <Button size="small" style={{ fontSize: '14px', marginLeft: '8px', marginRight: '10px' }}>Next</Button>;
    }
    return originalElement;
}
function itemRenderQuote(current, type, originalElement) {
    if (type === 'prev') {
        return <Button size="small" style={{ fontSize: '14px', marginRight: '10px' }} >Previous</Button>;
    }
    if (type === 'next') {
        return <Button size="small" style={{ fontSize: '14px', marginLeft: '8px', marginRight: '10px' }}>Next</Button>;
    }
    return originalElement;
}
function itemRenderBookWS(current, type, originalElement) {
    if (type === 'prev') {
        return <Button size="small" style={{ fontSize: '14px', marginRight: '10px' }} >Previous</Button>;
    }
    if (type === 'next') {
        return <Button size="small" style={{ fontSize: '14px', marginLeft: '8px', marginRight: '10px' }}>Next</Button>;
    }
    return originalElement;
}
const options = [{ label: 'Completed', value: true }, { label: 'Processing', value: false }];
const optionQuote = [{ label: 'Called', value: true }, { label: 'Processing', value: false }];
const optionBookws = [{ label: 'Completed', value: true }, { label: 'Processing', value: false }];
const ViewOwnSolvedBook = () => {
    const [value, setValue] = useState([]);
    const [valueQuote, setValueQuote] = useState([]);
    const [valueBookws, setValueBookws] = useState([]);
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [pageIndex, setPageIndex] = useState(BookingConstant.PageIndexDefault);
    const [pageSizeOld, setPageSizeOld] = useState(BookingConstant.PageSizeDefault);
    const [pageIndexQuote, setPageIndexQuote] = useState(BookingConstant.PageIndexDefault);
    const [pageSizeOldQuote, setPageSizeOldQuote] = useState(BookingConstant.PageSizeDefault);
    const [pageIndexBookws, setPageIndexBookws] = useState(BookingConstant.PageIndexDefault);
    const [pageSizeOldBookws, setPageSizeOldBookws] = useState(BookingConstant.PageSizeDefault);
    const [total, setTotal] = useState(0);
    const [totalQuote, setTotalQuote] = useState(0);
    const [totalBookws, setTotalBookws] = useState(0);
    const [bookTest, setBookTest] = useState();
    const [bookQuote, setBookQuote] = useState();
    const [bookWs, setBookWS] = useState();
    const handleChangePage = (page, pageSize) => {
        if (page !== pageIndex) {
            setPageIndex(page);
        }
        if (pageSize !== pageSizeOld) {
            setPageSizeOld(pageSize);
        }
    }
    const handleChangePageQuote = (page, pageSize) => {
        if (page !== pageIndexQuote) {
            setPageIndexQuote(page);
        }
        if (pageSize !== pageSizeOldQuote) {
            setPageSizeOldQuote(pageSize);
        }
    }
    const handleChangePageBookws = (page, pageSize) => {
        if (page !== pageIndexBookws) {
            setPageIndexBookws(page);
        }
        if (pageSize !== pageSizeOld) {
            setPageSizeOldBookws(pageSize);
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
        placeholder: 'Customer response',
        maxTagCount: 'responsive',
        showArrow: true,
        optionFilterProp: 'label'
    };
    //filter by status
    useEffect(() => {
        if (value.length === 0 && total !== 0) {
            ViewOwnListTestService({ index: pageIndex, code: currentUser.code, size: pageSizeOld }).then(function (response) {
                setBookTest(response.data);
            }).catch(function (error) {
                console.log(error);
            })
        } else if (value.length !== 0) {
            ViewOwnAllTestService({ code: currentUser.code }).then(function (response) {
                let data = response.data.filter(x => value.includes(x.status));
                setBookTest({ ...bookTest, items: data.slice((pageIndex - 1) * pageSizeOld, pageIndex * pageSizeOld) });
                setTotal(data);
            }).catch(function (error) {
                console.log(error);
            })
        }
    }, [value]);
    const selectPropsQuote = {
        suffixIcon: <FilterFilled />,
        style: {
            width: '100%',
        },
        mode: 'multiple',
        value: valueQuote,
        options: optionQuote,
        onChange: (newValue) => {
            setValueQuote(newValue);
        },
        placeholder: 'Status',
        maxTagCount: 'responsive',
        showArrow: true,
        optionFilterProp: 'label'
    };
    //filter by status
    useEffect(() => {
        if (valueQuote.length === 0 && totalQuote !== 0) {
            ViewOwnListQuoteService({ index: pageIndexQuote, code: currentUser.code, size: pageSizeOldQuote }).then((response) => {
                setBookQuote(response.data);
            }).catch(function (error) {
                console.log(error);
            })
        } else if (valueQuote.length !== 0) {
            ViewOwnAllQuoteService({ code: currentUser.code }).then((response) => {
                let data = response.data.filter(x => valueQuote.includes(x.status));
                setBookQuote({ ...bookQuote, items: data.slice((pageIndexQuote - 1) * pageSizeOldQuote, pageIndexQuote * pageSizeOldQuote) });
                setTotalQuote(data);
            }).catch(function (error) {
                console.log(error);
            })
        }
    }, [valueQuote]);
    const selectPropsBookws = {
        suffixIcon: <FilterFilled />,
        style: {
            width: '100%',
        },
        mode: 'multiple',
        value: valueBookws,
        options: optionBookws,
        onChange: (newValue) => {
            setValueBookws(newValue);
        },
        placeholder: 'Status',
        maxTagCount: 'responsive',
        showArrow: true,
        optionFilterProp: 'label'
    };
    useEffect(() => {
        if (valueBookws.length === 0 && totalBookws !== 0) {
            ViewOwnListBookwsService({ index: pageIndexBookws, code: currentUser.code, size: pageSizeOldBookws }).then((response) => {
                setBookWS(response.data)
            }).catch(function (error) {
                console.log(error);
            })
        } else if (valueBookws.length !== 0) {
            ViewOwnAllBookwsService({ code: currentUser.code }).then((response) => {
                let data = response.data.filter(x => valueBookws.includes(x.status));
                setBookWS({ ...bookWs, items: data.slice((pageIndexBookws - 1) * pageSizeOldBookws, pageIndexBookws * pageSizeOldBookws) })
                setTotalBookws(data);
            }).catch(function (error) {
                console.log(error);
            })
        }
    }, [valueBookws])
    useEffect(() => {
        if (value.length !== 0) {
            setBookTest({ ...bookTest, items: total.slice((pageIndex - 1) * pageSizeOld, pageIndex * pageSizeOld) });
        } else {
            ViewOwnListTestService({ index: pageIndex, code: currentUser.code, size: pageSizeOld }).then(function (response) {
                setBookTest(response.data);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }, [pageSizeOld, pageIndex])

    useEffect(() => {
        if (valueQuote.length !== 0) {
            setBookQuote({ ...bookQuote, items: total.slice((pageIndexQuote - 1) * pageSizeOldQuote, pageIndexQuote * pageSizeOldQuote) });
        } else {
            ViewOwnListQuoteService({ index: pageIndexQuote, code: currentUser.code, size: pageSizeOldQuote }).then(function (response) {
                setBookQuote(response.data);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }, [pageSizeOldQuote, pageIndexQuote])
    useEffect(() => {
        if (valueBookws.length !== 0) {
            setBookWS({ ...bookWs, items: total.slice((pageIndexBookws - 1) * pageSizeOldBookws, pageIndexBookws * pageSizeOldBookws) });
        } else {
            ViewOwnListBookwsService({ index: pageIndexBookws, code: currentUser.code, size: pageSizeOldBookws }).then(function (response) {
                setBookWS(response.data);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }, [pageSizeOldBookws, pageIndexBookws])

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalQuoteVisible, setIsModalQuoteVisible] = useState(false);
    const [isModalBookwsVisible, setIsModalBookwsVisible] = useState(false);
    const [bookTestModal, setBookTestModal] = useState({
        appointment: null,
        model: { name: null },
        dealer: { name: null },
        fullName: null,
        email: null,
        phoneNumber: null,
        service: null,
        timePeriod: null,
        specificRequest: null,
        staffAnswer: null,
        user: { userName: null }
    });
    const [bookQuoteModal, setBookQuoteModal] = useState({
        fullName: null,
        email: null,
        phoneNumber: null,
        service: null,
        specificRequest: null,
        car: { name: null },
        user: { userName: null },
        staffAnswer: null,
        fileRecord: { imageSrc: null }
    })
    const [bookWsModal, setBookWSModal] = useState({
        appointment: null,
        licensePlate: null,
        dealer: { name: null },
        fullName: null,
        email: null,
        timePeriod: null,
        phoneNumber: null,
        specificRequest: null,
        user: { userName: null },
        customerFeedBack: null,
    })
    const showModal = (evt) => {
        GetBookingService({ id: evt.currentTarget.id }).then(function (response) {
            setBookTestModal(response.data);
            setIsModalVisible(true);
        }).catch(function (error) {
            console.log(error);
        })
    }
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const showModalQuote = (evt) => {
        GetBookingService({ id: evt.currentTarget.id }).then(function (response) {
            setBookQuoteModal(response.data);
            setIsModalQuoteVisible(true);
        }).catch(function (error) {
            console.log(error);
        })
    }
    const handleCancelQuote = () => {
        setIsModalQuoteVisible(false);
    };
    const showModalBookws = (evt) => {
        GetBookWSService({ id: evt.currentTarget.id }).then(function (response) {
            setBookWSModal(response.data);
            console.log(bookWs)
            setIsModalBookwsVisible(true);
        }).catch(function (error) {
            console.log(error);
        })
    }
    const handleCancelBookws = () => {
        setIsModalBookwsVisible(false);
    };
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
        solvedBooking: [],
        solvedBookWS: []
    })
    const [solvedBook, setSolvedBook] = useState(0);
    const [solvedBookWS, setSolvedBookWS] = useState(0);
    const [ownTotal, setOwnTotal] = useState(0)
    const [processBook, setProcessBook] = useState(0)
    const [data, setData] = useState()
    useEffect(() => {
        (async () => {
            GetUserService({ code: currentUser.code })
                .then((res) => {
                    setUser(res.data);
                    setSolvedBook(res.data.solvedBooking.filter(x => x.status === true).length);
                    setSolvedBookWS(res.data.solvedBookWS.filter(x => x.status === true).length);
                    setOwnTotal(res.data.solvedBooking.length + res.data.solvedBookWS.length);
                    setProcessBook(res.data.solvedBooking.filter(x => x.status === false).length + res.data.solvedBookWS.filter(x => x.status === false).length)

                })
                .catch((err) => console.log(err));
        })();
    }, []);
    var config = {
        appendPadding: 10,
        data: [{
            type: "completed", value: solvedBook + solvedBookWS
        }, {
            type: "processing", value: processBook
        }],
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
            type: 'outer',
            content: '{name} {percentage}',
        },
        interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }],
    };
    return (
        <Content className={styles.antLayoutContent}>
            <Row><Col offset={9}><h3> Total : {ownTotal} booking requests</h3></Col></Row>

            <Row><Col offset={9}>
                <Pie
                    {...config}
                /></Col>
            </Row>
            <Row>
                <h2 className={styles.title}>Work(test drive booking)</h2>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                <Col span={5}>
                    <Select {...selectProps} />
                </Col>

            </Row>
            <br />
            {bookTest !== undefined ?
                <> {
                    bookTestModal !== null ?
                        // <>
                        <Modal width={800} title="Booking Test Drive Details" visible={isModalVisible} footer={null} onCancel={handleCancel} centered={true}>
                            <table className={styles.tableModal}>
                                <tr>
                                    <td>Customer Infor:</td>
                                    <td>{bookTestModal.fullName} - {bookTestModal.email} - {bookTestModal.phoneNumber}</td>
                                </tr>
                                <tr>
                                    <td>Appointment:</td>
                                    <td>{new Date(bookTestModal.appointment).toLocaleDateString()} in the {bookTestModal.timePeriod} </td>
                                </tr>
                                <tr>
                                    <td>Want to test model:</td>
                                    <td>{bookTestModal.model.name}</td>
                                </tr>
                                <tr>
                                    <td>Customer's response:</td>
                                    <td>{bookTestModal.isAccepted === true ? "Confirm to come" : "Waiting for response"}</td>
                                </tr>
                                <hr />
                                <tr>
                                    <td>Customer's specific request & feedback:</td>
                                    <td><b>{bookTestModal.specificRequest}</b></td>
                                </tr>
                                <tr>
                                    <td>Completed By </td>
                                    <td>{(bookTestModal.user === undefined || bookTestModal.user === null) ? "" : bookTestModal.user.userName}</td>
                                </tr>
                                <hr />
                                <tr>
                                    <td>Status</td>
                                    <td>{bookTestModal.status === true ? <GiCheckMark style={{ color: "green", fontSize: "30px" }} /> : <span style={{ color: "red", fontSize: "20px" }}>Processing....</span>}</td>
                                </tr>
                            </table>
                        </Modal>

                        : ""
                }
                    {
                        bookQuoteModal !== null ?
                            // <>
                            <Modal width={800} title="Request for quote details" visible={isModalQuoteVisible} footer={null} onCancel={handleCancelQuote} centered={true}>
                                <table className={styles.tableModal}>
                                    <tr>
                                        <td>Customer Infor:</td>
                                        <td>{bookQuoteModal.fullName} - {bookQuoteModal.email} - {bookQuoteModal.phoneNumber}</td>
                                    </tr>
                                    <tr>
                                        <td>Request for quote:</td>
                                        <td>{bookQuoteModal.car.name}</td>
                                    </tr>
                                    <hr />
                                    <tr>
                                        <td>Customer's specific request :</td>
                                        <td><b>{bookQuoteModal.specificRequest}</b></td>
                                    </tr>
                                    <tr>
                                        <td>Staff Answer:</td>
                                        <td><b>{bookQuoteModal.staffAnswer}</b></td>
                                    </tr>
                                    <tr>
                                        <td>Completed By </td>
                                        <td>{(bookQuoteModal.user === undefined || bookQuoteModal.user === null) ? "" : bookQuoteModal.user.userName}</td>
                                    </tr>
                                    <hr />
                                    <tr>
                                        <td>Status</td>
                                        <td><b>{bookQuoteModal.status === true ? <GiCheckMark style={{ color: "green", fontSize: "30px" }} /> : <span style={{ color: "red", fontSize: "20px" }}>Processing....</span>}</b></td>
                                    </tr>
                                    <hr />
                                    {bookQuoteModal.fileRecord === null || bookQuoteModal.fileRecord === undefined ? "Nothing" : <a href={bookQuoteModal.fileRecord.imageSrc}><Button style={{ marginLeft: '50%', width: '100%' }}>Recorded file</Button></a>}
                                </table>
                            </Modal>

                            : ""
                    }
                    {
                        bookWsModal !== null ?
                            // <>
                            <Modal width={800} title="Booking  Workshop service Details" visible={isModalBookwsVisible} footer={null} onCancel={handleCancelBookws} centered={true}>
                                <table className={styles.tableModal}>
                                    <tr>
                                        <td>Customer Infor:</td>
                                        <td>{bookWsModal.fullName} - {bookWsModal.email} - {bookWsModal.phoneNumber}</td>
                                    </tr>
                                    <tr>
                                        <td>Appointment:</td>
                                        <td>{new Date(bookWsModal.appointment).toLocaleDateString()} in the {bookWsModal.timePeriod} </td>
                                    </tr>
                                    <tr>
                                        <td>Customer's License Plate:</td>
                                        <td>{bookWsModal.licensePlate}</td>
                                    </tr>
                                    <tr>
                                        <td>Customer's response:</td>
                                        <td>{bookWsModal.isAccepted === true ? "Confirm to come" : "Waiting for response"}</td>
                                    </tr>
                                    <hr />
                                    <tr>
                                        <td>Customer's specific request:</td>
                                        <td>{bookWsModal.specificRequest}</td>
                                    </tr>
                                    <hr />
                                    <tr>
                                        <td>Customer's feedback:</td>
                                        <td><b>{bookWsModal.customerFeedBack}</b></td>
                                    </tr>
                                    <tr>
                                        <td>Completed By </td>
                                        <td>{(bookWsModal.user === undefined || bookWsModal.user === null) ? "" : bookWsModal.user.userName}</td>
                                    </tr>
                                    <hr />
                                    <tr>
                                        <td>Status</td>
                                        <td>{bookWsModal.status === true ? <GiCheckMark style={{ color: "green", fontSize: "30px" }} /> : <span style={{ color: "red", fontSize: "20px" }}>Processing....</span>}</td>
                                    </tr>
                                </table>
                            </Modal>

                            : ""
                    }
                    <Row className={"ListTable"}>
                        <table style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th className={styles.borderTable}>{BookingConstant.FullName}</th>
                                    <th></th>
                                    <th className={styles.borderTable}>{BookingConstant.Email}</th>
                                    <th></th>
                                    <th className={styles.borderTable}>{BookingConstant.PhoneNumber}</th>
                                    <th></th>
                                    <th className={styles.borderTable}>{BookingConstant.Appointment}</th>
                                    <th></th>
                                    <th className={styles.borderTable}>{BookingConstant.Model}</th>
                                    <th></th>
                                    <th className={styles.borderTable}>Customer's response</th>
                                    <th></th>
                                    <th className={styles.borderTable}>Status</th>
                                    <th></th>
                                    <th className={styles.borderTable}>{BookingConstant.Note}</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bookTest.items.map(book => {
                                        return (
                                            <tr key={book.id}>
                                                <td className={styles.borderRow} onClick={showModal} id={book.id}>{book.title} {book.fullName}</td>
                                                <td></td>
                                                <td className={styles.borderRow} onClick={showModal} id={book.id}>{book.email}</td>
                                                <td></td>
                                                <td className={styles.borderRow} onClick={showModal} id={book.id}>{book.phoneNumber}</td>
                                                <td></td>
                                                <td className={styles.borderRow} onClick={showModal} id={book.id}>
                                                    {book.timePeriod} {`${book.appointment.substring(8, 10)}/${book.appointment.substring(5, 7)}/${book.appointment.substring(0, 4)}`}
                                                </td>
                                                <td></td>
                                                <td className={styles.borderRow} onClick={showModal} id={book.id}>{book.model.name}</td>
                                                <td></td>
                                                <td className={styles.borderRow} onClick={showModal} id={book.id}>{book.isAccepted === true ? "Confirm to come" : "Waiting for response"}</td>
                                                <td></td>
                                                <td className={styles.borderRow} onClick={showModal} id={book.id}><b>{book.status === true ? "Completed" : "Processing...."}</b></td>
                                                <td></td>
                                                <td className={styles.borderRow} onClick={showModal} id={book.id}>{book.note}</td>
                                                <td></td>

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
                            {value.length !== 0
                                ? <Pagination size={'small'} total={total.length} defaultCurrent={1} itemRender={itemRender} showSizeChanger={true} onChange={handleChangePage} />
                                : <Pagination size={'small'} total={bookTest.totalRecords} defaultCurrent={1} itemRender={itemRender} showSizeChanger={true} onChange={handleChangePage} />
                            }
                        </Col>
                    </Row>
                </> : ""
            }
            <Row>
                <h2 className={styles.title}>Work(Request for quote)</h2>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                <Col span={5}>
                    <Select {...selectPropsQuote} />
                </Col>

            </Row>
            <br />

            {
                bookQuote !== undefined ?
                    <>
                        <Row className={"ListTable"}>
                            <table style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th className={styles.borderTable}>{BookingConstant.FullName}</th>
                                        <th></th>
                                        <th className={styles.borderTable}>{BookingConstant.Email}</th>
                                        <th></th>
                                        <th className={styles.borderTable}>{BookingConstant.PhoneNumber}</th>
                                        <th></th>
                                        <th className={styles.borderTable}>{BookingConstant.Dealer}</th>
                                        <th></th>
                                        <th className={styles.borderTable}>Car</th>
                                        <th></th>
                                        <th className={styles.borderTable}>Status</th>
                                        <th></th>
                                        <th className={styles.borderTable}>{BookingConstant.Service}</th>
                                        <th></th>
                                        <th className={styles.borderTable}>{BookingConstant.Note}</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        bookQuote.items.map(book => {
                                            return (
                                                <tr key={book.id}>
                                                    <td className={styles.borderRow} onClick={showModalQuote} id={book.id}>{book.title} {book.fullName}</td>
                                                    <td></td>
                                                    <td className={styles.borderRow} onClick={showModalQuote} id={book.id}>{book.email}</td>
                                                    <td></td>
                                                    <td className={styles.borderRow} onClick={showModalQuote} id={book.id}>{book.phoneNumber}</td>
                                                    <td></td>
                                                    <td className={styles.borderRow} onClick={showModalQuote} id={book.id}>{book.dealer.name}</td>
                                                    <td></td>
                                                    <td className={styles.borderRow} onClick={showModalQuote} id={book.id}>{book.car.name}</td>
                                                    <td></td>
                                                    <td className={styles.borderRow} onClick={showModalQuote} id={book.id}><b>{book.status === true ? "Called" : "Processing...."}</b></td>
                                                    <td></td>
                                                    <td className={styles.borderRow} onClick={showModalQuote} id={book.id}>{book.service.name}</td>
                                                    <td></td>
                                                    <td className={styles.borderRow} onClick={showModalQuote} id={book.id}>{book.note}</td>
                                                    <td></td>

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
                                {valueQuote.length !== 0
                                    ? <Pagination size={'small'} total={totalQuote.length} defaultCurrent={1} itemRender={itemRenderQuote} showSizeChanger={true} onChange={handleChangePageQuote} />
                                    : <Pagination size={'small'} total={bookQuote.totalRecords} defaultCurrent={1} itemRender={itemRenderQuote} showSizeChanger={true} onChange={handleChangePageQuote} />
                                }
                            </Col>
                        </Row>
                    </> : ""
            }

            <Row>
                <h2 className={styles.title}>Work(Workshop booking)</h2>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                <Col span={5}>
                    <Select {...selectPropsBookws} />
                </Col>

            </Row>
            <br />
            {
                bookWs !== undefined ?
                    <>
                        <Row className={"ListTable"}>
                            <table style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th className={styles.borderTable}>Customer's car information</th>
                                        <th></th>
                                        <th className={styles.borderTable}>{BookingConstant.FullName}</th>
                                        <th></th>
                                        <th className={styles.borderTable}>{BookingConstant.Email}</th>
                                        <th></th>
                                        <th className={styles.borderTable}>{BookingConstant.PhoneNumber}</th>
                                        <th></th>
                                        <th className={styles.borderTable}>{BookingConstant.Appointment}</th>
                                        <th></th>
                                        <th className={styles.borderTable}>Customer's response</th>
                                        <th></th>
                                        <th className={styles.borderTable}>Status</th>
                                        <th></th>
                                        <th className={styles.borderTable}>{BookingConstant.SpecificRequest}</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        bookWs.items.map(book => {
                                            return (
                                                <tr key={book.id}>
                                                    <td className={styles.borderRow} onClick={showModalBookws} id={book.id}>{book.licensePlate} {(book.mileage === undefined || book.mileage === null || book.mileage === "") ? "" : (book.mileage + "Km")} {(book.carIdentification === undefined || book.carIdentification === null) ? "" : book.carIdentification}</td>
                                                    <td></td>
                                                    <td className={styles.borderRow} onClick={showModalBookws} id={book.id}>{book.title} {book.fullName}</td>
                                                    <td></td>
                                                    <td className={styles.borderRow} onClick={showModalBookws} id={book.id}>{book.email}</td>
                                                    <td></td>
                                                    <td className={styles.borderRow} onClick={showModalBookws} id={book.id}>{book.phoneNumber}</td>
                                                    <td></td>
                                                    <td className={styles.borderRow} onClick={showModalBookws} id={book.id}>
                                                        {book.timePeriod} {`${book.appointment.substring(8, 10)}/${book.appointment.substring(5, 7)}/${book.appointment.substring(0, 4)}`}
                                                    </td>
                                                    <td></td>
                                                    <td className={styles.borderRow} onClick={showModalBookws} id={book.id}>{book.isAccepted === true ? "Confirm to come" : "Waiting for response"}</td>
                                                    <td></td>
                                                    <td className={styles.borderRow} onClick={showModalBookws} id={book.id}><b>{book.status === true ? "Completed" : "Processing...."}</b></td>
                                                    <td></td>
                                                    <td className={styles.borderRow} onClick={showModalBookws} id={book.id}>{book.specificRequest.replaceAll(",", " ; ")}</td>
                                                    <td></td>

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
                                {valueBookws.length !== 0
                                    ? <Pagination size={'small'} total={totalBookws.length} defaultCurrent={1} itemRender={itemRenderBookWS} showSizeChanger={true} onChange={handleChangePageBookws} />
                                    : <Pagination size={'small'} total={bookWs.totalRecords} defaultCurrent={1} itemRender={itemRenderBookWS} showSizeChanger={true} onChange={handleChangePageBookws} />
                                }
                            </Col>
                        </Row>
                    </>
                    : ""
            }

        </Content>
    )
}
export default ViewOwnSolvedBook;