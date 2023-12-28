import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Favourites, Search, SearchResult } from "./components/Navbar";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Modal from "./components/Modal";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectId, setSelectId] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`
        );
        setCharacters(data.results.slice(0, 4));
      } catch (err) {
        setCharacters([]);
        toast.error(err.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }

    // if (query.length < 3) {
    //   setCharacters([]);
    //   return;
    // }

    fetchData();
  }, [query]);

  useEffect(() => {
    const intrval = setInterval(() => setCount((c) => c + 1), 1000);

    return () => {
      clearInterval(intrval);
    };
  }, [count]);

  // clean up function
  // whatt?
  // why to use ?
  // when run ?
  // 1.unMount component
  // 2.before the next re-render ( between re-render )
  // where to use ?
  // effect => after unMount or while re-rendering
  // Example :
  //  fetch API , timer , eventListener , ...

  const onSelectCharacter = (id) => {
    setSelectId((prevId) => (prevId === id ? null : id));
  };

  const HandleAddFavourite = (char) => {
    // setFavourites([...favourites, char]); // fisrt way

    setFavourites((prevId) => [...prevId, char]); // second way and best way
  };

  const HandleDeleteFavourite = (id) => {
    setFavourites((prevFav) => prevFav.filter((fav) => fav.id !== id));
  };

  const isAddToFavourite = favourites.map((fav) => fav.id).includes(selectId);

  return (
    <div className="App">
      {/* <div style={{ color: "#fff" }}>{count}</div> */}
      <Toaster />
      {/* <Modal title="main title" open={true} onOpen={() => {}}>
        this is hits
      </Modal> */}
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favourites
          favourites={favourites}
          onDeleteFavourite={HandleDeleteFavourite}
        />
      </Navbar>
      <Main>
        <CharacterList
          selectId={selectId}
          onSelectCharacter={onSelectCharacter}
          characters={characters}
          isLoading={isLoading}
        />
        <CharacterDetail
          selectId={selectId}
          onAddFavourite={HandleAddFavourite}
          isAddToFavourite={isAddToFavourite}
        />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
