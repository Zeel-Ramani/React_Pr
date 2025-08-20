import React, { useState } from "react";

function MovieCollector() {
  let [movies, setMovies] = useState([]);
  let [movie, setMovie] = useState({
    title: "",
    director: "",
    year: "",
    genre: "",
    rating: "1",
  });
  let [editIndex, setEditIndex] = useState(null);

  function handleChange(e) {
    let { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (editIndex !== null) {
      let updatedMovies = [...movies];
      updatedMovies[editIndex] = movie;
      setMovies(updatedMovies);
      setEditIndex(null);
    } else {
      setMovies([...movies, movie]);
    }

    setMovie({ title: "", director: "", year: "", genre: "", rating: "1" });
  }

  function handleEdit(index) {
    setMovie(movies[index]);
    setEditIndex(index);
  }

  function handleDelete(index) {
    let updatedMovies = [...movies];
    updatedMovies.splice(index, 1);
    setMovies(updatedMovies);
  }

  return (
    <div className="collector">
      <h1 className="text-center mb-4 text-white-50">🎬 Movie Collector App</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="title"
          value={movie.title}
          onChange={handleChange}
          placeholder="Movie Title"
          required
        />
        <input
          type="text"
          name="director"
          value={movie.director}
          onChange={handleChange}
          placeholder="Director"
          required
        />
        <input
          type="number"
          name="year"
          value={movie.year}
          onChange={handleChange}
          placeholder="Release Year"
          required
        />
        <select name="genre" value={movie.genre} onChange={handleChange} required>
          <option value="">Select Genre</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Romantic">Romantic</option>
          <option value="Horror">Horror</option>
          <option value="Drama">Drama</option>
        </select>
        <select name="rating" value={movie.rating} onChange={handleChange} required>
          <option value="">Select Rating</option>
          {[1,2,3,4,5,6,7,8,9,10].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
        <button type="submit">{editIndex !== null ? "Update" : "Add Movie"}</button>
      </form>

      <div className="movie-list">
        {movies.length === 0 ? (
          <p>No movies added yet.</p>
        ) : (
          movies.map((m, index) => (
            <div key={index} className="movie-card">
              <h3>{m.title} ({m.year})</h3>
              <p><b>Director:</b> {m.director}</p>
              <p><b>Genre:</b> {m.genre}</p>
              <p><b>Rating:</b> {m.rating}/10</p>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MovieCollector;