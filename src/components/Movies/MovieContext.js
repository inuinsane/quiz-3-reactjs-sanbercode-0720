import React, { createContext, useState } from "react";

export const MovieContext = createContext();

export const MovieProvider = (props) => {
  const [movies, setMovies] = useState({
      list: null,
      selectedID: null,
      statusForm: 'create',
      url: "http://backendexample.sanbercloud.com/api/movies",
  });

  return(
      <MovieContext.Provider value={[movies,setMovies]}>
          {props.children}
      </MovieContext.Provider>
  )
};