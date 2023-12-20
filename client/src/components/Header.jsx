import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import '../assets/scss/components/Header.scss';
import Button from './Button';
import Icon from './Icon';
import userImage from '../assets/images/user.png';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotals } from '../store/cartSlice';
import { getCurrentUserLogin } from '../store/apiRequest';


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const accessToken = localStorage.getItem("accessToken");
    const username = localStorage.getItem("username")
    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
        localStorage.clear();
    }
    useEffect(() => {
        dispatch(getTotals());

    }, [cart])
    return (
        <>
            {
                accessToken ?
                    <div className="header-container">
                        <div className="header">
                            <div title='Nhấn vào để quay về trang home' className='header-left' onClick={() => navigate('/')}>
                                <img src={logo} alt="logo" />
                            </div>
                            <div className='header-right'>
                                <div className='header-right-search'>
                                    <Button onClick={() => {navigate('/search'); setTimeout(() => window.scrollTo(0, 0), 2000)}} className="pad0" text={<Icon className='fas fa-search' />} />
                                </div>
                                <div className='header-right-cart'>
                                    <div className='number-of-items-in-cart'>{cart.cartTotalQuantity}</div>
                                    <Button className="pad0" onClick={() => navigate('/cart')} text={<Icon className='fa-solid fa-cart-shopping' />} />
                                </div>
                                <div className='header-right-login'>
                                    <div className="img-user">
                                        <div >
                                            <img src={userImage} alt="" />
                                            <p>{localStorage.getItem("username")}</p>
                                        </div>
                                        <div className="list-menu">
                                            <Button className="list-menu-button" onClick={() => navigate('/infor')} text='Tài Khoản Của Tôi'></Button>
                                            <Button className="list-menu-button" onClick={() => navigate('/purchaseorder')} text='Đơn Mua'></Button> <hr className='list-menu-hr' />
                                            <Button className="list-menu-button" onClick={handleLogout} text='Đăng Xuất'></Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="header-container">
                        <div className="header">
                            <div title='Nhấn vào để quay về trang home' className='header-left' onClick={() => navigate('/')}>
                                <img src={logo} alt="logo" />
                            </div>
                            <div className='header-right'>
                                <div className='header-right-search'>
                                    <Button className="pad0" text={<Icon className='fas fa-search' />} />
                                </div>
                                <div className='header-right-cart'>
                                    <Button className="pad0" onClick={() => navigate('/cart')} text={<Icon className='fa-solid fa-cart-shopping' />} />
                                </div>
                                <div className='header-right-login'>
                                    <Button
                                        text='Login'
                                        onClick={() => navigate('/login')}
                                        className='header-right-login-btn'

                                    />
                                </div>
                            </div>
                        </div>
                    </div>
            }
            <div className='bufferZone'></div>
        </>
    )
}

export default Header