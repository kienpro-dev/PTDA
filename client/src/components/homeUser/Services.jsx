import React from 'react';
import order from '../../assets/images/online-search.png';
import tracking from '../../assets/images/tracking.png';
import bibimbap from '../../assets/images/bibimbap.png';
import diet from '../../assets/images/diet.png';
import money from '../../assets/images/money-bag.png';


const Services = () => {
    return (
        <div className='services home-container'>
            <div>
                <div className="services-title">
                    <h1>TIỆN ÍCH CỦA CHÚNG TÔI</h1>
                    <div className="list-services">
                        <div>
                            <div className="list-services-img">
                                <img src={order} alt="" />
                            </div>
                            <div className="list-services-content">
                                <h3>Dễ Dàng Đặt Hàng</h3>
                                <p>Bạn chỉ cần một vài bước để đặt món ăn.</p>
                            </div>
                        </div>
                        <div>
                            <div className="list-services-img">
                                <img src={tracking} alt="" />
                            </div>
                            <div className="list-services-content">
                                <h3>Chuyển Phát Nhanh</h3>
                                <p>Bạn chỉ cần ngồi chờ và hàng của bạn có thể được giao tận nhà của bạn</p>
                            </div>
                        </div>
                        <div>
                            <div className="list-services-img">
                                <img src={bibimbap} alt="" />
                            </div>
                            <div className="list-services-content">
                                <h3>Chất Lượng Tốt Nhất</h3>
                                <p>Không chỉ nhanh đối với chúng tôi chất lượng còn là số một.</p>
                            </div>
                        </div>
                        <div>
                            <div className="list-services-img">
                                <img src={diet} alt="" />
                            </div>
                            <div className="list-services-content">
                                <h3>Nguyên Liệu Sạch</h3>
                                <p>Nguyên liệu chúng tôi dùng để làm món ăn cho bạn cam kết sạch 100%</p>
                            </div>
                        </div>
                        <div>
                            <div className="list-services-img">
                                <img src={money} alt="" />
                            </div>
                            <div className="list-services-content">
                                <h3>Giá Cả Phải Chăng</h3>
                                <p>Chúng tôi luôn đưa cho bạn những mức giá tiền phải chăng.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;