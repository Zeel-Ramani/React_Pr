import React, { useState } from "react";

function FeedbackForm() {
  let [username, setUsername] = useState("");
  let [review, setReview] = useState("");
  let [rating, setRating] = useState("");
  let [reviewsList, setReviewsList] = useState([]);

  let handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !review || !rating) {
      alert("Please fill all fields!");
      return;
    }

    let newReview = {
      id: Date.now(),
      username,
      review,
      rating,
    };

    setReviewsList([newReview, ...reviewsList]);
    setUsername("");
    setReview("");
    setRating("");
  };

  return (
    <div className="form-container">
        <h1>Comment / Review App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <textarea
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="rating-dropdown"
        >
          <option value="">Select Rating</option>
          <option value="1">1 ⭐</option>
          <option value="2">2 ⭐⭐</option>
          <option value="3">3 ⭐⭐⭐</option>
          <option value="4">4 ⭐⭐⭐⭐</option>
          <option value="5">5 ⭐⭐⭐⭐⭐</option>
        </select>

        <button type="submit">Submit Review</button>
      </form>

      <div className="review-list">
        {reviewsList.map((item) => (
          <div className="review-card" key={item.id}>
            <h3>{item.username}</h3>
            <p>{item.review}</p>
            <span>⭐ {item.rating} / 5</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedbackForm;