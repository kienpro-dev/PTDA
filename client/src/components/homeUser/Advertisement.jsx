import React from 'react';
import hotdog from '../../assets/images/h1_img.png';
import imgThink from '../../assets/images/h1_think.png';
import Button from '../Button';
import thunk_1 from '../../assets/images/h1_thunder-1.png';
import thunk_2 from '../../assets/images/h1_thunder-2.png';
import { useNavigate } from 'react-router-dom';

const Advertisement = () => {
    const navigate = useNavigate();
    return (
        <div className='home-advertisement'>
            <div className='home-container'>
                <div>
                    <div className="home-advertisement-bg">
                        <img src={hotdog} alt="" />
                    </div>
                    <div className="home-advertisement-content">
                        {/* norican,Sans-seri */}
                        <div className='price'>
                            <img src={imgThink} alt="" />
                            <p>Chỉ với
                                <br />
                                <span>50.000VND</span>
                            </p>
                        </div>
                        <div className='home-advertisement-content-title'>
                            <h3>Hot Fresh</h3>
                            <h1>HOTDOG</h1>
                            <Button onClick={() => {navigate('/order'); window.scrollTo(0, 0)}} text='Đặt hàng ngay' />
                            <div className="img_thunk">
                                <img src={thunk_1} alt="" />
                                <img src={thunk_2} alt="" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Advertisement;