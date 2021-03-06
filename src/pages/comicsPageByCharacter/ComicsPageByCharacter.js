import axios from "axios";
import ReactLoading from "react-loading";
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
        const response = await axios.get(`https://my-marvelsearch-app.herokuapp.com/comics/${characterId}`);
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
    <div className="center">
      <ReactLoading type="bubbles" color="#FF0000" height={300} width={150} />
    </div>
  ) : (
    <div className="comicsByCharacter-page">
      <div className="page-container">
        <h1>{`Comics of ${location.state.name}`}</h1>
        <div className="comicsByCharacter-container">
          {data.comics.map((comicByCharacter) => {
            return (
              <div key={comicByCharacter._id} className="comicByCharacter-container">
                <div className="comicByCharacter-infos">
                  <h4>{comicByCharacter.title}</h4>
                  <img
                    src={comicByCharacter.thumbnail.path + "." + comicByCharacter.thumbnail.extension}
                    alt={comicByCharacter.title}
                  />
                  <p className="open-sans description">{comicByCharacter.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ComicsByCharacter;
