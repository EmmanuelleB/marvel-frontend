import axios from "axios";
import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Comic from "../../composents/comic/Comic";
import "./ComicsPage.scss";
import Hulk from "../../assets/images/hulk-NB.png";
import BackgroundInput from "../../assets/images/input_marvel.png";

const Comics = (props) => {
  const { handleFavories, faHeart, faChevronRight, faChevronLeft, isHamburgerModalOpen } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const [searchComic, setSearchComic] = useState("");

  const [count, setCount] = useState();
  const [numberOfPage, setNumberOfPage] = useState(0);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://my-marvelsearch-app.herokuapp.com/comics?title=${searchComic}&page=${page}`
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
  }, [searchComic, page]);

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
      let start = Math.floor((page - 1) / numberOfPage) * numberOfPage;

      return new Array(numberOfPage).fill().map((item, index) => {
        return start + index + 1;
      });
    } else {
      let start = Math.floor((page - 1) / pageLimit) * pageLimit;

      return new Array(pageLimit).fill().map((item, index) => {
        return start + index + 1;
      });
    }
  };

  const handleSearch = (event) => {
    setSearchComic(event.target.value);
  };

  return isLoading ? (
    <div className="center">
      <ReactLoading type="bubbles" color="#FF0000" height={300} width={150} />
    </div>
  ) : (
    <div className={isHamburgerModalOpen ? "comics-page comics-page-open" : "comics-page"}>
      <div className="page-container">
        <h1>Comics</h1>

        <div className="hulk-input">
          <img className="hulk" src={Hulk} alt="Hulk" />
          <img className="backgroundInput" src={BackgroundInput} alt="BackgroundInput" />
          <input
            className="search-input"
            type="text"
            placeholder="Recherche tes comics pr??f??r??s ..."
            value={searchComic}
            onChange={handleSearch}
          />
          <div className="pagination">
            {page !== 1 && (
              <button onClick={goToPreviousPage} className="prev">
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
            )}

            {page <= numberOfPage &&
              getPaginationGroup().map((item, index) => (
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
        </div>

        <div className="comics-container">
          {data.results.map((comic) => {
            return <Comic key={comic._id} comic={comic} handleFavories={handleFavories} faHeart={faHeart} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Comics;
