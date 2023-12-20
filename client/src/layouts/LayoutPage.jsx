import React from 'react'
import Header from '../modules/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../modules/Footer'

const LayoutPage = () => {
  return (
    <div>
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default LayoutPage