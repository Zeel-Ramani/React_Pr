import React, { useState } from "react";

export default function MovieCollector() {
  let [movies, setMovies] = useState([]);
  let [formData, setFormData] = useState({
    title: "",
    rating: "",
    director: "",
    year: "",
    genre: ""
  });
  let [editIndex, setEditIndex] = useState(null);

  let handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.title.trim() ||
      !formData.rating.trim() ||
      !formData.director.trim() ||
      !formData.year.trim() ||
      !formData.genre.trim()
    ) {
      return;
    }

    if (editIndex !== null) {
      let updatedMovies = movies.map((m, i) =>
        i === editIndex ? formData : m
      );
      setMovies(updatedMovies);
      setEditIndex(null);
    } else {
      setMovies([...movies, formData]);
    }
    setFormData({
      title: "",
      rating: "",
      director: "",
      year: "",
      genre: ""
    });
  };

  let handleDelete = (index) => {
    setMovies(movies.filter((_, i) => i !== index));
  };

  let handleEdit = (index) => {
    setFormData(movies[index]);
    setEditIndex(index);
  };

  return (
    <div className="movie-collector">
      <form onSubmit={handleSubmit} className="movie-form">
        <input
          type="text"
          name="title"
          placeholder="🎥 Movie Title"
          value={formData.title}
          onChange={handleChange}
        />
        <select name="rating" value={formData.rating} onChange={handleChange}>
          <option value="">⭐ Select Rating</option>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} / 10
            </option>
          ))}
        </select>
        <input
          type="text"
          name="director"
          placeholder="🎬 Director Name"
          value={formData.director}
          onChange={handleChange}
        />
        <input
          type="number"
          name="year"
          placeholder="📅 Release Year"
          value={formData.year}
          onChange={handleChange}
        />
        <select name="genre" value={formData.genre} onChange={handleChange}>
          <option value="">🎭 Select Genre</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Romantic">Romantic</option>
          <option value="Drama">Drama</option>
          <option value="Horror">Horror</option>
          <option value="Sci-Fi">Sci-Fi</option>
        </select>
        <button type="submit">{editIndex !== null ? "Update 🎯" : "Add ➕"}</button>
      </form>

      <div className="table-wrapper">
        <table className="movie-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Rating</th>
              <th>Director</th>
              <th>Year</th>
              <th>Genre</th>
              <th>🎬 Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, index) => (
              <tr key={index}>
                <td>{movie.title}</td>
                <td>⭐ {movie.rating}/10</td>
                <td>{movie.director}</td>
                <td>{movie.year}</td>
                <td>{movie.genre}</td>
                <td>
                  <button className="edit" onClick={() => handleEdit(index)}>✏️</button>
                  <button className="delete" onClick={() => handleDelete(index)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {movies.length === 0 && <p className="empty-msg">No movies added yet 🎞️</p>}
      </div>
    </div>
  );
}