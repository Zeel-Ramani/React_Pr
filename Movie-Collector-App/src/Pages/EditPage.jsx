import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import MovieForm from "../Components/MovieForm";

let EditPage = ({ movies, updateMovie }) => {
  let { id } = useParams();
  let navigate = useNavigate();
  let movieToEdit = movies[+id];

  let handleUpdate = (updatedMovie) => {
    updateMovie(+id, updatedMovie);
    navigate("/");
  };

  if (!movieToEdit) return <div>Movie not found</div>;

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <h3>Edit Movie</h3>
          <MovieForm
            initialMovie={movieToEdit}
            onSubmit={handleUpdate}
            submitLabel="Update Movie"
          />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditPage;