import { Link, withRouter } from "react-router-dom";

import Cookies from "js-cookie";

import "./index.css";

const Header = (props) => {
  const { history } = props;
  const onClickLogout = () => {
    Cookies.remove("jwt_token");
    history.replace("/login");
  };
  const onClickHome = () => {
    history.replace("/");
  };
  return (
    <header className="nav-container">
      <nav className="nav-bar">
        <button type="button" onClick={onClickHome} className="logoBtn">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
          />
        </button>

        <ul>
          <li>
            <Link to="/" className="header-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="header-link">
              Jobs
            </Link>
          </li>
        </ul>
        <button type="button" onClick={onClickLogout} className="logoutBtn">
          Logout
        </button>
      </nav>
    </header>
  );
};

export default withRouter(Header);
