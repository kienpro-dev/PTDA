import React from 'react'


const TableUser = ({ listUser, handleClickBtnUpdate, handleClickViewUser, handleClickBtnDelete }) => {

    return (
        <div>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 &&
                        listUser.map((item, index) => {
                            return (
                                <tr key={`table-users-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.fullName}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td width="500px">{item?.address?.addressName}</td>
                                    <td>
                                        <button 
                                        className='btn btn-success'
                                        onClick={() => handleClickViewUser(item)}
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
                    {listUser && listUser.length === 0
                        && <tr>
                            <td colSpan="4">Not found data</td>
                        </tr>
                    }

                </tbody>
            </table>
        </div>
    )
}

export default TableUser