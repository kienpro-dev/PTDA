// import Home from "./pages/Home"
// import Contact from "./pages/Contact"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LayoutPage from "./layouts/LayoutPage";
import Card from "./components/Card";
import Food from "./components/Food";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SideBar from "./components/AdminSideBar";
import Admin from "./pages/Admin";
import HorizontalCard from "./components/HorizontalCard";
import Search from "./components/Search";
import SlideShow from "./components/SlideShow";
import Category from "./components/homeUser/Category";
import Cart from "./pages/Cart";
import DetailProduct from "./pages/DetailProduct";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Order from "./pages/Order";
import OrderHistory from "./pages/OrderHistory";
import Register from "./pages/Register";
import UserInfor from "./pages/UserInfor";
import ForgotPassword from "./pages/ForgotPassword";
import MainHome from './components/homeUser/MainHome';
import DashBoard from './components/DashBoard';
import ManageUsers from './components/manageUser/ManageUsers';
import ManageProducts from './components/manageProducts/ManageProducts';
import ManageOrders from './components/manageOrders/ManageOrders';
import ManageCategories from './components/manageCategories/ManageCategories'
import ManageShops from './components/manageShops/ManageShops'
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import PurchaseOrder from './pages/PurchaseOrder';
import Shop from './pages/Shop';
import MyOrder from './pages/MyOrder';



function App() {
  return (

    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path='' element={<MainHome />} />
          <Route path='order' element={<Order />} />
          <Route path="search" element={<Search />} />
          <Route path="infor" element={<UserInfor />} />
          <Route path="/purchaseorder" element={<PurchaseOrder />} >
            <Route index element={<MyOrder />} />
            <Route path='/purchaseorder/myorder' element={<MyOrder />} />
            <Route path='/purchaseorder/orderhistory' element={<OrderHistory />} />
            <Route path="/purchaseorder/infor" element={<UserInfor />} />
          </Route>
          <Route path="shop/:idShop" element={<Shop />} />
          <Route path="shop/:idShop/product/:idProduct" element={<DetailProduct />} />
        </Route>
        <Route path="cart" element={<Cart />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/admin" element={<Admin></Admin>}>
          <Route index element={<DashBoard />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/products" element={<ManageProducts />} />
          <Route path="/admin/orders" element={<ManageOrders />} />
          <Route path="/admin/categories" element={<ManageCategories />} />
          <Route path="/admin/shops" element={<ManageShops />} />
        </Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      {/* <TestCount/> */}
      {/*<TestCount2/> */}
    </div>
  )
}

export default App