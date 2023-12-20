import '../../assets/scss/components/ManageUser.scss'
import { useEffect, useState } from "react";
// import ModalAddNewOrder from './ModalAddOrder';
import TableOrders from './TableOrders';
import ModalViewOrder from './ModalViewOrder';
// import ModalUpdateOrder from './ModalUpdateOrder';
// import ModalDeleteOrder from './ModalDeleteOrder';
import { getAllBills } from '../../store/apiRequest';


const ManageOrders = () => {
    const [showModalAddNewOrder, setShowModalAddNewOrder] = useState(false);
    const [listOrder, setListOrder] = useState([]);
    const [showModalUpdateOrder, setShowModalUpdateOrder] = useState(false);
    const [dataOrder, setDataOrder] = useState({});
    const [showModalViewOrder, setShowModalViewOrder] = useState(false);
    const [showModalDeleteOrder, setShowModalDeleteOrder] = useState(false);
    const [dataDeleteOrder, setDataDeleteOrder] = useState({});

    const handleClickBtnUpdate = (Order) => {
        setShowModalUpdateOrder(true);
        setDataOrder(Order);
    }

    const handleClickViewOrder = (Order) => {
        setShowModalViewOrder(true);
        setDataOrder(Order);
    }

    const handleClickBtnDelete = (OrderId) => {
        setShowModalDeleteOrder(true);
        setDataDeleteOrder(OrderId);
    }

    const fetchListOrder = async () => {
        const res = await getAllBills();
        if (res && res.data) {
            console.log(res.data.data.items);
            setListOrder(res.data.data.items);
        }
    }

    useEffect(() => {
        fetchListOrder();
    }, [])

    return (
        <div className="manage-users">
            <div className="info">
                <h1>Quản lý danh mục</h1>
                <button className="btn btn-primary" onClick={() => setShowModalAddNewOrder(true)}>Thêm mới</button>
            </div>
              {/* <ModalAddNewOrder
                show={showModalAddNewOrder}
                setShow={setShowModalAddNewOrder}
                fetchListOrder={fetchListOrder}
            />
            <ModalDeleteOrder
                show={showModalDeleteOrder}
                setShow={setShowModalDeleteOrder}
                fetchListOrder={fetchListOrder}
                OrderId={dataDeleteOrder}
            />  */}
             {/* <ModalUpdateOrder
                show={showModalUpdateOrder}
                setShow={setShowModalUpdateOrder}
                fetchListOrder={fetchListOrder}
                dataOrder={dataOrder}
            /> */}
            <ModalViewOrder
                show={showModalViewOrder}
                setShow={setShowModalViewOrder}
                dataOrder={dataOrder} 
            />  
            <TableOrders
                listOrder={listOrder}
                handleClickBtnUpdate={handleClickBtnUpdate}
                handleClickViewOrder={handleClickViewOrder}
                handleClickBtnDelete={handleClickBtnDelete}
            />
        </div>
    )
}

export default ManageOrders