import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieForm from "../Components/MovieForm";

const dummyMovies = [
  { id: 1, title: "Don", year: 2006, description: "Action thriller movie" },
  { id: 2, title: "Rockstar", year: 2011, description: "Romantic musical drama" },
];

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movieId = parseInt(id, 10);

  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const movie = dummyMovies.find(m => m.id === movieId);
    if (movie) {
      setTitle(movie.title);
      setYear(movie.year);
      setDescription(movie.description);
    }
  }, [movieId]);

  const handleSubmit = () => {
    if (!title || !year) {
      alert("Please fill both Title and Year");
      return;
    }
    alert(`Movie updated: ${title} (${year})`);
    navigate("/");
  };

  return (
    <div>
      <h2>Edit Movie</h2>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <MovieForm
        title={title}
        year={year}
        setTitle={setTitle}
        setYear={setYear}
        onSubmit={handleSubmit}
        buttonLabel="Update"
      />
    </div>
  );
}

export default EditPage;
