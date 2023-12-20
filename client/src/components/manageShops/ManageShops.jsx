import '../../assets/scss/components/ManageUser.scss'
import { useEffect, useState } from "react";
import ModalAddNewShop from './ModalAddShop';
import TableShops from './TableShops';
import ModalViewShop from './ModalViewShop';
import ModalUpdateShop from './ModalUpdateShop';
import ModalDeleteShop from './ModalDeleteShop';
import { getAllShops } from '../../store/apiRequest';


const ManageShops = () => {
    const [showModalAddNewShop, setShowModalAddNewShop] = useState(false);
    const [listShop, setListShop] = useState([]);
    const [showModalUpdateShop, setShowModalUpdateShop] = useState(false);
    const [dataShop, setDataShop] = useState({});
    const [showModalViewShop, setShowModalViewShop] = useState(false);
    const [showModalDeleteShop, setShowModalDeleteShop] = useState(false);
    const [dataDeleteShop, setDataDeleteShop] = useState({});

    const handleClickBtnUpdate = (shop) => {
        setShowModalUpdateShop(true);
        setDataShop(shop);
    }

    const handleClickViewShop = (Shop) => {
        setShowModalViewShop(true);
        setDataShop(Shop);
    }

    const handleClickBtnDelete = (shop) => {
        setShowModalDeleteShop(true);
        setDataDeleteShop(shop);
    }

    const fetchListShop = async () => {
        const res = await getAllShops();
        if (res && res.data) {
            console.log(res.data.data.items);
            setListShop(res.data.data.items);
        }
    }

    useEffect(() => {
        fetchListShop();
    }, [])

    return (
        <div className="manage-users">
            <div className="info">
                <h1>Quản lý cửa hàng</h1>
                <button className="btn btn-primary" onClick={() => setShowModalAddNewShop(true)}>Thêm mới</button>
            </div>
              <ModalAddNewShop
                show={showModalAddNewShop}
                setShow={setShowModalAddNewShop}
                fetchListShop={fetchListShop}
            />
            <ModalDeleteShop
                show={showModalDeleteShop}
                setShow={setShowModalDeleteShop}
                fetchListShop={fetchListShop}
                shopId={dataDeleteShop}
            /> 
             <ModalUpdateShop
                show={showModalUpdateShop}
                setShow={setShowModalUpdateShop}
                fetchListShop={fetchListShop}
                dataShop={dataShop}
            />
            <ModalViewShop
                show={showModalViewShop}
                setShow={setShowModalViewShop}
                dataShop={dataShop} 
            />  
            <TableShops
                listShop={listShop}
                handleClickBtnUpdate={handleClickBtnUpdate}
                handleClickViewShop={handleClickViewShop}
                handleClickBtnDelete={handleClickBtnDelete}
            />
        </div>
    )
}

export default ManageShops