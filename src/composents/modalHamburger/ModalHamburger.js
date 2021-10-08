import "./ModalHamburger.scss";
import { Link } from "react-router-dom";
const ModalHamburger = (props) => {
  const { handleOpenLoginModal, handleCloseHamburgerModal } = props;
  return (
    <div className="modal">
      <div className="page-container">
        <div className="menuForm">
          <Link to="/characters">
            <p>Characters</p>
          </Link>
          <Link to="/comics">
            <p>Comics</p>
          </Link>

          <Link to="/favories">
            <p>Favoris</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModalHamburger;
