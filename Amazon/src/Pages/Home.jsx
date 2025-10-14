import React from "react";
import Productcard from "../Components/Productcard";

export default function Home() {
  const products = [
    { id: 1, name: "Apple iPhone 14", price: 69999, image: "https://via.placeholder.com/300x200?text=iPhone" },
    { id: 2, name: "Samsung Galaxy S22", price: 54999, image: "https://via.placeholder.com/300x200?text=Galaxy" },
    { id: 3, name: "Sony Headphones", price: 4999, image: "https://via.placeholder.com/300x200?text=Headphones" },
    { id: 4, name: "Laptop 14-inch", price: 75999, image: "https://via.placeholder.com/300x200?text=Laptop" },
    { id: 5, name: "Smart Watch", price: 9999, image: "https://via.placeholder.com/300x200?text=Watch" },
    { id: 6, name: "Camera", price: 45999, image: "https://via.placeholder.com/300x200?text=Camera" },
  ];

  return (
    <section className="home-section">
      <div className="products-grid">
        {products.map(p => <Productcard key={p.id} product={p} />)}
      </div>
    </section>
  );
}