import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Cookies from "js-cookie";
import "./FavoriesPage.scss";

const FavoriesPage = (props) => {
  const { cookie } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [favoriesList, setFavoriesList] = useState();
  const [value, setValue] = useState(false);

  const history = useHistory();

  const handleToggle = () => {
    setValue(!value);
  };

  useEffect(() => {
    if (Cookies.get("favorie") !== undefined) {
      setFavoriesList(JSON.parse(Cookies.get("favorie")));
      setIsLoading(false);
    }
  }, [cookie]);

  const handleDeleteFavories = (item) => {
    for (let i = 0; i < favoriesList.length; i++) {
      if (favoriesList[i].id === item) {
        favoriesList.splice(favoriesList[i + 1], 1);

        setFavoriesList(favoriesList);

        Cookies.set("favorie", JSON.stringify(favoriesList));
      }
    }
    handleToggle();
  };
  return isLoading ? (
    <div className="center">
      <span>Rajoutez vos favories ici !</span>
    </div>
  ) : (
    <div className="favories-page">
      <div className="page-container">
        <h1>Favoris</h1>
        <div className="favories-container">
          {favoriesList.map((favorie, index) => {
            return (
              <div key={index} className="favorie-container">
                <button className="btn-like" onClick={() => handleDeleteFavories(favorie.id)}>
                  x
                </button>

                <div
                  className="favorie-infos"
                  onClick={() => {
                    history.push({
                      pathname: `/comics/${favorie.id}`,
                      state: {
                        id: favorie._id,
                        name: favorie.name,
                      },
                    });
                  }}
                >
                  <h4>{favorie.name}</h4>

                  <img src={favorie.img + "." + favorie.extension} alt={favorie.name} />
                  <p className="open-sans description">{favorie.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FavoriesPage;
