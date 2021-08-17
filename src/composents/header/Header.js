import "./Header.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  return (
    <header>
      <div className="page-container">
        <Link to="/">
          <img src={logo} alt="logo Marvel" />
        </Link>

        <div className="link-container">
          <Link to="/characters">Characters</Link>
          <Link to="/comics">Comics</Link>
          <Link to="/favories">Favoris</Link>
        </div>
        <FontAwesomeIcon icon="bars" className="icon-bars" />
      </div>
    </header>
  );
};

export default Header;
