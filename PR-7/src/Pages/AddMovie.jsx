import { useNavigate } from "react-router-dom";
import MovieForm from "../Components/MovieForm";

function AddMovie() {
  let navigate = useNavigate();

  let handleAdd = (movie) => {
    let stored = JSON.parse(localStorage.getItem("movies")) || [];
    stored.push(movie);
    localStorage.setItem("movies", JSON.stringify(stored));
    navigate("/");
  };

  return (
    <div>
      <h2>Add Movie</h2>
      <MovieForm onSubmit={handleAdd} />
    </div>
  );
}

export default AddMovie;