import React from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Card } from "react-bootstrap";

let MovieDetails = ({ movies }) => {
  let { id } = useParams();
  let movie = movies[+id];

  if (!movie) return <div>Movie not found</div>;

  return (
    <Container className="mt-4">
      <Card className="movie-card">
        <Card.Body>
          <h3 style={{ fontWeight: "bold", fontSize: "34px", textDecorationLine: "underline" }}>{movie.title}</h3>
          <p><strong>Year:</strong> {movie.year}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Director:</strong> {movie.director || "-"}</p>
          <p><strong>Language:</strong> {movie.language || "-"}</p>
          <p><strong>Description:</strong> {movie.description || "-"}</p>
          <Link to="/" className="btn btn-secondary mt-3 py-2 px-4 rounded-pill">
            Back
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MovieDetails;