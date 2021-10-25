import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Input, Button, Layout, Pagination, Modal } from 'antd';
import { FilterFilled, InfoCircleFilled } from '@ant-design/icons';
import styles from './ListBooking.module.css'
import {
    GetAllBookingWSService, GetListBookingWSService,
    CompleteBookingWS
} from '../../../../Services/BookingService';
import './ListBookingAntStyle.css'
import BookingConstant from '../../../../Share/Constant/BookingConstant'
import { Link } from "react-router-dom";
import CurrentUserContext from '../../../../Share/Context/CurrentUserContext'
import { Select } from 'antd';
import { SiCheckmarx } from 'react-icons/si'
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
const options = [{ label: 'Completed', value: true }, { label: 'Processing...', value: false }]
const ListBookingWS = () => {
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
        placeholder: 'Customer response',
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
    const handleCompleteOk = () => {
        CompleteBookingWS({ id: bookId }).then(function (response) {
            setIsModalCompleteVisible(false);
            window.location.reload();
        }).catch(function (error) {
            console.log(error);
            setIsModalCompleteVisible(false);
        })
    }
    const handleCompleteCancel = () => {
        setIsModalCompleteVisible(false);
    }
    return (
        <Content className={styles.antLayoutContent}>
            <Modal title="Complete booking" visible={isModalCompleteVisible}
                onOk={handleCompleteOk} onCancel={handleCompleteCancel} centered={true}
                footer={null} style={{ height: '20', borderRadius: '20px', fontWeight: '30px' }} >
                {
                    <>
                        <b style={{ marginLeft: '20%' }}>Do you want to mark this booking complete?</b>
                        <br />
                        <br />
                        <div className={styles.buttonGroup}>
                            <Button className={styles.create}
                                style={{ marginLeft: '25%' }}
                                onClick={handleCompleteOk}>Yes</Button>
                            <Button className={styles.cancelButton}
                                style={{ marginLeft: '20%' }}
                                onClick={handleCompleteCancel}>No</Button>
                        </div>
                    </>
                }
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
                                    <th className={styles.borderTable}>{BookingConstant.Dealer}</th>
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
                                                <td className={styles.borderRow} id={book.id}>{book.licensePlate} {(book.mileage === undefined || book.mileage === null || book.mileage === "") ? "" : (book.mileage + "Km")} {(book.carIdentification === undefined || book.carIdentification === null) ? "" : book.carIdentification}</td>
                                                <td></td>
                                                <td className={styles.borderRow} id={book.id}>{book.title} {book.fullName}</td>
                                                <td></td>
                                                <td className={styles.borderRow} id={book.id}>{book.email}</td>
                                                <td></td>
                                                <td className={styles.borderRow} id={book.id}>{book.phoneNumber}</td>
                                                <td></td>
                                                <td className={styles.borderRow} id={book.id}>
                                                    {book.timePeriod} {`${book.appointment.substring(8, 10)}/${book.appointment.substring(5, 7)}/${book.appointment.substring(0, 4)}`}
                                                </td>
                                                <td></td>
                                                <td className={styles.borderRow} id={book.id}>{book.dealer.name}</td>
                                                <td></td>
                                                <td className={styles.borderRow} id={book.id}>{book.isAccepted === true ? "Confirm to come" : "Waiting for response"}</td>
                                                <td></td>
                                                <td className={styles.borderRow} id={book.id}>{book.status === true ? "Completed" : "Processing...."}</td>
                                                <td></td>
                                                <td className={styles.borderRow} id={book.id}>{book.specificRequest.replaceAll(",", " ; ")}</td>
                                                <td></td>
                                                {(book.status === true || book.isAccepted === false) ? "" :
                                                    <td><SiCheckmarx onClick={showModalComplete} id={book.id} /></td>
                                                }
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