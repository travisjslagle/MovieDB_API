import React, { useState } from "react";
import "./ListView.css";
import { Button, Input, Label } from "reactstrap";
import { Movie } from "../App";
import API_KEY from "../helpers/environment";

interface ListViewProps {
  setActiveMovie: Function;
  movies: Movie[];
  setMovies: Function;
}

const ListView = (props: ListViewProps) => {
  const [advancedSearch, setAdvancedSearch] = useState<boolean>(false);
  const [delay, setDelay] = useState<number>(0);
  const [filterRating, setFilterRating] = useState<number>(7);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNumber}`;

  const fetchMovies = (): void => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        networkDelay(json.results, delay);
      })
      .catch((err) => console.log(err));
  };

  const toggleAdvanced = (): void => {
    setAdvancedSearch(!advancedSearch);
  };

  const networkDelay = (array: Movie[], delay: number): void => {
    setTimeout(function () {
      props.setMovies(array);
    }, delay * 1000);
  };

  const filterResults = (array: Movie[], rating: number): void => {
    let filteredMovies = array.filter((movie) => movie.vote_average >= rating);
    props.setMovies(filteredMovies);
  };

  const handlePageChange = (direction: string): void => {
    if (direction === "next") {
      setPageNumber(pageNumber + 1);
    } else if (direction === "prev") {
      if (pageNumber !== 1) {
        setPageNumber(pageNumber - 1);
      }
    }
    fetchMovies();
  };

  return (
    <div className="container">
      <h2>Find Popular Movies Below</h2>
      <Button className="btn" onClick={() => fetchMovies()}>
        Find Some Movies!
      </Button>
      <br />
      <Button className="btn" onClick={() => toggleAdvanced()}>
        Advanced Search Options
      </Button>
      {advancedSearch ? (
        <div>
          <div>
            <Label>Set Network Delay: </Label>
            <Input
              type="number"
              name="delay"
              value={delay}
              onChange={(e) => setDelay(parseInt(e.target.value))}
            ></Input>
          </div>
          <div>
            <Label>Show Movies with Ratings Above:</Label>
            <Input
              type="number"
              min="0"
              max="10"
              name="filterRating"
              value={filterRating}
              onChange={(e) => setFilterRating(parseInt(e.target.value))}
            ></Input>
            <br />
            <Button
              className="btn"
              onClick={() => filterResults(props.movies, filterRating)}
            >
              Filter Results
            </Button>
          </div>
        </div>
      ) : null}
      <>
        {props.movies.map((movie) => {
          return (
            <div key={movie.id} className="movieDisplay">
              <h4>{movie.title}</h4>
              <h5>Released {movie.release_date}</h5>
              <h5>Average Rating: {movie.vote_average}</h5>
              <Button
                className="btn"
                onClick={() => props.setActiveMovie(movie)}
              >
                View Details
              </Button>
            </div>
          );
        })}
      </>
      {props.movies !== [] ? (
        <div>
          <br />
          <Button className="btn" onClick={() => handlePageChange("prev")}>
            Prev Page
          </Button>
          <Button className="btn" onClick={() => handlePageChange("next")}>
            Next Page
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default ListView;
