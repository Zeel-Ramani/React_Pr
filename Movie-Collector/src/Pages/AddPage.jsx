import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieForm from "../Components/MovieForm";

function AddPage() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!title || !year) {
      alert("Please fill both Title and Year");
      return;
    }
    // Normally backend call
    alert(`Movie added: ${title} (${year})`);
    navigate("/");
  };

  return (
    <div>
      <h2>Add Movie</h2>
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
        buttonLabel="Add"
      />
    </div>
  );
}

export default AddPage;
