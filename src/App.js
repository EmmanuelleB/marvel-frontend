import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Header from "./composents/header/Header";
import CharactersPage from "./pages/charactersPage/CharactersPage";
import ComicsPage from "./pages/comicsPage/ComicsPage";
import ComicsPageByCharacter from "./pages/comicsPageByCharacter/ComicsPageByCharacter";
import FavoriesPage from "./pages/favoriesPage/FavoriesPage";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";

library.add(faHeart, faBars);

function App() {
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
      console.log("boucle1");

      Cookies.set("favorie", JSON.stringify(favorieItem));
      cookie = Cookies.get("favorie");
      // console.log("cookie =>> " + cookie);
    } else {
      console.log("boucle2");
      newFavorie = JSON.parse(cookie);
      console.log(newFavorie);
      console.log(favorieItemMore.id);
      for (let i = 0; i < newFavorie.length; i++) {
        if (newFavorie[i].id.indexOf(favorieItemMore.id) !== -1) {
          alert("Attention votre favorie est déjà enregisté !");
        }
      }
      newFavorie.push(favorieItemMore);

      newFavorieString = JSON.stringify(newFavorie);

      Cookies.set("favorie", newFavorieString);
      cookie = Cookies.get("favorie");
      // console.log("cookie =>> " + cookie);
    }
  };

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/characters">
          <CharactersPage faHeart={faHeart} handleFavories={handleFavories} />
        </Route>
        <Route path="/comics/:characterId">
          <ComicsPageByCharacter />
        </Route>
        <Route path="/comics">
          <ComicsPage faHeart={faHeart} />
        </Route>
        <Route path="/favories">
          <FavoriesPage cookie={cookie} />
        </Route>
        <Route path="/">
          <Homepage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
