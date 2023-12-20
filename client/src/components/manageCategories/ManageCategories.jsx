import '../../assets/scss/components/ManageUser.scss'
import { useEffect, useState } from "react";
import ModalAddNewCategory from './ModalAddCategory';
import TableCategories from './TableCategories';
import ModalViewCategory from './ModalViewCategory';
import ModalUpdateCategory from './ModalUpdateCategory';
import ModalDeleteCategory from './ModalDeleteCategory';
import { getAllCategories } from '../../store/apiRequest';


const ManageCategories = () => {
    const [showModalAddNewCategory, setShowModalAddNewCategory] = useState(false);
    const [listCategory, setListCategory] = useState([]);
    const [showModalUpdateCategory, setShowModalUpdateCategory] = useState(false);
    const [dataCategory, setDataCategory] = useState({});
    const [showModalViewCategory, setShowModalViewCategory] = useState(false);
    const [showModalDeleteCategory, setShowModalDeleteCategory] = useState(false);
    const [dataDeleteCategory, setDataDeleteCategory] = useState({});

    const handleClickBtnUpdate = (Category) => {
        setShowModalUpdateCategory(true);
        setDataCategory(Category);
    }

    const handleClickViewCategory = (Category) => {
        setShowModalViewCategory(true);
        setDataCategory(Category);
    }

    const handleClickBtnDelete = (CategoryId) => {
        setShowModalDeleteCategory(true);
        setDataDeleteCategory(CategoryId);
    }

    const fetchListCategory = async () => {
        const res = await getAllCategories();
        if (res && res.data) {
            console.log(res.data.data, "hello");
            setListCategory(res.data.data);
        }
    }

    useEffect(() => {
        fetchListCategory();
    }, [])

    return (
        <div className="manage-users">
            <div className="info">
                <h1>Quản lý danh mục</h1>
                <button className="btn btn-primary" onClick={() => setShowModalAddNewCategory(true)}>Thêm mới</button>
            </div>
              <ModalAddNewCategory
                show={showModalAddNewCategory}
                setShow={setShowModalAddNewCategory}
                fetchListCategory={fetchListCategory}
            />
            <ModalDeleteCategory
                show={showModalDeleteCategory}
                setShow={setShowModalDeleteCategory}
                fetchListCategory={fetchListCategory}
                categoryId={dataDeleteCategory}
            /> 
             <ModalUpdateCategory
                show={showModalUpdateCategory}
                setShow={setShowModalUpdateCategory}
                fetchListCategory={fetchListCategory}
                dataCategory={dataCategory}
            />
            <ModalViewCategory
                show={showModalViewCategory}
                setShow={setShowModalViewCategory}
                dataCategory={dataCategory} 
            />  
            <TableCategories
                listCategory={listCategory}
                handleClickBtnUpdate={handleClickBtnUpdate}
                handleClickViewCategory={handleClickViewCategory}
                handleClickBtnDelete={handleClickBtnDelete}
            />
        </div>
    )
}

export default ManageCategories