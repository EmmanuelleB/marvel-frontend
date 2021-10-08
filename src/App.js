import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Header from "./composents/header/Header";
import CharactersPage from "./pages/charactersPage/CharactersPage";
import ComicsPage from "./pages/comicsPage/ComicsPage";
import ComicsPageByCharacter from "./pages/comicsPageByCharacter/ComicsPageByCharacter";
import FavoriesPage from "./pages/favoriesPage/FavoriesPage";
import Footer from "./composents/footer/Footer";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faBars, faTimes, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { useState } from "react";

library.add(faHeart, faBars, faTimes, faChevronRight, faChevronLeft);

function App() {
  //MODAL
  const [isHamburgerModalOpen, setIsHamburgerModalOpen] = useState(false);

  const handleOpenHamburgerModal = () => {
    setIsHamburgerModalOpen(true);
  };
  const handleCloseHamburgerModal = () => {
    setIsHamburgerModalOpen(false);
  };

  let cookie = Cookies.get("favorie");
  const handleFavories = (item) => {
    let newFavorie;
    let newFavorieString;

    let favorieItem = [
      {
        id: item._id,
        name: item.name,
        description: item.description,
        img: item.thumbnail.path,
        extension: item.thumbnail.extension,
      },
    ];
    let favorieItemMore = {
      id: item._id,
      name: item.name,
      description: item.description,
      img: item.thumbnail.path,
      extension: item.thumbnail.extension,
    };

    if (Cookies.get("favorie") === undefined) {
      Cookies.set("favorie", JSON.stringify(favorieItem));
      cookie = Cookies.get("favorie");
    } else {
      newFavorie = JSON.parse(cookie);

      for (let i = 0; i < newFavorie.length; i++) {
        if (newFavorie[i].id.indexOf(favorieItemMore.id) !== -1) {
          alert("Attention votre favorie est déjà enregisté !");
        }
      }
      newFavorie.push(favorieItemMore);

      newFavorieString = JSON.stringify(newFavorie);

      Cookies.set("favorie", newFavorieString);
      cookie = Cookies.get("favorie");
    }
  };

  return (
    <Router>
      <Header
        faBars={faBars}
        faTimes={faTimes}
        isHamburgerModalOpen={isHamburgerModalOpen}
        handleCloseHamburgerModal={handleCloseHamburgerModal}
        handleOpenHamburgerModal={handleOpenHamburgerModal}
      />
      <Switch>
        <Route path="/characters">
          <CharactersPage
            faHeart={faHeart}
            handleFavories={handleFavories}
            faChevronRight={faChevronRight}
            faChevronLeft={faChevronLeft}
            isHamburgerModalOpen={isHamburgerModalOpen}
          />
        </Route>
        <Route path="/comics/:characterId">
          <ComicsPageByCharacter />
        </Route>
        <Route path="/comics">
          <ComicsPage
            faHeart={faHeart}
            faChevronRight={faChevronRight}
            faChevronLeft={faChevronLeft}
            isHamburgerModalOpen={isHamburgerModalOpen}
          />
        </Route>
        <Route path="/favories">
          <FavoriesPage cookie={cookie} isHamburgerModalOpen={isHamburgerModalOpen} />
        </Route>
        <Route path="/">
          <Homepage />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
