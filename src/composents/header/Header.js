import "./Header.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import ModalHamburger from "../modalHamburger/ModalHamburger";

const Header = (props) => {
  const { faBars, faTimes, isHamburgerModalOpen, handleOpenHamburgerModal, handleCloseHamburgerModal } = props;
  return (
    <>
      <Modal
        isOpen={isHamburgerModalOpen}
        handleCloseLoginModal={handleCloseHamburgerModal}
        ariaHideApp={false}
        overlayClassName="overlayP"
        className="modalP"
      >
        <ModalHamburger handleCloseHamburgerModal={handleCloseHamburgerModal} />
      </Modal>
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
          {isHamburgerModalOpen ? (
            <FontAwesomeIcon icon="times" className="icon-bars" onClick={handleCloseHamburgerModal} />
          ) : (
            <FontAwesomeIcon icon="bars" className="icon-bars" onClick={handleOpenHamburgerModal} />
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
