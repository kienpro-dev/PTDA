import momo from '../../assets/images/momo.png'
import AdminDataTable from "../AdminDataTable";
import '../../assets/scss/components/ManageUser.scss'
import ModalAddNewUser from "./ModalAddNewUser";
import { useEffect, useState } from "react";
import Button from "../Button";
import ModalDeleteUser from './ModalDeleteUser';
import TableUsers from './TableUsers';
import { getCardMediaUtilityClass } from '@mui/material';
import { getAllCustomers, getAllUsers } from '../../store/apiRequest';
import ModalUpdateUser from './ModalUpdateUser';
import ModalViewUser from './ModalViewUser';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'avatar',
        headerName: 'Ảnh',
        width: 150,
        renderCell: (params) => {
            return <img src={params.row.img || momo} alt="st" />
        }
    },
    {
        field: 'firstName',
        headerName: 'Họ',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Tên',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Tuổi',
        width: 110,
        editable: true,
    },
    {
        field: 'phone',
        headerName: 'Điện thoại',
        width: 200,
        editable: true,
    },

];
const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, phone: '012342983' },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, phone: '012342983' },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, phone: '012342983' },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, phone: '012342983' },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, phone: '012342983' },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150, phone: '012342983' },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, phone: '012342983' },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, phone: '012342983' },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, phone: '012342983' },
];

// const listUser1 = [
//     {
//         id: 1,
//         username: "minhanh",
//         email: "minhanh@gmail.com"
//     },
//     {
//         id: 2,
//         username: "minhanh",
//         email: "minhanh@gmail.com"
//     },
//     {
//         id: 3,
//         username: "minhanh",
//         email: "minhanh@gmail.com"
//     }
// ]
const ManageUsers = () => {
    const [showModalAddNewUser, setShowModalAddNewUser] = useState(false);
    const [listUser, setListUser] = useState([]);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [dataUser, setDataUser] = useState({});
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataDeleteUser, setDataDeleteUser] = useState({});

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUser(user);
    }

    const handleClickViewUser = (user) => {
        setShowModalViewUser(true);
        setDataUser(user);
    }

    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true);
        setDataDeleteUser(user);
    }

    const fetchListUser = async () => {
        const res = await getAllCustomers();
        if (res && res.data) {
            console.log(res.data.data.items);
            setListUser(res.data.data.items);
        }
    }

    useEffect(() => {
        fetchListUser();
    }, [])

    return (
        <div className="manage-users">
            <div className="info">
                <h1>Quản lý khách hàng</h1>
                <button className="btn btn-primary" onClick={() => setShowModalAddNewUser(true)}>Thêm mới</button>
            </div>
            <ModalAddNewUser
                show={showModalAddNewUser}
                setShow={setShowModalAddNewUser}
                fetchListUser={fetchListUser}
            />
            <ModalDeleteUser
                show={showModalDeleteUser}
                setShow={setShowModalDeleteUser}
                fetchListUser={fetchListUser}
                userId={dataDeleteUser}
            />
            <ModalUpdateUser
                show={showModalUpdateUser}
                setShow={setShowModalUpdateUser}
                fetchListUser={fetchListUser}
                dataUser={dataUser}
            />
            <ModalViewUser
                show={showModalViewUser}
                setShow={setShowModalViewUser}
                dataUser={dataUser}
            />
            <TableUsers
                listUser={listUser}
                handleClickBtnUpdate={handleClickBtnUpdate}
                handleClickViewUser={handleClickViewUser}
                handleClickBtnDelete={handleClickBtnDelete}
            />
        </div>
    )
}

export default ManageUsers