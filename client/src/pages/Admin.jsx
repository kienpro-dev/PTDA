import SideBar from '../components/AdminSideBar'
import '../assets/scss/components/Admin.scss'
import { FaBars } from 'react-icons/fa'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import AdminNavBar from '../components/AdminNavBar'

const Admin = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className='admin-container'>
            <div className='admin-sidebar'>
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-main">
                <AdminNavBar/>
                <Outlet />
            </div>
        </div>
    )
}

export default Admin