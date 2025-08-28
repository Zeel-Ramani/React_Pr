import { Link } from "react-router-dom";

const MovieList = ({ movies, onDelete, onEdit }) => (
  <ul>
    {movies.map(movie => (
      <li key={movie.id}>
        <Link to={`/details/${movie.id}`}>{movie.title}</Link> ({movie.year})
        <button onClick={() => onEdit(movie.id)}>Edit</button>
        <button onClick={() => onDelete(movie.id)}>Delete</button>
      </li>
    ))}
  </ul>
);

export default MovieList;
