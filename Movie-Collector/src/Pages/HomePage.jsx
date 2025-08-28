import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieList from "../Components/MovieList";

const initialMovies = [
  { id: 1, title: "Don", year: 2006, description: "Action thriller movie" },
  { id: 2, title: "Rockstar", year: 2011, description: "Romantic musical drama" },
];

function HomePage() {
  const [movies, setMovies] = useState(initialMovies);
  const navigate = useNavigate();

  const handleDelete = id => {
    if (window.confirm("Are you sure to delete this movie?")) {
      setMovies(movies.filter(m => m.id !== id));
    }
  };

  const handleEdit = id => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <h2>Movie List</h2>
      <MovieList movies={movies} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}

export default HomePage;
