import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { billOfCurrentCustomer, cancelProduct, placeOrder } from '../store/apiRequest';




import axios from 'axios';

const MyOrder = () => {
    const navigate = useNavigate();
    const [dataBillBuy, setDataBillBuy] = useState([]);
    const [dataPlaceOrder, setDataPlaceOder] = useState([]);
    const handleGetOrders = async () => {
        const res = await billOfCurrentCustomer(localStorage.cartId);
        console.log(res.data.data, "hiện tại bill");
        setDataBillBuy(res.data.data);
        const res2 = await placeOrder(localStorage.cartId)
        // setDataPlaceOder()
        console.log(res2);
    }

    // console.log(dataBillBuy);

    const uniqueIds = [...new Set(dataBillBuy.map(bill => bill.bill.id))];
    console.log(uniqueIds, "hello");
    useEffect(() => {
        handleGetOrders();
    }, [])
    const handleCancelProduct = async (id) => {
        console.log(id, "cancel")
        let checkConfirm = confirm("Bạn có chắc chắn muốn hủy đơn hàng này🤨");
        if (checkConfirm) {
            try {
                await cancelProduct(id)
                console.log("Hủy rồi nha");
                handleGetOrders();
                navigate('/purchaseorder/orderhistory')
            } catch (error) {
                console.log(error);
                console.log("Lỗi rồi");
            }
        }
    }
    console.log(dataBillBuy);
    return (
        <div className='myorder' >
            {console.log(dataBillBuy, "hhhhhhhhhhhelo")}
            <h1>Đơn hàng của tui</h1>

            {uniqueIds.map(id => (
                <div key={id}>
                    <div className="myorder-detail" >
                        <div className='myorder-detail-shop'>
                            <h5>
                                <i className="fa-solid fa-shop"></i>
                                {dataBillBuy.filter(bill => bill.bill.id == id)[0].bill.status}
                                {console.log(dataBillBuy, "bill buy", id, "id")}
                            </h5>
                            <Button onClick={() => navigate('/shop/1')}>Xem Shop</Button>
                        </div>
                        <hr />
                        {dataBillBuy
                            .filter(bill => bill.bill.id === id)
                            .map(bill => (
                                <>
                                    <div className="myorder-detail-product">
                                        <div style={{ display: "flex" }}>
                                            <img src={bill.product.image} alt="" />
                                            <div>
                                                <h6>{bill.product.name}</h6>
                                                <p>
                                                    x {bill.quantity}
                                                </p>
                                                <div className='product-attention'>
                                                    Xem shop
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ color: "#F06C25", fontWeight: 600, fontSize: 20 }}>
                                            {bill.product.price}đ
                                        </div>
                                    </div>
                                    <br></br>
                                </>
                            ))}
                        <hr />
                        <div className='myorder-detail-cancel'>
                            <Button onClick={() => handleCancelProduct(id)}>Hủy Hàng</Button>
                        </div>
                    </div>
                </div>
            ))}
        </div >
    );
};

export default MyOrder;