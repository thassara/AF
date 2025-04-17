import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import AllCountrys from './component/AllcountryTable';
import { RouteEnum } from './enum/RouteEnum';

function App() {
 

  return (
    <>
    <Routes>
    <Route path={RouteEnum.AllCountrys} element={<AllCountrys />} />
    </Routes>
    </>
  )
}

export default App
