import React from "react";
import { Container } from "react-bootstrap";
import MovieList from "../Components/MovieList";

let HomePage = ({ movies, deleteMovie }) => (
  <Container className="mt-4">
    <h3>All Movies</h3>
    <MovieList movies={movies} onDelete={deleteMovie} />
  </Container>
);

export default HomePage;