import React, { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

let MovieList = ({ movies, onDelete }) => {
  let [search, setSearch] = useState("");
  let [sortField, setSortField] = useState("title");
  let [sortOrder, setSortOrder] = useState("asc");
  let [genreFilter, setGenreFilter] = useState("");

  let genres = Array.from(new Set(movies.map((m) => m.genre)));

  let searchedMovies = movies.filter(
    (m) =>
      m.title.toLowerCase().includes(search.toLowerCase()) &&
      (genreFilter === "" || m.genre === genreFilter)
  );

  let sortedMovies = [...searchedMovies].sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortField].localeCompare(b[sortField]);
    } else {
      return b[sortField].localeCompare(a[sortField]);
    }
  });

  return (
    <>
      <Form className="mb-3 d-flex flex-wrap gap-3 align-items-center">
        <Form.Control
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 200 }}
        />
        <Form.Select
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          style={{ maxWidth: 150 }}
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </Form.Select>
        <Form.Select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          style={{ maxWidth: 150 }}
        >
          <option value="title">Title</option>
          <option value="year">Year</option>
          <option value="genre">Genre</option>
          <option value="director">Director</option>
          <option value="language">Language</option>
        </Form.Select>
        <Form.Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ maxWidth: 100 }}
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </Form.Select>
      </Form>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Director</th>
            <th>Language</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedMovies.map((movie, idx) => (
            <tr key={idx}>
              <td>{movie.title}</td>
              <td>{movie.year}</td>
              <td>{movie.genre}</td>
              <td>{movie.director || "-"}</td>
              <td>{movie.language || "-"}</td>
              <td>{movie.description ? movie.description.substring(0, 50) + (movie.description.length > 50 ? "..." : "") : "-"}</td>
              <td>
                <Link to={`/details/${idx}`} className="btn btn-info btn-sm mx-1" title="View Details">
                  <FaEye />
                </Link>
                <Link to={`/edit/${idx}`} className="btn btn-warning btn-sm mx-1" title="Edit Movie">
                  <FaEdit />
                </Link>
                <Button variant="danger" size="sm" onClick={() => onDelete(idx)} className="mx-1" title="Delete Movie">
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default MovieList;