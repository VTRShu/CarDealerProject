import { Layout } from "antd";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import React, { useState, useContext } from "react"
import {
    Menu,
} from "antd";
import './SideBar.css';
import { FaBook, FaRegCalendarCheck } from 'react-icons/fa';
import { MdShoppingCart } from 'react-icons/md';
import { BsGearWideConnected } from 'react-icons/bs';
import { GiSteeringWheel } from 'react-icons/gi';
import { SiOpenstreetmap } from 'react-icons/si';
import { HiOutlinePhone } from 'react-icons/hi';
const SideBar = () => {
    return (
        <div className="SideMenu">
            <div className="SideItem">
                <Link to='/create-test-drive'>
                    <div > <GiSteeringWheel style={{ color: 'white', fontSize: '25px', marginBottom: '6px', marginLeft: '2px' }} /> <span style={{ color: 'white' }}>Test drive</span></div>
                </Link>
            </div>
            <div className="SideItem">
                <Link to='/list-car-customer'>
                    <div > <MdShoppingCart style={{ color: 'white', fontSize: '25px', marginBottom: '6px', marginLeft: '2px' }} /> <span style={{ color: 'white' }}>Search available cars</span></div>
                </Link>
            </div>
            <div className="SideItem">
                <Link to='/list-dealer-customer'>
                    <div > <SiOpenstreetmap style={{ color: 'white', fontSize: '25px', marginBottom: '6px', marginLeft: '2px' }} /> <span style={{ color: 'white' }}>Find Dealers</span></div>
                </Link>
            </div>
            <div className="SideItem">
                <Link to='/'>
                    <div> <BsGearWideConnected style={{ color: 'white', fontSize: '25px', marginBottom: '6px', marginLeft: '2px' }} /> <span style={{ color: 'white' }}>Car Configurator</span></div>
                </Link>
            </div>
            <div className="SideItem">
                <Link to='/'>
                    <div> <FaBook style={{ color: 'white', fontSize: '22px', marginBottom: '1px', marginLeft: '4px' }} /> <span style={{ color: 'white' }}>Price List & brochures</span></div>
                </Link>
            </div>
            <div className="SideItem">
                <Link to='/create-bookws'>
                    <div> <FaRegCalendarCheck style={{ color: 'white', fontSize: '22px', marginBottom: '1px', marginLeft: '4px' }} /> <span style={{ color: 'white' }}>Book services</span></div>
                </Link>
            </div>
            <div className="SideItem">
                <a href="tel:+84946696302">
                    <div> <HiOutlinePhone style={{ color: 'white', fontSize: '22px', marginBottom: '1px', marginLeft: '4px' }} /> <span style={{ color: 'white' }}>Contact us</span></div>
                </a>
            </div>
        </div>
    )
}
export default SideBar;