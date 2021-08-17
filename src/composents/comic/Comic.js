import "./Comic.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comic = (props) => {
  const { comic, handleFavories, faHeart } = props;

  return (
    <>
      <div className="comic-container">
        <button
          className="btn-like"
          onClick={() => {
            handleFavories(comic);
          }}
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <div className="comic-infos">
          <h4>{comic.title}</h4>
          <img src={comic.thumbnail.path + "." + comic.thumbnail.extension} alt={comic.title} />
          <p className="open-sans description">{comic.description}</p>
        </div>
      </div>
    </>
  );
};

export default Comic;
