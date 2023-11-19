import "./App.css";
import { allCharacters } from "../data/data";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { SearchResult } from "./components/Navbar";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       setIsLoading(true);
  //       const res = await fetch("https://rickandmortyapi.com/api/character");
  //      if(!res.ok) throw new Error("something is wrong")
  //       const data = await res.json();
  //       setCharacters(data.results.slice(0, 5));
  //       setIsLoading(false);
  //     } catch (err) {
  //       console.log(err.message);
  //       toast.error(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => {
        if (!res.ok) throw new Error("something is wrong");
        return res.json();
      })
      .then((data) => {
        setCharacters(data.results.slice(0, 3));
        // setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // then catch => async await . ???
  // async function test(){}
  // async ()=>{}

  return (
    <div className="App">
      <Toaster />
      <Navbar>
        <SearchResult numOfResult={characters.length} />
      </Navbar>
      <Main>
        <CharacterList characters={characters} isLoading={isLoading} />
        <CharacterDetail />
      </Main>
    </div>
  );
}

export default App;

function Main({ children }) {
  return <div className="main">{children}</div>;
}
