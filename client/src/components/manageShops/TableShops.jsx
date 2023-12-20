import React from 'react'


const TableShops = ({ listShop, handleClickBtnUpdate, handleClickViewShop, handleClickBtnDelete }) => {

    return (
        <div>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Hotline</th>
                        <th scope="col">Time Open</th>
                        <th scope="col">Time Close</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listShop && listShop.length > 0 &&
                        listShop.map((item, index) => {
                            return (
                                <tr key={`table-shops-${index}`}>
                                    <td>{item.shopId}</td>
                                    <td>{item.name}</td>
                                    <td>{item.hotline}</td>
                                    <td>{item.timeOpen}</td>
                                    <td>{item.timeClose}</td>
                                    <td>
                                        <button 
                                        className='btn btn-success'
                                        onClick={() => handleClickViewShop(item)}
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
                    {listShop && listShop.length === 0
                        && <tr>
                            <td colSpan="4">Not found data</td>
                        </tr>
                    }

                </tbody>
            </table>
        </div>
    )
}

export default TableShops