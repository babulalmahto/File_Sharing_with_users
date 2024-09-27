import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url = "http://127.0.0.8:4080";
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-component">
        <Sidebar />
        <Routes>
          <Route path='/upload' element={<Add url={url} />} />
          <Route path='/list' element={<List url={url} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App