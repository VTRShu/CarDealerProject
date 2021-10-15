import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Input, Button, Layout, Pagination, Modal } from 'antd';
import { FilterFilled, InfoCircleFilled } from '@ant-design/icons';
import styles from './ListCustomer.module.css'
import {
    GetAllCustomerSerivce, GetListCustomerSerivce,
    GetCustomerByIdService
} from '../../../../Services/CustomerService';
import './ListCustomerAntStyle.css';
import moment from "moment-timezone";
import { saveAs } from 'file-saver';
import Excel from 'exceljs';
import CustomerConstant from '../../../../Share/Constant/CustomerConstant'
import { Link } from "react-router-dom";
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
const ListCustomer = () => {
    const [searchCustomer, setSearchCustomer] = useState();
    const [pageIndex, setPageIndex] = useState(CustomerConstant.PageIndexDefault);
    const [pageSizeOld, setPageSizeOld] = useState(CustomerConstant.PageSizeDefault);
    const [searchValue, setsearchValue] = useState('');
    const [total, setTotal] = useState(0);
    const workbook = new Excel.Workbook();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleChangePage = (page, pageSize) => {
        if (page !== pageIndex) {
            setPageIndex(page);
        }
        if (pageSize !== pageSizeOld) {
            setPageSizeOld(pageSize);
        }
    }
    const [customer, setCustomer] = useState({
        title: null,
        fullName: null,
        email: null,
        phoneNumber: null,
        bookings: [],
    })

    const showModal = (evt) => {
        GetCustomerByIdService({ id: evt.target.id }).then(function (response) {
            setCustomer(response.data);
            setIsModalVisible(true);
        }).catch(function (error) {
            console.error(error);
        })
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        if (searchValue !== '') {
            setSearchCustomer({ ...searchCustomer, items: total.slice((pageIndex - 1) * pageSizeOld, pageIndex * pageSizeOld) });
        } else {
            GetListCustomerSerivce({ index: pageIndex, size: pageSizeOld }).then(function (response) {
                setSearchCustomer(response.data);
            }).catch(function (error) {
                console.error(error);
            })
        }
    }, [pageSizeOld, pageIndex]);
    const handleSearch = (value) => {
        if (value !== '') {
            let searchInput = value.toUpperCase().trim();
            GetAllCustomerSerivce().then(function (response) {
                let data = response.data.filter(x => x.fullName.toUpperCase().includes(searchInput)
                    || x.email.toUpperCase().includes(searchInput));
                setSearchCustomer({ ...searchCustomer, items: data.slice((pageIndex - 1) * pageSizeOld, pageIndex * pageSizeOld) });
                setTotal(data);
                setsearchValue(searchInput);
            }).catch(function (err) {
                console.log(err);
            })
        } else {
            GetListCustomerSerivce({ index: pageIndex, size: pageSizeOld }).then(function (response) {
                setSearchCustomer(response.data);
            }).catch(function (error) {
                console.error(error);
            })
        }
    }

    const [customerExport, setCustomerExport] = useState();
    const columns = [
        { header: CustomerConstant.Title, key: 'title' },
        { header: CustomerConstant.FullName, key: 'fullName' },
        { header: CustomerConstant.Email, key: 'email' },
        { header: CustomerConstant.PhoneNumber, key: 'phoneNumber' },
    ];
    useEffect(() => {
        let didCancel = false;
        GetAllCustomerSerivce().then(function (response) {
            if (!didCancel) {
                setCustomerExport(response.data);
            }
        }).catch(function (error) {
            console.log(error);
        })
        return () => didCancel = true
    }, [])
    const saveExcel = async () => {
        try {
            var today = new Date(moment().tz("Asia/Ho_Chi_Minh"));
            const fileName = `CustomerExport-${today.getUTCFullYear()}-${("0" + (today.getUTCMonth() + 1)).slice(-2)}-${("0" + today.getUTCDate()).slice(-2)} `;
            // creating one worksheet in workbook
            const worksheet = workbook.addWorksheet("customer data");

            // add worksheet columns
            // each columns contains header and its mapping key from data
            worksheet.columns = columns;

            // updated the font for first row.
            worksheet.getRow(1).font = { bold: true };
            // loop through all of the columns and set the alignment with width.
            worksheet.columns.forEach(column => {
                column.width = column.header.length + 5;
            });

            // loop through data and add each one to worksheet
            customerExport.forEach(singleData => {
                worksheet.addRow(singleData);
            });

            // write the content using writeBuffer
            const buf = await workbook.xlsx.writeBuffer();

            // download the processed file
            saveAs(new Blob([buf]), `${fileName}.xlsx`);
        } catch (error) {
            console.error('<<<ERRROR>>>', error);
            console.error('Something Went Wrong', error.message);
        } finally {
            // removing worksheet's instance to create new one
            workbook.removeWorksheet("customer data");
        }
    }
    return (
        <Content className={styles.antLayoutContent}>
            <Row>
                <h2 className={styles.title}>Customer List</h2>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                <Col span={10}>
                    <Search onSearch={handleSearch} />
                </Col>
                <Col span={4}></Col>
            </Row>
            <Row justify="end">
                <Col xl={3} sm={24}>
                    <Button className={styles.create} onClick={saveExcel}>Export</Button>
                </Col>
            </Row>
            <br />
            {
                searchCustomer !== undefined ?
                    <>
                        {
                            customer !== null ?
                                <Modal width={450} title="Customer Information" visible={isModalVisible} footer={null} onCancel={handleCancel} centered={true}>
                                    <table className={styles.tableModal}>
                                        <tr>
                                            <td>Full Name</td>
                                            <td>{customer.title} {customer.fullName}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>{customer.email}</td>
                                        </tr>
                                        <tr>
                                            <td>Phone Number</td>
                                            <td>{customer.phoneNumber}</td>
                                        </tr>

                                        <tr>
                                            <td >Booked services</td>
                                            <td>{customer.bookings.map(book => {
                                                return (
                                                    <p>{book.service.name} ({book.dealer.name}) in {`${book.appointment.substring(8, 10)}/${book.appointment.substring(5, 7)}/${book.appointment.substring(0, 4)}`}</p>
                                                )
                                            })}
                                            </td>
                                        </tr>
                                    </table>
                                </Modal> : ""
                        }
                        <Row className={"ListTable"}>
                            <table style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th className={styles.borderTable}>{CustomerConstant.FullName}</th>
                                        <th></th>
                                        <th className={styles.borderTable}>{CustomerConstant.Email}</th>
                                        <th></th>
                                        <th className={styles.borderTable}>{CustomerConstant.PhoneNumber}</th>
                                        <th></th>
                                        <th className={styles.borderTable}>{CustomerConstant.Services}</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        searchCustomer.items.map(customer => {
                                            return (
                                                <tr key={customer.id}>
                                                    <td className={styles.borderRow} onClick={showModal} id={customer.id}>{customer.title} {customer.fullName}</td>
                                                    <td></td>
                                                    <td className={styles.borderRow} onClick={showModal} id={customer.id}> {customer.email}</td>
                                                    <td></td>
                                                    <td className={styles.borderRow} onClick={showModal} id={customer.id}> {customer.phoneNumber}</td>
                                                    <td></td>
                                                    <td className={styles.borderRow} onClick={showModal} id={customer.id}>{customer.bookings.map(book => {
                                                        return (
                                                            <p id={customer.id}>{book.service.name} ({book.dealer.name}) in {`${book.appointment.substring(8, 10)}/${book.appointment.substring(5, 7)}/${book.appointment.substring(0, 4)}`}</p>
                                                        )
                                                    })}
                                                    </td>
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
                                {searchValue !== ''
                                    ? <Pagination size={'small'} total={total.length} defaultCurrent={1} itemRender={itemRender} showSizeChanger={true} onChange={handleChangePage} />
                                    : <Pagination size={'small'} total={searchCustomer.totalRecords} defaultCurrent={1} itemRender={itemRender} showSizeChanger={true} onChange={handleChangePage} />
                                }
                            </Col>
                        </Row>
                    </> : ""
            }
        </Content>
    )
}
export default ListCustomer;