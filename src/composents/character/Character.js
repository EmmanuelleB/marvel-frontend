import "./Character.scss";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Character = (props) => {
  const { character, faHeart, handleFavories } = props;
  // const [button, setButton] = useState(false);
  const history = useHistory();

  return (
    <div className="character-container">
      <button
        className="btn-like"
        // className={button ? "btn-like btn-like-yellow" : "btn-like btn-like-black"}
        onClick={() => {
          handleFavories(character);
        }}
      >
        <FontAwesomeIcon icon={faHeart} />
      </button>

      {/* <Link to={`/comics/${character._id}`}> */}
      <div
        className="character-infos"
        onClick={() => {
          history.push({
            pathname: `/comics/${character._id}`,
            state: {
              id: character._id,
              name: character.name,
            },
          });
        }}
      >
        <h4>{character.name}</h4>
        <img src={character.thumbnail.path + "." + character.thumbnail.extension} alt={character.name} />
        <p className="open-sans">{character.description}</p>
      </div>
      {/* </Link> */}
    </div>
  );
};

export default Character;
