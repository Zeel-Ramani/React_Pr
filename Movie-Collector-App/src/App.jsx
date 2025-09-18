import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./Components/Header";
import HomePage from "./Pages/HomePage";
import AddPage from "./Pages/AddPage";
import EditPage from "./Pages/EditPage";
import MovieDetails from "./Pages/moviedetails";

let App = () => {
  let [movies, setMovies] = useState([
    {
      title: "zeel",
      year: "1997",
      genre: "Action",
      director: "zeel ramani",
      language: "Hindi",
      description: "best movie in the world",
    },
  ]);

  let addMovie = (movie) => {
    setMovies([...movies, movie]);
  };

  let deleteMovie = (id) => {
    setMovies(movies.filter((_, idx) => idx !== id));
  };

  let updateMovie = (id, updatedMovie) => {
    setMovies(movies.map((movie, idx) => (idx === id ? updatedMovie : movie)));
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage movies={movies} deleteMovie={deleteMovie} />} />
        <Route path="/add" element={<AddPage addMovie={addMovie} />} />
        <Route path="/edit/:id" element={<EditPage movies={movies} updateMovie={updateMovie} />} />
        <Route path="/details/:id" element={<MovieDetails movies={movies} />} />
      </Routes>
    </Router>
  );
};

export default App;