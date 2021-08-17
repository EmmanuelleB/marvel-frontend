import "./Header.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const Header = () => {
  return (
    <header>
      <div className="page-container">
        <Link to="/characters">
          <img src={logo} alt="logo Marvel" />
        </Link>

        <div>
          <Link to="/characters">Characters</Link>
          <Link to="/comics">Comics</Link>
          <Link to="/favories">Favories</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
