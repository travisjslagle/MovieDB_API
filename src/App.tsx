import React, { useState } from "react";
import "./App.css";
import ListView from "./components/ListView";
import { Button, Modal } from "reactstrap";

export interface Movie {
  popularity: number;
  vote_count: number;
  video: boolean;
  poster_path: string;
  id: number;
  adult: boolean;
  backdrop_path: string;
  original_language: string;
  original_title: string;
  genre_ids: number[];
  title: string;
  vote_average: number;
  overview: string;
  release_date: string;
}

function App() {
  const [activeMovie, setActiveMovie] = useState<Movie | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);

  const clearActiveMovie = (): void => {
    setActiveMovie(null);
  };

  const posterPrefix: string = "https://image.tmdb.org/t/p/w200/";

  return (
    <div className="App">
      <h2>Welcome to the MovieDB App</h2>
      {activeMovie ? (
        <Modal isOpen={activeMovie != null} className="movieDetail">
          <img src={`${posterPrefix}${activeMovie.poster_path}`} alt="poster" />
          <h2>{activeMovie.title}</h2>
          <h4>Released: {activeMovie.release_date}</h4>
          <p>{activeMovie.overview}</p>
          <Button className="btn" onClick={() => clearActiveMovie()}>
            Go Back to List
          </Button>
        </Modal>
      ) : (
        <ListView
          setActiveMovie={setActiveMovie}
          movies={movies}
          setMovies={setMovies}
        />
      )}
    </div>
  );
}

export default App;
