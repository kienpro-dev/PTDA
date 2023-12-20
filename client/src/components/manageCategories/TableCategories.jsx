import React from 'react'

const TableCategories = ({ listCategory, handleClickBtnUpdate, handleClickViewCategory, handleClickBtnDelete }) => {

    return (
        <div>
            {console.log("list", listCategory)}
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listCategory && listCategory.length > 0 &&
                        listCategory.map((item, index) => {
                            return (
                                <tr key={`table-categorys-${index}`}>
                                    <td>{item.categoryId}</td>
                                    <td className='image-category'>
                                        <img width="50px" height="50px" src={item.image}/>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>
                                        <button 
                                        className='btn btn-success'
                                        onClick={() => handleClickViewCategory(item)}
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
                    {listCategory && listCategory.length === 0
                        && <tr>
                            <td colSpan="4">Not found data</td>
                        </tr>
                    }

                </tbody>
            </table>
        </div>
    )
}

export default TableCategories