import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <Link to="/" className="brand">thefashionspot</Link>
        <nav className="topNav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `tab ${isActive ? "tab-active" : ""}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/forums"
            className={({ isActive }) => `tab ${isActive ? "tab-active" : ""}`}
          >
            Forums
          </NavLink>
        </nav>
      </div>

      <div className="header-right">
        {!user ? (
          <>
            <Link to="/login" className="btn btn-login">Log in</Link>
            <Link to="/register" className="btn btn-register">Register</Link>
            <button className="icon-btn">🔍</button>
          </>
        ) : (
          <>
            <span style={{ fontSize: 13 }}>
              Signed in as <strong>{user.userName}</strong>
            </span>
            <button className="btn" onClick={handleLogout}>Log out</button>
          </>
        )}
      </div>
    </header>
  );
}
