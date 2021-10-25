import { Breadcrumb, Layout, Button, Modal, Form, Input, Menu, Dropdown } from "antd";
import "antd/dist/antd.css";
import { Link, useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import { DownOutlined } from '@ant-design/icons';
import React from "react";
import { Carousel } from 'antd';
import "./SlideProject.css";
import { FaCaretRight } from 'react-icons/fa'
const SlideProject = () => {
    return (
        <Carousel swipeToSlide draggable style={{ width: '100%', color: 'white' }} nextArrow={true} prevArrow={true} autoplay>
            <div>
                <a>
                    <div className="contentStyle1">
                        <p className="titleSlide">The new EQE from Mercedes-EQ <br /><FaCaretRight style={{ fontSize: '15px', marginBottom: "5px" }} />This is for all senses</p>
                        <div style={{ textAlign: 'left', marginTop: '27%' }}><p>*Model currently is not available in Viet Nam</p></div>
                    </div>
                </a>
            </div>
            <div>
                <a>
                    <div className="contentStyle2">
                        <p className="titleSlide">The new EQB from Mercedes-EQ <br /><FaCaretRight style={{ fontSize: '15px', marginBottom: "5px" }} />This is for new dimensions</p>
                        <div style={{ textAlign: 'left', marginTop: '27%' }}><p>*Model currently is not available in Viet Nam</p></div>
                    </div>
                </a>x
            </div>

            <div>
                <a>
                    <div className="contentStyle3">
                        <p className="titleSlide">Mercedes-AMG GLB 35 4Matic <br />Not an SUV.An AMG</p>
                    </div>
                </a>
            </div>
            <div>
                <a>
                    <div className="contentStyle4">
                        <p className="titleSlide">Star Care offer for GLC and the new E-Class <br /><FaCaretRight style={{ fontSize: '15px', marginBottom: "5px" }} />Limited opportunity until 30/9/2021 to enjoy exclusive offer up to nearly 30 million VND</p>
                    </div>
                </a>
            </div>
            <div>
                <a>
                    <div className="contentStyle5">
                        <p className="titleSlide">The all-new Mercedes-Maybach GLS <br /><FaCaretRight style={{ fontSize: '15px', marginBottom: "5px" }} />The wealth on independence</p>
                    </div>
                </a>
            </div>
        </Carousel>
    )
}
export default SlideProject;