import React from 'react'


const TableOrders = ({ listOrder, handleClickBtnUpdate, handleClickViewOrder, handleClickBtnDelete }) => {

    return (
        <div>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Tên khách hàng</th>
                        <th scope="col">Giá tiền</th>
                        <th scope="col">Ngày tạo đơn</th>
                        <th scope="col">Tình trạng</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listOrder && listOrder.length > 0 &&
                        listOrder.map((item, index) => {
                            return (
                                <tr key={`table-Orders-${index}`}>
                                    <td>{item.bill.nameCustomer}</td>
                                    <td>{parseInt(item.bill.payment)}đ</td>
                                    <td>{item.bill.createdDate}</td>
                                    <td>{item.bill.status}</td>
                                    <td>
                                        <button 
                                        className='btn btn-success'
                                        onClick={() => handleClickViewOrder(item)}
                                        >View</button>
                                        <button
                                            className='btn btn-warning mx-3'
                                            onClick={()=>handleClickBtnUpdate(item)}
                                        >Update</button>
                                        <button 
                                        className='btn btn-danger'
                                        onClick={()=>handleClickBtnDelete(item.id)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    {listOrder && listOrder.length === 0
                        && <tr>
                            <td colSpan="4">Not found data</td>
                        </tr>
                    }

                </tbody>
            </table>
        </div>
    )
}

export default TableOrders