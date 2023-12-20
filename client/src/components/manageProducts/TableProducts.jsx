import React from 'react'


const TableProducts = ({ listProduct, handleClickBtnUpdate, handleClickViewProduct, handleClickBtnDelete }) => {

    return (
        <div>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Discount</th>
                        <th scope="col">Stock</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listProduct && listProduct.length > 0 &&
                        listProduct.map((item, index) => {
                            return (
                                <tr key={`table-products-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.discount}</td>
                                    <td>{item.stock}</td>
                                    <td>
                                        <button 
                                        className='btn btn-success'
                                        onClick={() => handleClickViewProduct(item)}
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
                    {listProduct && listProduct.length === 0
                        && <tr>
                            <td colSpan="4">Not found data</td>
                        </tr>
                    }

                </tbody>
            </table>
        </div>
    )
}

export default TableProducts