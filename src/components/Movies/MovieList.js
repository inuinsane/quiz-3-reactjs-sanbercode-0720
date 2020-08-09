import React, { useContext, useEffect } from "react";
import { MovieContext } from "./MovieContext";
import Axios from "axios";
import "./Movie.css";
import { AuthContext } from "../Context/AuthContext";

const MovieList = () => {
  const [movies, setMovies] = useContext(MovieContext);
  const [status] = useContext(AuthContext);
  

  useEffect(() => {
    if (movies.list === null) {
      Axios.get(movies.url).then((res) => {
        setMovies({
          ...movies,
          list: res.data.map((el) => {
            return {
              id: el.id,
              title: el.title,
              duration: el.duration,
              description: el.description,
              rating: el.rating,
              year: el.year,
              genre: el.genre,
            };
          }),
        });
      });
    }
  }, [movies]);

  const compare = (a, b) => {
    if (a.rating < b.rating) {
      return 1;
    }
    if (a.rating > b.rating) {
      return -1;
    }
    return 0;
  };

  let daftarFilm = movies.list !== null ? movies.list.sort(compare) : null;

  return (
    <div className="row">
      <h1>Daftar Film Terbaik!</h1>
      {daftarFilm !== null &&
        daftarFilm.map((movie) => {
          return (
            <div className="column">
              <div className="card">
                <h3 className="movie-title">{movie.title}</h3>
                <li className="movie-detail">Rating: {movie.rating}</li>
                <li className="movie-detail">Duration: {movie.duration} min</li>
                <li className="movie-detail">Year: {movie.year}</li>
                <li className="movie-detail">Genre: {movie.genre}</li>
                <p className="movie-detail"><strong>Description:</strong> {movie.description}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default MovieList;
