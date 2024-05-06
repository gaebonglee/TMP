import React from 'react';
import "./InquiryMain.scss"
import {useNavigate, Outlet} from "react-router-dom"

const InquiryMain = () => {
    const navigate = useNavigate();
    const inquiryButton = () => {
        navigate('/servicecenter/inquiry')
    }
    const inquiryListButton = () => {
        navigate('/servicecenter/inquirypassword')
    }
    return (
        <div className='inquiryWrapper'>
            <div className='inquiryMain_title_container'>
                <h1>문의하기</h1>
            </div>
            <div className='inquiryMain_button_container'>
                <div className='inquire' onClick={inquiryButton}> <div>1:1 문의하기</div></div>
                <div className='list'><div onClick={inquiryListButton}>문의내역</div></div>
            </div>
            <div className='inquiryMain_hr_container'>
                <hr className='inquiryMain_hr'/>
            </div>
            <Outlet/>
        </div>
    );
};

export default InquiryMain;