import React, { useEffect, useState } from 'react';
import Icon from '../components/Icon';
import Button from '../components/Button';
import { historyBillsOfCurrentCustomer } from '../store/apiRequest';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
    const [dataHistoryBuy, setDataHistoryBuy] = useState([]);
    const handleGetHistoryOrders = async () => {
        const res = await historyBillsOfCurrentCustomer(localStorage.cartId);
        console.log(res.data.data, "hiện tại History");
        setDataHistoryBuy(res.data.data);
    }

    useEffect(() => {
        handleGetHistoryOrders();
    }, [])
    return (
        <div className='order-history order-contaniner'>
            <div>
                <div className='order-history-title'>
                    <h1>
                        Lịch sử mua hàng
                    </h1>
                </div>
                <div className="order-history-table">
                    <table cellPadding=' 12px 16px' cellSpacing='0'>
                        <thead>
                            <tr>
                                <th>Đơn Hàng</th>
                                <th>Tên Hàng</th>
                                <th>Ngày Đặt</th>
                                {/* <th>Giờ Đặt</th> */}
                                <th>Trạng Thái</th>
                                <th>Số Lượng Đặt</th>
                                <th>Tổng Tiền</th>
                                {/* <th>Đặt lại</th> */}
                            </tr>
                        </thead>

                        <tbody>
                            {dataHistoryBuy && dataHistoryBuy.map((item) => (
                                <>
                                    <tr>
                                        <td>{item.bill.id}</td>
                                        <td>{item.product.name}</td>
                                        <td>{item.bill.createdDate.split("T")[0].split("-").reverse().join("-")}</td>
                                        {/* <td>{item.bill.createdDate.split("T")[1]}</td> */}
                                        <td>{item.bill.status}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.product.price.toLocaleString('vi-VN')} VND</td>
                                        {/* <td>
                                            <Button className='resetIcon' text={<Icon className="fa-solid fa-arrow-rotate-left" />}></Button>
                                        </td> */}
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* <div className="order-history-paging">
                    <Button className='btn-history-paging' text={<Icon className="fa-solid fa-angles-left"></Icon>}></Button>
                    <Button className='btn-history-paging  active' text='1'></Button>
                    <Button className='btn-history-paging' text='2'></Button>
                    <Button className='btn-history-paging' text='3'></Button>
                    <Button className='btn-history-paging' text='4'></Button>
                    <Button className='btn-history-paging' text={<Icon className="fa-solid fa-angles-right"></Icon>}></Button>
                </div> */}
                <br /><br />
            </div>
        </div >
    );
};

export default OrderHistory;