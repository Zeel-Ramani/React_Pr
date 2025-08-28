import { useParams, Link } from "react-router-dom";

const dummyMovies = [
  { id: 1, title: "Don", year: 2006, description: "Action thriller movie" },
  { id: 2, title: "Rockstar", year: 2011, description: "Romantic musical drama" },
];

function MovieDetails() {
  const { id } = useParams();
  const movieId = parseInt(id, 10);
  const movie = dummyMovies.find(m => m.id === movieId);

  if (!movie) {
    return (
      <div>
        <h2>Movie Not Found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>{movie.title} ({movie.year})</h2>
      <p>{movie.description}</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default MovieDetails;
