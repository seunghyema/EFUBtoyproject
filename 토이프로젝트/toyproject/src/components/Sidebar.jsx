import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function XLogo() {
  return (
    <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.213 5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
      <path d="M12 1.696 1.622 8.807l1.06 1.696L4 9.679V19.5C4 20.88 5.12 22 6.5 22h11c1.38 0 2.5-1.12 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696z" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
      <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.318.65-4.404 1.81C6.674 15.79 5.988 17.2 5.651 19zM12 11c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
    </svg>
  );
}

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <XLogo />
      </div>

      <ul className="sidebar-nav">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <HomeIcon />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <ProfileIcon />
            <span>Profile</span>
          </NavLink>
        </li>
      </ul>

      <button className="sidebar-post-btn" type="button">
        Post
      </button>

      <div className="sidebar-user">
        <img
          src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=120&q=80"
          alt="마승혜 avatar"
        />
        <div>
          <strong>마승혜</strong>
          <span>@efub_toy</span>
        </div>
      </div>
    </nav>
  );
}
