import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import userImage from '../assets/images/user.png';
import { billOfCurrentCustomer, placeOrder } from '../store/apiRequest';

const PurchaseOrder = () => {

    return (
        <div className='purchaseorder'>
            <div className="purchaseorder-menu">
                <div className="purchaseorder-menu-user">
                    <img src={userImage} alt="" />
                    <div>
                        <p>trang123</p>
                        <NavLink to="/purchaseorder/infor" >
                            <i className="fa-solid fa-pen"></i>
                            Sửa hồ sơ
                        </NavLink>

                    </div>
                </div>
                <hr />
                <div>
                    <NavLink to="/purchaseorder/myorder" >Đơn hàng của tôi</NavLink>
                    <NavLink to="/purchaseorder/orderhistory" >Lịch sử đơn hàng</NavLink>
                    <NavLink to="/purchaseorder/infor" >Tài khoản của tôi</NavLink>
                </div>
            </div>
            <div className='purchaseorder-link'>
                <Outlet />
            </div>
        </div>
    );
};

export default PurchaseOrder;