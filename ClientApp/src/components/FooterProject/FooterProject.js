import { Layout } from "antd";
import "antd/dist/antd.css";
import "./FooterProject.css";
import React from "react";
import { Link } from "react-router-dom";
import { FaCar } from 'react-icons/fa'
import { AiFillFacebook, AiFillYoutube, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';
import { FaBook, FaRegCalendarCheck } from 'react-icons/fa';
import { MdShoppingCart } from 'react-icons/md';
import { BsGearWideConnected } from 'react-icons/bs';
import { GiSteeringWheel } from 'react-icons/gi';
import { SiOpenstreetmap } from 'react-icons/si';
import { HiOutlinePhone } from 'react-icons/hi';
const { Footer } = Layout;

const FooterProject = () => {
    var url = window.location.href;
    var check = "manager";
    return (
        <Footer style={{ backgroundColor: 'black', color: 'white' }}>
            {url.includes(check) ?
                <div style={{ textAlign: "center", backgroundColor: 'black', color: 'white' }}>
                    GCH18682(001181300) ©2021 Created by Le Trung Nghia
                </div>
                :
                <div className="menuService">
                    <div className="item"><Link to='/check-customer'><button className="btn-footer" title="Test Drive"><GiSteeringWheel style={{ fontSize: "50px" }} /> </button></Link></div>
                    <div className="item"><Link to='/check-customerws'><button className="btn-footer" title="Book Workshop service"><FaRegCalendarCheck style={{ fontSize: "50px" }} /></button></Link></div>
                    <div className="item"><Link to='/'><button className="btn-footer" title="Car Configurator"><BsGearWideConnected style={{ fontSize: "50px" }} /></button></Link></div>
                    <div className="item"><Link to='/list-dealer-customer'><button className="btn-footer" title="Find Dealer"><SiOpenstreetmap style={{ fontSize: "50px" }} />  </button></Link></div>
                    <div className="item"> <Link to='/list-car-customer'><button className="btn-footer" title="Search available car"><MdShoppingCart style={{ fontSize: "50px" }} />  </button></Link></div>
                </div>
            }
            <div className="menu1">
                <div className="submenu">
                    <div > <Link to="#">Copyright</Link></div>
                    <div > <Link to="#">Settings</Link></div>
                    <div> <Link to="#">Privacy statement</Link></div>
                    <div> <Link to="#">Legal notice</Link></div>
                </div>
                <div className="iconSocial">
                    <div ><a title="Face Book" href="https://www.facebook.com/MercedesBenzVietnam/" target="_blank"> <AiFillFacebook /></a></div>
                    <div><a title="Youtube" href="https://www.youtube.com/user/mercedesbenzvietnam" target="_blank">  <AiFillYoutube /></a></div>
                    <div><a title="Instagram" href="https://www.instagram.com/mercedesbenz.vietnam/" target="_blank">  <AiFillInstagram /></a></div>
                    <div> <a title="Linkedin" href="https://www.linkedin.com/company/mercedesbenzvietnam" target="_blank"> <AiFillLinkedin /></a></div>
                </div>
            </div>

        </Footer>
    )
}
export default FooterProject;