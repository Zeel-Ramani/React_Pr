import { useParams, Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

function MovieDetails() {
  let { id } = useParams();
  let [movie, setMovie] = useState(null);

  useEffect(() => {
    let stored = JSON.parse(localStorage.getItem("movies")) || [];
    setMovie(stored[id]);
  }, [id]);

  if (!movie) return <p>Movie not found</p>;

  return (
    <Card>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text><strong>Director:</strong> {movie.director}</Card.Text>
        <Card.Text><strong>Rating:</strong> {movie.rating}</Card.Text>
        <Button as={Link} to="/" variant="secondary">Back</Button>
      </Card.Body>
    </Card>
  );
}

export default MovieDetails;