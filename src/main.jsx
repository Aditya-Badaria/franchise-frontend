import React, { useState } from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './index.css';

import { Fragment } from 'react';
import Curd from './components/axioss/Curd';
import ApplicationsTable from './components/axioss/Applications';
import LoginDash from './components/axioss/Login-dash';
import Login from './components/axioss/Login';
import LandingPage from "./components/axioss/LandingPage";
import Logout from "./components/axioss/Logout";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [user, setUser] = useState(null); // ✅ Manage user state

 return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/dashboard/*" element={user ? <LoginDash user={user} /> : <Navigate to="/login" replace />} />
        <Route path="/curd" element={<Curd />} />
        <Route path="/applications" element={<ApplicationsTable />} />
        <Route path="/logout" element={<Logout />} />
         {/* <ToastContainer /> */}
        {/* Add other routes as needed */}
      </Routes>
    </BrowserRouter>
  );
};



const root=ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Fragment>
      {/* <App />*/}
      {/* <App></App> */}
      
      {/* <Curd></Curd> */}
      {/* <ApplicationsTable></ApplicationsTable> */}
      {/* <Curd></Curd> */}
      {/* <Dashbord></Dashbord> */}
      {/* <LoginDash></LoginDash> */}
        {/* <BrowserRouter>
            <LoginDash></LoginDash>
        </BrowserRouter> */}
         {/* <LandingPage></LandingPage> */}


          {/* <React.StrictMode>
            <BrowserRouter>
              <LandingPage />
            </BrowserRouter>
          </React.StrictMode> */}


             <React.StrictMode>
                <App />
            </React.StrictMode>

    </Fragment>
    // <App></App>


      
    
  )
