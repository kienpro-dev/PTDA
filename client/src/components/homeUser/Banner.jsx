import React, { useState } from 'react';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import bg_1_1 from '../../assets/images/bg_1_1_2.png';
import axios from 'axios';
import { api, getCurrentUserLogin } from "../../store/apiRequest"


const Banner = () => {
    const navigate = useNavigate();
    const [position, setPosition] = useState(null);
    const getCurrentLocation = async () => {
        try {
            if (navigator.geolocation) {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const { latitude, longitude } = position.coords;
                            resolve({ latitude, longitude });
                        },
                        (error) => {
                            reject(error);
                        }
                    );
                });
                setPosition(position);
            } else {
                throw new Error("Geolocation is not supported by this browser.");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const [userInfor, setUserInfor] = useState({})
    const getCurrentCustomer = async () => {
        const res = await getCurrentUserLogin();
        setUserInfor(res.data.data)
        console.log(position);
    }
    const handleAddress = () => {
        getCurrentLocation();
        getCurrentCustomer();
        let getaddress = {
            customerId: userInfor.customerId,
            latitude: position.latitude,
            longitude: position.longitude
        }
        const res = axios.post(`http://localhost:8080/api/v1/address/${userInfor.customerId}?latitude=${position.latitude}&longitude=${position.longitude}`, { params: getaddress })
        console.log(res);
    }
    return (
        <div className="home-banner">
            <div>
                < div className="home-banner-content">
                    <h2 className='line'>Welcome to HitFood </h2>
                    <h1 className='line'>Hôm nay, bạn muốn ăn gì?</h1>
                    <div className="search line" >
                        <div className='search-position' >
                            <Button text={<i className="fa-solid fa-crosshairs" onClick={() => handleAddress()}></i>}></Button>
                            <input type="text" placeholder='Tìm kiếm theo tên món ăn hoặc vị trí...' />
                        </div>
                        <Button text={<i className='fas fa-search' />} onClick={() => navigate('/search')}></Button>
                    </div>
                </div>
                <div>
                    <img src={bg_1_1} alt="" className="fish_fry " />
                </div>
            </div>
        </div>
    );
};

export default Banner;