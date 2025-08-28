import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

function MovieForm({ onSubmit, initialData }) {
  let [movie, setMovie] = useState({
    title: "",
    director: "",
    rating: ""
  });

  useEffect(() => {
    if (initialData) setMovie(initialData);
  }, [initialData]);

  let handleChange = (e) => {
    let { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    if (movie.rating > 10) {
      alert("Rating should not be more than 10!");
      return;
    }
    onSubmit(movie);
    setMovie({ title: "", director: "", rating: "" });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={movie.title}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Director</Form.Label>
        <Form.Control
          type="text"
          name="director"
          value={movie.director}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Rating (Max 10)</Form.Label>
        <Form.Control
          type="number"
          name="rating"
          value={movie.rating}
          onChange={handleChange}
          min="0"
          max="10"
          required
        />
      </Form.Group>

      <Button type="submit" variant="primary">Save</Button>
    </Form>
  );
}

export default MovieForm;