import React from "react";
import { useAuth } from "../controller/AuthContext";

const Header: React.FC = () => {
  const { user, logout, isLoggedIn } = useAuth();

  return (
    <header>
      {isLoggedIn ? (
        <>
          <span>Welcome, {user?.username}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <span>Please log in</span>
      )}
    </header>
  );
};

export default Header;
