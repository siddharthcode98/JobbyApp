import { Link, withRouter } from "react-router-dom";

import Cookies from "js-cookie";

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
    <nav>
      <button type="button" onClick={onClickHome}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
          alt="website logo"
        />
      </button>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/jobs">Jobs</Link>
        </li>
      </ul>
      <button type="button" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  );
};

export default withRouter(Header);
