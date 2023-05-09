import React from 'react'
import { Route, Routes } from "react-router-dom";
import SignUpAndSignIn from './pages/Registration Page/SignUpAndSignIn';
import Home from './pages/Home/Home';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUpAndSignIn />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App