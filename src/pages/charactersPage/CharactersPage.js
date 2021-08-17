import axios from "axios";
import { useEffect, useState } from "react";
// import { useLocation, Link } from "react-router-dom";
import Character from "../../composents/character/Character";
import { useDebounce } from "use-debounce";

import "./CharactersPage.scss";
const Characters = (props) => {
  const { faHeart, handleFavories } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const [searchCharacter, setSearchCharacter] = useState("");
  const [debouncedSearch] = useDebounce(searchCharacter, 1000);

  const [count, setCount] = useState();
  const [page, setPage] = useState(1);

  const handleChangePage = (page) => {
    setPage(page);
  };

  //   const location = useLocation();
  //   const page = location.search.substr(location.search.length - 1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/characters?name=${searchCharacter}&page=${page}`);
        setData(response.data);
        setCount(response.data.count);
        setIsLoading(false);
      } catch (event) {
        alert("An error occurred");
      }
    };
    fetchData();
  }, [searchCharacter, page]);

  // console.log(data);
  let pagination = [];

  const numberOfPage = Math.ceil(count / 100);
  for (let i = 0; i < numberOfPage; i++) {
    pagination.push(
      <div key={i} onClick={() => handleChangePage(i + 1)}>
        {i + 1}
      </div>
      // <Link key={i} to={`?page=${i + 1}`}>
      //   {i + 1}
      // </Link>
    );
  }

  const handleSearch = (event) => {
    setSearchCharacter(event.target.value);
  };

  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <div className="characters-page">
      <div className="page-container">
        <h1>Characters</h1>

        <input
          className="search-input"
          type="text"
          placeholder="Recherche tes personnages préférés ..."
          value={debouncedSearch}
          onChange={handleSearch}
        />
        <div className="pagination">{pagination}</div>
        <div className="characters-container">
          {data.results.map((character) => {
            return (
              <>
                <Character
                  key={character._id}
                  character={character}
                  faHeart={faHeart}
                  handleFavories={handleFavories}
                />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Characters;
