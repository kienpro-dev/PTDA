import '../../assets/scss/components/ManageUser.scss'
// import ModalAddNewUser from "./ModalAddProduct";
import { useEffect, useState } from "react";
// import ModalDeleteUser from './ModalDeleteUser';
// import TableUsers from './TableUsers';
import ModalAddNewProduct from './ModalAddProduct';
import TableProducts from './TableProducts';
import ModalViewProduct from './ModalViewProduct';
import ModalUpdateProduct from './ModalUpdateProduct';
import ModalDeleteProduct from './ModalDeleteProduct';
import { getAllProducts } from '../../store/apiRequest';
// import ModalUpdateUser from './ModalUpdateUser';
// import ModalViewUser from './ModalViewUser';


const ManageProducts = () => {
    const [showModalAddNewProduct, setShowModalAddNewProduct] = useState(false);
    const [listProduct, setListProduct] = useState([]);
    const [showModalUpdateProduct, setShowModalUpdateProduct] = useState(false);
    const [dataProduct, setDataProduct] = useState({});
    const [showModalViewProduct, setShowModalViewProduct] = useState(false);
    const [showModalDeleteProduct, setShowModalDeleteProduct] = useState(false);
    const [dataDeleteProduct, setDataDeleteProduct] = useState({});

    const handleClickBtnUpdate = (product) => {
        setShowModalUpdateProduct(true);
        setDataProduct(product);
    }

    const handleClickViewProduct = (product) => {
        setShowModalViewProduct(true);
        setDataProduct(product);
    }

    const handleClickBtnDelete = (productId) => {
        setShowModalDeleteProduct(true);
        setDataDeleteProduct(productId);
    }

    const fetchListProduct = async () => {
        const res = await getAllProducts();
        if (res && res.data) {
            console.log(res.data.data.items);
            setListProduct(res.data.data.items);
        }
    }

    useEffect(() => {
        fetchListProduct();
    }, [])

    return (
        <div className="manage-users">
            <div className="info">
                <h1>Quản lý khách hàng</h1>
                <button className="btn btn-primary" onClick={() => setShowModalAddNewProduct(true)}>Thêm mới</button>
            </div>
             <ModalAddNewProduct
                show={showModalAddNewProduct}
                setShow={setShowModalAddNewProduct}
                fetchListProduct={fetchListProduct}
            />
            <ModalDeleteProduct
                show={showModalDeleteProduct}
                setShow={setShowModalDeleteProduct}
                fetchListProduct={fetchListProduct}
                productId={dataDeleteProduct}
            />
            <ModalUpdateProduct
                show={showModalUpdateProduct}
                setShow={setShowModalUpdateProduct}
                fetchListProduct={fetchListProduct}
                dataProduct={dataProduct}
            />
            <ModalViewProduct
                show={showModalViewProduct}
                setShow={setShowModalViewProduct}
                dataProduct={dataProduct}
            /> 
            <TableProducts
                listProduct={listProduct}
                handleClickBtnUpdate={handleClickBtnUpdate}
                handleClickViewProduct={handleClickViewProduct}
                handleClickBtnDelete={handleClickBtnDelete}
            />
        </div>
    )
}

export default ManageProducts