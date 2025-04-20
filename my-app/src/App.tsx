import { Routes, Route, Navigate } from "react-router-dom";
import AllCountrys from './pages/AllcountryTable';
import { RouteEnum } from './enum/RouteEnum';
import CountryDashboard from './pages/CountryDashboard';
import { useAuth } from "./controller/AuthContext";
import Login from './pages/Login';

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
    
      <Route path="/" element={isLoggedIn ? <Navigate to={RouteEnum.AllCountrys} /> : <Login />} />

     
      {isLoggedIn && (
        <>
          <Route path={RouteEnum.AllCountrys} element={<AllCountrys />} />
          <Route path={RouteEnum.Contry} element={<CountryDashboard />} />
        </>
      )}

      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
