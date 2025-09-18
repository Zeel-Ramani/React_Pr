import React from "react";
import { Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MovieForm from "../Components/MovieForm";

let AddPage = ({ addMovie }) => {
  let navigate = useNavigate();

  let handleAdd = (movie) => {
    addMovie(movie);
    navigate("/");
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <h3>Add Movie</h3>
          <MovieForm onSubmit={handleAdd} submitLabel="Add Movie" />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddPage;