import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import("./ComicsPageByCharacter.scss");
const ComicsByCharacter = () => {
  const { characterId } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://my-marvelsearch-app.herokuapp.com/${characterId}`);
        setData(response.data);
        setIsLoading(false);
      } catch (event) {
        alert("An error occurred");
      }
    };
    fetchData();
  }, [characterId]);

  const location = useLocation();
  console.log(location);

  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <div className="comicsByCharacter-page">
      <div className="page-container">
        <h1>{`Comics of ${location.state.name}`}</h1>
        <div className="comicsByCharacter-container">
          {data.comics.map((comicByCharacter) => {
            return (
              <div key={comicByCharacter._id} className="comicByCharacter-container">
                <h4>{comicByCharacter.title}</h4>
                <img
                  src={comicByCharacter.thumbnail.path + "." + comicByCharacter.thumbnail.extension}
                  alt={comicByCharacter.title}
                />
                <p className="open-sans description">{comicByCharacter.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ComicsByCharacter;
