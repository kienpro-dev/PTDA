import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import MainHome from '../components/homeUser/MainHome';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import { getCurrentUserLogin, getProductInCart } from '../store/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, setCartId1 } from '../store/cartSlice';

const Home = () => {
  const [cartItem, setCartItem] = useState({});

  const [cartId, setCartId] = useState(null);
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const findCartId = async () => {
    // let storedCartId = localStorage.getItem("cartId");
    // if (storedCartId) {
    //   setCartId(storedCartId);
    //   fetchItemInCart();
    // } else {

    const resCur = await getCurrentUserLogin();
    const customerId = resCur.data.data.customerId;
    localStorage.setItem("cartId", customerId);
    setCartId(customerId);
    fetchItemInCart();
    // }
  };

  const fetchItemInCart = async () => {
    if (cartId !== null) {
      console.log("cartId: ", cartId);
      const res = await getProductInCart(cartId);
      setCartItem(res.data.data);
      localStorage.setItem("cartItems", JSON.stringify(res.data.data));
    }
  };

  useEffect(() => {
    findCartId();
  }, []);

  useEffect(() => {
    fetchItemInCart();
  }, [cartId]);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [cartId]);

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Home;