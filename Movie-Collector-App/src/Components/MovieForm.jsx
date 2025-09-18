import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

let MovieForm = ({ initialMovie, onSubmit, submitLabel }) => {
  let [movie, setMovie] = useState(
    initialMovie || {
      title: "",
      year: "",
      genre: "",
      director: "",
      language: "",
      description: "",
    }
  );

  useEffect(() => {
    setMovie(
      initialMovie || {
        title: "",
        year: "",
        genre: "",
        director: "",
        language: "",
        description: "",
      }
    );
  }, [initialMovie]);

  let handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(movie);
    if (!initialMovie) {
      setMovie({
        title: "",
        year: "",
        genre: "",
        director: "",
        language: "",
        description: "",
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={movie.title}
          onChange={handleChange}
          required
          placeholder="Enter movie title"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Year</Form.Label>
        <Form.Control
          type="number"
          name="year"
          value={movie.year}
          onChange={handleChange}
          required
          placeholder="Enter movie year"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Genre</Form.Label>
        <Form.Control
          type="text"
          name="genre"
          value={movie.genre}
          onChange={handleChange}
          required
          placeholder="Enter movie genre"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Director</Form.Label>
        <Form.Control
          type="text"
          name="director"
          value={movie.director}
          onChange={handleChange}
          placeholder="Enter director name"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Language</Form.Label>
        <Form.Control
          type="text"
          name="language"
          value={movie.language}
          onChange={handleChange}
          placeholder="Enter language"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={movie.description}
          onChange={handleChange}
          placeholder="Enter movie description"
        />
      </Form.Group>

      <Button type="submit" variant="primary">
        {submitLabel || "Save"}
      </Button>
    </Form>
  );
};

export default MovieForm;