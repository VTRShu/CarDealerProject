import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Input, Button, Layout, Pagination, Modal, Form, Upload, Menu } from 'antd';
import { FilterFilled, InfoCircleFilled, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import styles from './ListBooking.module.css'
import {
    GetListBookingService, GetListBookingInDealerService,
    GetAllBookingService, GetAllBookingDealerService,
    GetListQuoteInDealerService, GetListQuoteService,
    GetAllQuoteService, GetAllQuoteDealerService,
    UpdateBookingQuoteService, GetBookingService,
    UpdateBookingService
} from '../../../../Services/BookingService';
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
const options = [{ label: 'Confirm to come', value: true }, { label: 'Waiting for response', value: false }];
const optionQuote = [{ label: 'Called', value: true }, { label: 'Processing', value: false }];
const ListBooking = () => {
    const normFileMP3 = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;

    };
    const [searchQuote, setSearchQuote] = useState();
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [value, setValue] = useState([]);
    const [valueQuote, setValueQuote] = useState([]);
    const [searchBooking, setSearchBooking] = useState();
    const [pageIndex, setPageIndex] = useState(BookingConstant.PageIndexDefault);
    const [pageSizeOld, setPageSizeOld] = useState(BookingConstant.PageSizeDefault);
    const [pageIndexQuote, setPageIndexQuote] = useState(BookingConstant.PageIndexDefault);
    const [pageSizeOldQuote, setPageSizeOldQuote] = useState(BookingConstant.PageSizeDefault);
    const [searchValue, setsearchValue] = useState('');
    const [searchValueQuote, setsearchValueQuote] = useState('');
    const [total, setTotal] = useState(0);
    const { form, form1 } = Form.useForm();
    const [totalQuote, setTotalQuote] = useState(0);
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
            if (currentUser.role === 'Master') {
                GetListBookingService({ index: pageIndex, size: pageSizeOld }).then(function (response) {
                    setSearchBooking(response.data);
                }).catch(function (error) {
                    console.log(error);
                })
            } else {
                GetListBookingInDealerService({ index: pageIndex, size: pageSizeOld }).then(function (response) {
                    setSearchBooking(response.data);
                }).catch(function (error) {
                    console.log(error);
                })
            }
        } else if (value.length !== 0) {
            if (currentUser.role === 'Master') {
                GetAllBookingService().then(function (response) {
                    let data = response.data.filter(x => value.includes(x.isAccepted));
                    setSearchBooking({ ...searchBooking, items: data.slice((pageIndex - 1) * pageSizeOld, pageIndex * pageSizeOld) });
                    setTotal(data);
                }).catch(function (error) {
                    console.error(error);
                })
            } else {
                GetAllBookingDealerService().then(function (response) {
                    let data = response.data.filter(x => value.includes(x.isAccepted));
                    setSearchBooking({ ...searchBooking, items: data.slice((pageIndex - 1) * pageSizeOld, pageIndex * pageSizeOld) });
                    setTotal(data);
                }).catch(function (error) {
                    console.error(error);
                })
            }
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
            if (currentUser.role === 'Master') {
                GetListQuoteService({ index: pageIndexQuote, size: pageSizeOldQuote }).then(function (response) {
                    setSearchQuote(response.data);
                }).catch(function (error) {
                    console.log(error);
                })
            } else {
                GetListQuoteInDealerService({ index: pageIndexQuote, size: pageSizeOldQuote }).then(function (response) {
                    setSearchQuote(response.data);
                }).catch(function (error) {
                    console.log(error);
                })
            }
        } else if (valueQuote.length !== 0) {
            if (currentUser.role === 'Master') {
                GetAllQuoteService().then(function (response) {
                    let data = response.data.filter(x => valueQuote.includes(x.status));
                    setSearchQuote({ ...searchQuote, items: data.slice((pageIndexQuote - 1) * pageSizeOldQuote, pageIndexQuote * pageSizeOldQuote) });
                    setTotalQuote(data);
                }).catch(function (error) {
                    console.error(error);
                })
            } else {
                GetAllQuoteDealerService().then(function (response) {
                    let data = response.data.filter(x => valueQuote.includes(x.status));
                    setSearchQuote({ ...searchQuote, items: data.slice((pageIndexQuote - 1) * pageSizeOldQuote, pageIndexQuote * pageSizeOldQuote) });
                    setTotalQuote(data);
                }).catch(function (error) {
                    console.error(error);
                })
            }
        }
    }, [valueQuote]);

    useEffect(() => {
        if (value.length !== 0 || searchValue !== '') {
            setSearchBooking({ ...searchBooking, items: total.slice((pageIndex - 1) * pageSizeOld, pageIndex * pageSizeOld) });

        } else {
            if (currentUser.role === 'Master') {
                GetListBookingService({ index: pageIndex, size: pageSizeOld }).then(function (response) {
                    setSearchBooking(response.data);
                }).catch(function (error) {
                    console.log(error);
                });

            } else {
                GetListBookingInDealerService({ index: pageIndex, size: pageSizeOld }).then(function (response) {
                    setSearchBooking(response.data);
                }).catch(function (error) {
                    console.log(error);
                });

            }
        }
    }, [pageSizeOld, pageIndex])
    useEffect(() => {
        if (valueQuote.length !== 0 || searchValueQuote !== '') {

            setSearchQuote({ ...searchQuote, items: totalQuote.slice((pageIndexQuote - 1) * pageSizeOldQuote, pageIndexQuote * pageSizeOldQuote) })
        } else {
            if (currentUser.role === 'Master') {
                GetListQuoteService({ index: pageIndexQuote, size: pageSizeOldQuote }).then(function (res) {
                    setSearchQuote(res.data);
                }).catch(function (err) {
                    console.log(err);
                })
            } else {
                GetListQuoteInDealerService({ index: pageIndexQuote, size: pageSizeOldQuote }).then(function (res) {
                    setSearchQuote(res.data);
                }).catch(function (err) {
                    console.log(err);
                })
            }
        }
    }, [pageSizeOldQuote, pageIndexQuote])
    const handleSearch = (value) => {
        if (value !== '') {
            let searchInput = value.toUpperCase().trim();
            if (currentUser.role === 'Master') {
                GetAllBookingService().then(function (response) {
                    let data = response.data.filter(x => x.fullName.toUpperCase().includes(searchInput)
                        || x.dealer.name.toUpperCase().includes(searchInput)
                        || x.model.name.toUpperCase().includes(searchInput));
                    setSearchBooking({ ...searchBooking, items: data.slice((pageIndex - 1) * pageSizeOld, pageIndex * pageSizeOld) });
                    setTotal(data);
                    setsearchValue(searchInput);
                }).catch(function (error) {
                    console.log(error);
                })
            } else {
                GetAllBookingDealerService().then(function (response) {
                    let data = response.data.filter(x => x.fullName.toUpperCase().includes(searchInput)
                        || x.dealer.name.toUpperCase().includes(searchInput)
                        || x.model.name.toUpperCase().includes(searchInput));
                    setSearchBooking({ ...searchBooking, items: data.slice((pageIndex - 1) * pageSizeOld, pageIndex * pageSizeOld) });
                    setTotal(data);
                    setsearchValue(searchInput);
                }).catch(function (error) {
                    console.log(error);
                })
            }
        } else {
            if (currentUser.role === 'Master') {
                GetListBookingService({ index: pageIndex, size: pageSizeOld }).then(function (response) {
                    setSearchBooking(response.data);
                }).catch(function (error) {
                    console.log(error);
                })
            } else {
                GetListBookingInDealerService({ index: pageIndex, size: pageSizeOld }).then(function (response) {
                    setSearchBooking(response.data);
                }).catch(function (error) {
                    console.log(error);
                })
            }
        }
    }
    const handleSearchQuote = (value) => {
        if (value !== '') {
            let searchInput = value.toUpperCase().trim();
            if (currentUser.role === 'Master') {
                GetAllQuoteService().then(function (response) {
                    let data = response.data.filter(x => x.fullName.toUpperCase().includes(searchInput)
                        || x.dealer.name.toUpperCase().includes(searchInput)
                        || x.car.name.toUpperCase().includes(searchInput));
                    setSearchQuote({ ...searchQuote, items: data.slice((pageIndexQuote - 1) * pageSizeOldQuote, pageIndexQuote * pageSizeOldQuote) });
                    setTotalQuote(data);
                    setsearchValue(searchInput);
                }).catch(function (error) {
                    console.log(error);
                })
            } else {
                GetAllQuoteDealerService().then(function (response) {
                    let data = response.data.filter(x => x.fullName.toUpperCase().includes(searchInput)
                        || x.dealer.name.toUpperCase().includes(searchInput)
                        || x.car.name.toUpperCase().includes(searchInput));
                    setSearchQuote({ ...searchQuote, items: data.slice((pageIndexQuote - 1) * pageSizeOldQuote, pageIndexQuote * pageSizeOldQuote) });
                    setTotalQuote(data);
                    setsearchValueQuote(searchInput);
                }).catch(function (error) {
                    console.log(error);
                })
            }
        } else {
            if (currentUser.role === 'Master') {
                GetListQuoteService({ index: pageIndexQuote, size: pageSizeOldQuote }).then(function (response) {
                    setSearchQuote(response.data);
                }).catch(function (error) {
                    console.log(error);
                })
            } else {
                GetListQuoteInDealerService({ index: pageIndexQuote, size: pageSizeOldQuote }).then(function (response) {
                    setSearchQuote(response.data);
                }).catch(function (error) {
                    console.log(error);
                })
            }
        }
    }
    const [bookId, setBookId] = useState();
    const [isModalCompleteVisible, setIsModalCompleteVisible] = useState(false);
    const [isModalQuoteCompleteVisible, setIsModalQuoteCompleteVisible] = useState(false);
    const showModalComplete = (evt) => {
        setBookId(evt.target.id);
        console.log(bookId);
        setIsModalCompleteVisible(true);
    }
    const showModalQuoteComplete = (evt) => {
        setBookId(evt.target.id);
        console.log(bookId);
        setIsModalQuoteCompleteVisible(true);
    }
    const onFinishQuote = (value, evt) => {
        UpdateBookingQuoteService({
            userCode: currentUser.code,
            id: bookId,
            specificRequest: value.specificRequest,
            staffAnswer: value.staffAnswer,
            fileRecordName: value.fileRecord[0].name,
        }).then(function (response) {
            console.log("data", response.data);
            setIsModalQuoteCompleteVisible(false);
        }).catch((err) => {
            console.log(err);
        })
    }
    const onFinish = (value, evt) => {
        UpdateBookingService({
            userCode: currentUser.code,
            id: bookId,
            specificRequest: value.specificRequest,

        }).then(function (response) {
            console.log("data", response.data);
            window.location.reload();
            setIsModalCompleteVisible(false);
        }).catch((err) => {
            console.log(err);
        })
    }
    const handleCompleteCancel = () => {
        setIsModalCompleteVisible(false);
    }

    const handleQuoteCompleteCancel = () => {
        setIsModalQuoteCompleteVisible(false);
    }
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalQuoteVisible, setIsModalQuoteVisible] = useState(false);
    const [booking, setBooking] = useState({
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
    const [bookQuote, setBookQuote] = useState({
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
    const showModal = (evt) => {

        GetBookingService({ id: evt.currentTarget.id }).then(function (response) {
            if (currentUser.role === 'Admin' || currentUser.user === response.data.user.userName) {
                setBooking(response.data);
                console.log(booking)
                setIsModalVisible(true);
            } else {
                alert("You don't have permission to view detail of this booking")
            }
        }).catch(function (error) {
            console.log(error);
        })

    }
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const showModalQuote = (evt) => {
        GetBookingService({ id: evt.currentTarget.id }).then(function (response) {
            if (currentUser.role === 'Admin' || currentUser.user === response.data.user.userName) {
                setBookQuote(response.data);
                console.log(bookQuote)
                setIsModalQuoteVisible(true);
            } else {
                alert("You don't have permission to view detail of this booking")
            }
        }).catch(function (error) {
            console.log(error);
        })
    }
    const handleCancelQuote = () => {
        setIsModalQuoteVisible(false);
    };

    const [modelBrochure, setModelBrochures] = useState();
    useEffect(() => {
        GetModelListService().then(function (response) {
            setModelBrochures(response.data);
        }).catch(function (error) {
            console.log(error);
        })
    }, [])
    return (
        <Content className={styles.antLayoutContent}>

            <Modal title="Update booking" visible={isModalQuoteCompleteVisible}
                onCancel={handleQuoteCompleteCancel} centered={true}
                footer={null} style={{ height: '20', borderRadius: '20px', fontWeight: '30px' }} >
                <Form

                    wrapperCol={{
                        span: '100%',
                    }}
                    name="validate_other"
                    form={form}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinishQuote}
                >
                    <Form.Item
                        name="specificRequest"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Customer' specific request is required",
                            },
                        ]}
                    >
                        <TextArea placeholder="Customer's specific request" />
                    </Form.Item>
                    <Form.Item
                        name="staffAnswer"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Your answer to customer is required",
                            },
                        ]}
                    >
                        <TextArea placeholder="Staff answer" />
                    </Form.Item>
                    <Form.Item
                        name="fileRecord"
                        label="Upload"
                        valuePropName="fileList"
                        getValueFromEvent={normFileMP3}
                        extra="Upload Record file"
                        rules={[
                            {
                                required: true,
                                message: "File record required!",
                            },
                            () => ({
                                validator(_, value) {
                                    console.log(value[0].name.slice(-4))
                                    if (value[0].name.slice(-4) === ".mp3") {
                                        return Promise.resolve();
                                    } return Promise.reject(
                                        new Error("Mp3 file only!")
                                    );
                                },
                            }),
                        ]}

                    >
                        <Upload name="logo" action="https://localhost:5001/api/Image" maxCount={1} listType="picture">
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                        </Upload>
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
            <Modal title="Update booking" visible={isModalCompleteVisible}
                onCancel={handleCompleteCancel} centered={true}
                footer={null} style={{ height: '20', borderRadius: '20px', fontWeight: '30px' }} >
                <Form

                    wrapperCol={{
                        span: '100%',
                    }}
                    name="validate_other"
                    form={form1}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="specificRequest"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Customer' Feedback is required",
                            },
                        ]}
                    >
                        <TextArea placeholder="Customer's FeedBack" />
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
            <Row>
                <h2 className={styles.title}>Request test drive List</h2>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                <Col span={5}>
                    <Select {...selectProps} />
                </Col>
                <Col span={10}>
                    <Search onSearch={handleSearch} />
                </Col>
                <Col span={4}></Col>
            </Row>
            <br />
            {searchBooking !== undefined ?
                <> {
                    booking !== null ?
                        // <>
                        <Modal width={800} title="Booking Test Drive Details" visible={isModalVisible} footer={null} onCancel={handleCancel} centered={true}>
                            <table className={styles.tableModal}>
                                <tr>
                                    <td>Customer Infor:</td>
                                    <td>{booking.fullName} - {booking.email} - {booking.phoneNumber}</td>
                                </tr>
                                <tr>
                                    <td>Appointment:</td>
                                    <td>{new Date(booking.appointment).toLocaleDateString()} in the {booking.timePeriod} </td>
                                </tr>
                                <tr>
                                    <td>Want to test model:</td>
                                    <td>{booking.model.name}</td>
                                </tr>
                                <tr>
                                    <td>Customer's response:</td>
                                    <td>{booking.isAccepted === true ? "Confirm to come" : "Waiting for response"}</td>
                                </tr>
                                <hr />
                                <tr>
                                    <td>Customer's specific request & feedback:</td>
                                    <td><b>{booking.specificRequest}</b></td>
                                </tr>
                                <tr>
                                    <td>Completed By </td>
                                    <td>{(booking.user === undefined || booking.user === null) ? "" : booking.user.userName}</td>
                                </tr>
                                <hr />
                                <tr>
                                    <td>Status</td>
                                    <td>{booking.status === true ? <GiCheckMark style={{ color: "green", fontSize: "30px" }} /> : <span style={{ color: "red", fontSize: "20px" }}>Processing....</span>}</td>
                                </tr>
                            </table>
                        </Modal>

                        : ""
                }
                    {
                        bookQuote !== null ?
                            // <>
                            <Modal width={800} title="Request for quote details" visible={isModalQuoteVisible} footer={null} onCancel={handleCancelQuote} centered={true}>
                                <table className={styles.tableModal}>
                                    <tr>
                                        <td>Customer Infor:</td>
                                        <td>{bookQuote.fullName} - {bookQuote.email} - {bookQuote.phoneNumber}</td>
                                    </tr>
                                    <tr>
                                        <td>Request for quote:</td>
                                        <td>{bookQuote.car.name}</td>
                                    </tr>
                                    <hr />
                                    <tr>
                                        <td>Customer's specific request :</td>
                                        <td><b>{bookQuote.specificRequest}</b></td>
                                    </tr>
                                    <tr>
                                        <td>Staff Answer:</td>
                                        <td><b>{bookQuote.staffAnswer}</b></td>
                                    </tr>
                                    <tr>
                                        <td>Completed By </td>
                                        <td>{(bookQuote.user === undefined || bookQuote.user === null) ? "" : bookQuote.user.userName}</td>
                                    </tr>
                                    <hr />
                                    <tr>
                                        <td>Status</td>
                                        <td>{bookQuote.status === true ? <GiCheckMark style={{ color: "green", fontSize: "30px" }} /> : <span style={{ color: "red", fontSize: "20px" }}>Processing....</span>}</td>
                                    </tr>
                                    <hr />
                                    {bookQuote.fileRecord === null || bookQuote.fileRecord === undefined ? "Nothing" : <a href={bookQuote.fileRecord.imageSrc}><Button style={{ marginLeft: '50%', width: '100%' }}>Recorded file</Button></a>}
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
                                    searchBooking.items.map(book => {
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
                                                <td className={styles.borderRow} onClick={showModal} id={book.id}>{book.status === true ? "Completed" : "Processing...."}</td>
                                                <td></td>
                                                <td className={styles.borderRow} onClick={showModal} id={book.id}>{book.note}</td>
                                                <td></td>
                                                <td>
                                                    {currentUser.role === 'Admin' || book.isAccepted === false ? "" :
                                                        (
                                                            book.user !== null && book.status === false ?
                                                                <i className={`${styles.disabledIcon} bi bi-check-square-fill`} ></i>
                                                                :
                                                                (
                                                                    book.user === null && book.status === false ?
                                                                        <i class="bi bi-check-square-fill" onClick={showModalComplete} id={book.id}></i> : ""
                                                                )
                                                        )
                                                    }
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
                                : <Pagination size={'small'} total={searchBooking.totalRecords} defaultCurrent={1} itemRender={itemRender} showSizeChanger={true} onChange={handleChangePage} />
                            }
                        </Col>
                    </Row>
                </> : ""
            }
            <Row>
                <h2 className={styles.title}>Request for quote List</h2>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                <Col span={5}>
                    <Select {...selectPropsQuote} />
                </Col>
                <Col span={10}>
                    <Search onSearch={handleSearchQuote} />
                </Col>
                <Col span={4}></Col>
            </Row>
            <br />

            {
                searchQuote !== undefined ?
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
                                        searchQuote.items.map(book => {
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
                                                    <td className={styles.borderRow} onClick={showModalQuote} id={book.id}>{book.status === true ? "Called" : "Processing...."}</td>
                                                    <td></td>
                                                    <td className={styles.borderRow} onClick={showModalQuote} id={book.id}>{book.service.name}</td>
                                                    <td></td>
                                                    <td className={styles.borderRow} onClick={showModalQuote} id={book.id}>{book.note}</td>
                                                    <td></td>
                                                    <td>
                                                        {currentUser.role === 'Admin' || book.status === true ? "" :
                                                            (
                                                                book.user !== null && book.status === false ?
                                                                    <i className={`${styles.disabledIcon} bi bi-check-square-fill`} ></i>
                                                                    :
                                                                    (
                                                                        book.user === null && book.status === false ?
                                                                            <i class="bi bi-check-square-fill" onClick={showModalQuoteComplete} id={book.id}></i> : ""
                                                                    )
                                                            )
                                                        }
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
                                {valueQuote.length !== 0 || searchValueQuote !== ''
                                    ? <Pagination size={'small'} total={totalQuote.length} defaultCurrent={1} itemRender={itemRenderQuote} showSizeChanger={true} onChange={handleChangePageQuote} />
                                    : <Pagination size={'small'} total={searchQuote.totalRecords} defaultCurrent={1} itemRender={itemRenderQuote} showSizeChanger={true} onChange={handleChangePageQuote} />
                                }
                            </Col>
                        </Row>
                    </> : ""
            }
            <Row> {
                modelBrochure !== undefined ?
                    <Menu mode="inline">
                        <SubMenu key="sub2" icon={<FaBook />} title="Prices list">
                            <Menu.Item style={{ height: 'auto' }}>
                                <div>
                                    <table style={{ width: '50%' }}>
                                        <thead>
                                            <tr>
                                                <th>Mercedes-Benz Sedans</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>C 180 AMG</td>
                                                <td>1,499,000,000 VND</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table style={{ width: '50%' }}>

                                    </table>
                                </div>
                                <div className={"ListTable"}>
                                    <table></table>
                                    <table></table>
                                </div>
                                <div className={"ListTable"}>
                                    <table></table>
                                    <table></table>
                                </div>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub1" icon={<FaBook />} title="Brochures ">
                            {
                                modelBrochure.map(model => {
                                    return (
                                        <a href={model.fileInfor.imageSrc}><Menu.Item><FaBook /> {model.name} brochures</Menu.Item></a>
                                    )
                                })
                            }
                        </SubMenu>
                    </Menu> : ""}
            </Row>
        </Content >
    )
}

export default ListBooking;