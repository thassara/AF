import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import AllCountrys from './component/AllcountryTable';
import { RouteEnum } from './enum/RouteEnum';
import CountryDashboard from './component/CountryDashboard';

function App() {
 

  return (
    <>
    <Routes>
    <Route path={RouteEnum.AllCountrys} element={<AllCountrys />} />
    <Route path={RouteEnum.Contry} element={<CountryDashboard />} />
   
    </Routes>
    </>
  )
}

export default App
