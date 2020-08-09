import React from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import About from "../About/About";
import Login from "../Login/Login";
import MovieEditor from "../Movies/MovieEditor";
import { AuthProvider } from "../Context/AuthContext";
import ThemeContextProvider from "../Context/ThemeContext";
import DaftarFilm from "../Movies/DaftarFilm";

const Routes = () => {
  return (
    <div className="App">
      <AuthProvider>
        <ThemeContextProvider>
          <NavBar />
          <Switch>
            <Route exact path="/" component={DaftarFilm} />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/movie-editor" component={MovieEditor} />
          </Switch>
        </ThemeContextProvider>
      </AuthProvider>
    </div>
  );
};

export default Routes;
