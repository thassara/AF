
import { Routes, Route, Navigate } from "react-router-dom";
import AllCountrys from './pages/AllcountryTable';
import CountryDashboard from './pages/CountryDashboard';
import Login from './pages/Login';
import { RouteEnum } from './enum/RouteEnum';
import { useAuth } from "./controller/AuthContext";

import { Navbar } from './components/Navbar';

function App() {
  const { isLoggedIn } = useAuth();

  return (
   
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        {isLoggedIn && <Navbar />}
       
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
       
      </div>
   
  );
}

export default App;
