import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "./MovieContext";
import { AuthContext } from "./../Context/AuthContext";
import "./Movie.css";
import "./MovieTable.css";
import Axios from "axios";

const EditFilm = () => {
  const [movies, setMovies] = useContext(MovieContext);
  const [status] = useContext(AuthContext);
  const [selected, setSelected] = useState({
    id: null,
    title: "",
    duration: 0,
    year: 0,
    rating: 0,
    genre: "",
    description: "",
  });

  // Get data lagi, padahal udah pake context tapi context di home gamau update jadi kembali ke null
  useEffect(() => {
    if (movies.list === null) {
      Axios.get(movies.url).then((res) => {
        setMovies({
          ...movies,
          list: res.data.map((el) => {
            return {
              id: el.id,
              title: el.title,
              description: el.description,
              duration: el.duration,
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

  // Edit data
  const handleEdit = (e) => {
    setMovies({
      ...movies,
      selectedID: parseInt(e.target.value),
      statusForm: "edit",
    });
    let movie = movies.list.find((x) => x.id === movies.selectedID);
    setSelected({ ...movie });
  };

  // Delete Data
  const handleDelete = (e) => {
    e.preventDefault();
    let id = parseInt(e.target.value);
    let newList = movies.list.filter((el) => el.id !== id);
    Axios.delete(`${movies.url}/${id}`).then((res) => {
      console.log(res);
    });

    setMovies({ ...movies, list: [...newList] });
  };

  const handleChange = (e) => {
    if (e.target.name === "title") {
      setSelected({ ...selected, title: e.target.value });
    } else if (e.target.name === "year") {
      setSelected({ ...selected, year: parseInt(e.target.value) });
    } else if (e.target.name === "duration") {
      setSelected({ ...selected, duration: parseInt(e.target.value) });
    } else if (e.target.name === "rating") {
      setSelected({ ...selected, rating: parseInt(e.target.value) });
    } else if (e.target.name === "genre") {
      setSelected({ ...selected, genre: e.target.value });
    } else if (e.target.name === "description") {
      setSelected({ ...selected, description: e.target.value });
    }
  };

  // Submit Data
  const handleSubmit = (e) => {
    console.log(selected);

    e.preventDefault();
    if (
      selected.title !== "" &&
      typeof selected.year === "number" &&
      selected.year.toString().length === 4 &&
      typeof selected.rating === "number" &&
      selected.rating <= 10 &&
      typeof selected.duration === "number" &&
      selected.duration !== 0 &&
      selected.genre !== "" &&
      selected.description !== ""
    ) {
      if (movies.statusForm === "create") {
        Axios.post(movies.url, { ...selected }).then((res) => {
          console.log(res);
          setMovies({
            ...movies,
            statusForm: "create",
            selectedID: null,
            list: [
              ...movies.list,
              {
                id: res.data.id,
                title: res.data.title,
                year: res.data.year,
                rating: res.data.rating,
                genre: res.data.genre,
                description: res.data.description,
              },
            ],
          });
        });
        setSelected({
          id: null,
          title: "",
          duration: 0,
          year: 0,
          rating: 0,
          genre: "",
          description: "",
        });
      } else if (movies.statusForm === "edit") {
        Axios.put(`${movies.url}/${movies.selectedID}`, {
          title: selected.title,
          year: selected.year,
          genre: selected.genre,
          duration: selected.duration,
          rating: selected.rating,
          description: selected.description,
        }).then(() => {
          let movie = movies.list.find((el) => el.id === movies.selectedID);
          movie.title = selected.title;
          movie.year = selected.year;
          movie.genre = selected.genre;
          movie.duration = selected.duration;
          movie.rating = selected.rating;
          movie.description = selected.description;
          setMovies({
            ...movies,
            list: [...movies.list],
            statusForm: "create",
            selectedID: null,
          });
        });
      }
    } else {
      alert(
        "Error! Pastikan semua input terisi dan input tahun(harus 4 digit), rating(maks. 10), serta durasi(dalam menit) hanya berisi angka!"
      );
    }
  };

  return (
    <>
      {status === true ? (
        <>
          <h3>Movie List Editor</h3>
          <div className="card">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <div className="input">
                  <label htmlFor="title" className="label">
                    Title{" "}
                  </label>
                  <input
                    type="text"
                    value={selected.title}
                    name="title"
                    onChange={handleChange}
                  />
                </div>
                <div className="input">
                  <label htmlFor="year" className="label">
                    Year{" "}
                  </label>
                  <input
                    type="number"
                    value={selected.year}
                    name="year"
                    onChange={handleChange}
                  />
                </div>
                <div className="input">
                  <label htmlFor="rating" className="label">
                    Rating{" "}
                  </label>
                  <input
                    type="number"
                    value={selected.rating}
                    name="rating"
                    onChange={handleChange}
                  />
                </div>
                <div className="input">
                  <label htmlFor="rating" className="label">
                    Duration{" "}
                  </label>
                  <input
                    type="number"
                    value={selected.duration}
                    name="duration"
                    onChange={handleChange}
                  />
                </div>
                <div className="input">
                  <label htmlFor="genre" className="label">
                    Genre{" "}
                  </label>
                  <input
                    type="text"
                    value={selected.genre}
                    name="genre"
                    onChange={handleChange}
                  />
                </div>
                <div className="input">
                  <label htmlFor="description" className="label">
                    Description{" "}
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    cols="20"
                    rows="1"
                    onChange={handleChange}
                    value={selected.description}
                  ></textarea>
                </div>
                <div className="input">
                  <button className="btn submit">Submit</button>
                </div>
              </div>
            </form>
          </div>
          <div className="movie-editor">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Year</th>
                  <th>Duration</th>
                  <th>Rating</th>
                  <th>Genre</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {daftarFilm !== null &&
                  daftarFilm.map((movie) => {
                    return (
                      <tr>
                        <td data-label="ID">{movie.id}</td>
                        <td data-label="Title">{movie.title}</td>
                        <td data-label="Year">{movie.year}</td>
                        <td data-label="Duration">{movie.duration} min</td>
                        <td data-label="Rating">{movie.rating}</td>
                        <td data-label="Genre">{movie.genre}</td>
                        <td data-label="Description">{movie.description}</td>
                        <td data-label="Action" className="action">
                          <button
                            className="btn edit"
                            name="edit"
                            value={movie.id}
                            onClick={handleEdit}
                          >
                            Edit
                          </button>
                          <button
                            className="btn delete"
                            name="delete"
                            value={movie.id}
                            onClick={handleDelete}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <h1>Anda belum login</h1>
      )}
    </>
  );
};

export default EditFilm;
