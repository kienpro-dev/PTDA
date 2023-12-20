import admin from '../assets/images/adminAvatar.jpg'
import '../assets/scss/components/AdminNavBar.scss'
import { useNavigate } from 'react-router'

const AdminNavBar = () => {
  const navigate = useNavigate();
  return (
    <div className='admin-navbar'>
        <span onClick={() => navigate("/")}>Trang chủ</span>
        <span onClick={() => navigate("/")}>Đăng xuất</span>
        <div className='admin-infor'>
            <img src={admin}/>
        </div>
    </div>
  )
}

export default AdminNavBar