import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieForm from "../Components/MovieForm";

function EditMovie() {
  let { id } = useParams();
  let navigate = useNavigate();
  let [movie, setMovie] = useState(null);

  useEffect(() => {
    let stored = JSON.parse(localStorage.getItem("movies")) || [];
    setMovie(stored[id]);
  }, [id]);

  let handleUpdate = (updatedMovie) => {
    let stored = JSON.parse(localStorage.getItem("movies")) || [];
    stored[id] = updatedMovie;
    localStorage.setItem("movies", JSON.stringify(stored));
    navigate("/");
  };

  return (
    <div>
      <h2>Edit Movie</h2>
      {movie ? <MovieForm onSubmit={handleUpdate} initialData={movie} /> : <p>Movie not found</p>}
    </div>
  );
}

export default EditMovie;