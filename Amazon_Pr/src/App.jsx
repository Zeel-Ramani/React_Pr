import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './Components/Header/Header'
import Home from './Components/Home/Home'
import ProductDetails from './Components/Product/ProductDetails'
import Cart from './Components/Cart/Cart'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import Footer from './Components/Common/Footer'
import './App.css'

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App