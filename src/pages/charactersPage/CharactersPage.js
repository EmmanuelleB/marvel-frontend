import axios from "axios";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Character from "../../composents/character/Character";
import { useDebounce } from "use-debounce";

import "./CharactersPage.scss";
const Characters = (props) => {
  const { faHeart, handleFavories, faChevronRight, faChevronLeft } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const [searchCharacter, setSearchCharacter] = useState("");
  // const [debouncedSearch] = useDebounce(searchCharacter, 1000);

  const [count, setCount] = useState();
  const [numberOfPage, setNumberOfPage] = useState(0);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://my-marvelsearch-app.herokuapp.com/characters?name=${searchCharacter}&page=${page}`
        );
        setData(response.data);
        setCount(response.data.count);
        setNumberOfPage(Math.ceil(response.data.count / 100));

        setIsLoading(false);
      } catch (event) {
        alert("An error occurred");
      }
    };
    fetchData();
  }, [searchCharacter, page]);

  const goToNextPage = () => {
    setPage((page) => page + 1);
  };

  const goToPreviousPage = () => {
    setPage((page) => page - 1);
  };

  const changePage = (event) => {
    let pageNumber = Number(event.target.textContent);
    setPage(pageNumber);
  };

  const getPaginationGroup = () => {
    if (numberOfPage < pageLimit) {
      setPageLimit(numberOfPage);
    }
    let start = Math.floor((page - 1) / pageLimit) * pageLimit;

    return new Array(pageLimit).fill().map((item, index) => {
      return start + index + 1;
    });
  };

  const handleSearch = (event) => {
    setSearchCharacter(event.target.value);
  };

  return isLoading ? (
    <div className="center">
      <ReactLoading type="bubbles" color="#FF0000" height={300} width={150} />
    </div>
  ) : (
    <div className="characters-page">
      <div className="page-container">
        <h1>Characters</h1>

        <input
          className="search-input"
          type="text"
          placeholder="Recherche tes personnages préférés ..."
          value={searchCharacter}
          // value={debouncedSearch}
          onChange={handleSearch}
        />
        <div className="paginationTwo">
          {page !== 1 && (
            <button onClick={goToPreviousPage} className="prev">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          )}

          {getPaginationGroup().map((item, index) => (
            <button key={index} onClick={changePage} className={`btn ${page === item ? "active" : null}`}>
              <span>{item}</span>
            </button>
          ))}
          {page !== numberOfPage && (
            <button onClick={goToNextPage} className="next">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          )}
        </div>
        <div className="characters-container">
          {data.results.map((character) => {
            return (
              <Character key={character._id} character={character} faHeart={faHeart} handleFavories={handleFavories} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Characters;
