import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import AllCountrys from './component/AllcountryTable';
import { RouteEnum } from './enum/RouteEnum';
import Cn from './component/test';

function App() {
 

  return (
    <>
    <Routes>
    <Route path={RouteEnum.AllCountrys} element={<AllCountrys />} />
    <Route path={RouteEnum.Test} element={<Cn />} />
    </Routes>
    </>
  )
}

export default App
