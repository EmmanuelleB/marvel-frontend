import axios from "axios";
import { useState, useEffect } from "react";
import Comic from "../../composents/comic/Comic";
import { useDebounce } from "use-debounce";
import "./ComicsPage.scss";

const Comics = (props) => {
  const { handleFavories, faHeart } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const [searchComic, setSearchComic] = useState("");
  const [debouncedSearch] = useDebounce(searchComic, 1000);

  const [count, setCount] = useState();
  const [page, setPage] = useState(1);

  const handleChangePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://my-marvelsearch-app.herokuapp.com/comics?title=${searchComic}&page=${page}`
        );
        setData(response.data);
        setCount(response.data.count);
        setIsLoading(false);
      } catch (event) {
        alert("An error occurred");
      }
    };
    fetchData();
  }, [searchComic, page]);

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
    setSearchComic(event.target.value);
  };
  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <div className="comics-page">
      <div className="page-container">
        <h1>Comics</h1>
        <input
          className="search-input"
          type="text"
          placeholder="Recherche tes comics préférés ..."
          value={debouncedSearch}
          onChange={handleSearch}
        />
        <div className="pagination">{pagination}</div>
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
