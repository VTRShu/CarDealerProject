import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Input, Button, Layout, Pagination, Modal, Form } from 'antd';
import { FilterFilled, InfoCircleFilled } from '@ant-design/icons';
import styles from './ListBooking.module.css'
import {
    GetAllBookingWSService, GetListBookingWSService,
    UpdateBookWSService, GetBookWSService
} from '../../../../Services/BookingService';
import './ListBookingAntStyle.css'
import 'font-awesome/css/font-awesome.min.css';
import BookingConstant from '../../../../Share/Constant/BookingConstant'
import { Link } from "react-router-dom";
import CurrentUserContext from '../../../../Share/Context/CurrentUserContext'
import { Select } from 'antd';
import { SiCheckmarx } from 'react-icons/si'
import { GiCheckMark } from 'react-icons/gi'
const { Search, TextArea } = Input;
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
const options = [{ label: 'Completed', value: true }, { label: 'Processing...', value: false }]
const ListBookingWS = () => {
    const { form } = Form.useForm();
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [value, setValue] = useState([]);
    const [searchBooking, setSearchBooking] = useState();
    const [pageIndex, setPageIndex] = useState(BookingConstant.PageIndexDefault);
    const [pageSizeOld, setPageSizeOld] = useState(BookingConstant.PageSizeDefault);
    const [searchValue, setsearchValue] = useState('');
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
        placeholder: 'Status',
        maxTagCount: 'responsive',
        showArrow: true,
        optionFilterProp: 'label'
    };
    //filter by status
    useEffect(() => {
        if (value.length === 0 && total !== 0) {

            GetListBookingWSService({ index: pageIndex, size: pageSizeOld }).then(function (response) {
                setSearchBooking(response.data);
            }).catch(function (error) {
                console.log(error);
            })

        } else if (value.length !== 0) {
            GetAllBookingWSService().then(function (response) {
                let data = response.data.filter(x => value.includes(x.status));
                setSearchBooking({ ...searchBooking, items: data.slice((pageIndex - 1) * pageSizeOld, pageIndex * pageSizeOld) });
                setTotal(data);
            }).catch(function (error) {
                console.error(error);
            })
        }
    }, [value]);

    useEffect(() => {
        if (value.length !== 0 || searchValue !== '') {
            setSearchBooking({ ...searchBooking, items: total.slice((pageIndex - 1) * pageSizeOld, pageIndex * pageSizeOld) });

        } else {
            GetListBookingWSService({ index: pageIndex, size: pageSizeOld }).then(function (response) {
                setSearchBooking(response.data);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }, [pageSizeOld, pageIndex])
    const handleSearch = (value) => {
        if (value !== '') {
            let searchInput = value.toUpperCase().trim();
            GetAllBookingWSService().then(function (response) {
                let data = response.data.filter(x => x.fullName.toUpperCase().includes(searchInput)
                    || x.licensePlate.toUpperCase().includes(searchInput));
                setSearchBooking({ ...searchBooking, items: data.slice((pageIndex - 1) * pageSizeOld, pageIndex * pageSizeOld) });
                setTotal(data);
                setsearchValue(searchInput);
            }).catch(function (error) {
                console.log(error);
            })

        } else {
            GetListBookingWSService({ index: pageIndex, size: pageSizeOld }).then(function (response) {
                setSearchBooking(response.data);
            }).catch(function (error) {
                console.log(error);
            })
        }
    }
    const [bookId, setBookId] = useState();
    const [isModalCompleteVisible, setIsModalCompleteVisible] = useState(false);
    const showModalComplete = (evt) => {
        setBookId(evt.target.id);
        setIsModalCompleteVisible(true);
    }

    const onFinish = (value, evt) => {
        UpdateBookWSService({
            userCode: currentUser.code,
            id: bookId,
            customerFeedBack: value.customerFeedBack,

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
    const [bookWs, setBookWS] = useState({
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
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = (evt) => {
        GetBookWSService({ id: evt.currentTarget.id }).then(function (response) {
            if (currentUser.role === 'Admin' || currentUser.user === response.data.user.userName) {
                setBookWS(response.data);
                console.log(bookWs)
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
    return (
        <Content className={styles.antLayoutContent}>
            <Modal title="Update booking" visible={isModalCompleteVisible}
                onCancel={handleCompleteCancel} centered={true}
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
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="customerFeedBack"
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
                <h2 className={styles.title}>Workshop booking list</h2>
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
                <>{
                    bookWs !== null ?
                        // <>
                        <Modal width={800} title="Booking  Workshop service Details" visible={isModalVisible} footer={null} onCancel={handleCancel} centered={true}>
                            <table className={styles.tableModal}>
                                <tr>
                                    <td>Customer Infor:</td>
                                    <td>{bookWs.fullName} - {bookWs.email} - {bookWs.phoneNumber}</td>
                                </tr>
                                <tr>
                                    <td>Appointment:</td>
                                    <td>{new Date(bookWs.appointment).toLocaleDateString()} in the {bookWs.timePeriod} </td>
                                </tr>
                                <tr>
                                    <td>Customer's License Plate:</td>
                                    <td>{bookWs.licensePlate}</td>
                                </tr>
                                <tr>
                                    <td>Customer's response:</td>
                                    <td>{bookWs.isAccepted === true ? "Confirm to come" : "Waiting for response"}</td>
                                </tr>
                                <hr />
                                <tr>
                                    <td>Customer's specific request:</td>
                                    <td>{bookWs.specificRequest}</td>
                                </tr>
                                <hr />
                                <tr>
                                    <td>Customer's feedback:</td>
                                    <td><b>{bookWs.customerFeedBack}</b></td>
                                </tr>
                                <tr>
                                    <td>Completed By </td>
                                    <td>{(bookWs.user === undefined || bookWs.user === null) ? "" : bookWs.user.userName}</td>
                                </tr>
                                <hr />
                                <tr>
                                    <td>Status</td>
                                    <td>{bookWs.status === true ? <GiCheckMark style={{ color: "green", fontSize: "30px" }} /> : <span style={{ color: "red", fontSize: "20px" }}>Processing....</span>}</td>
                                </tr>
                            </table>
                        </Modal>

                        : ""
                }
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
                                    searchBooking.items.map(book => {
                                        return (
                                            <tr key={book.id}>
                                                <td className={styles.borderRow} onClick={showModal} id={book.id}>{book.licensePlate} {(book.mileage === undefined || book.mileage === null || book.mileage === "") ? "" : (book.mileage + "Km")} {(book.carIdentification === undefined || book.carIdentification === null) ? "" : book.carIdentification}</td>
                                                <td></td>
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
                                                <td className={styles.borderRow} onClick={showModal} id={book.id}>{book.isAccepted === true ? "Confirm to come" : "Waiting for response"}</td>
                                                <td></td>
                                                <td className={styles.borderRow} onClick={showModal} id={book.id}>{book.status === true ? "Completed" : "Processing...."}</td>
                                                <td></td>
                                                <td className={styles.borderRow} onClick={showModal} id={book.id}>{book.specificRequest.replaceAll(",", " ; ")}</td>
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
                </> : ""}
        </Content>
    )
}
export default ListBookingWS;