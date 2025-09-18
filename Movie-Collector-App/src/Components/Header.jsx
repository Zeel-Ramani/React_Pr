import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFilm } from "react-icons/fa";

let Header = () => {
  return (
    <header>
      <Navbar
        expand="lg"
        style={{
          background: "linear-gradient(90deg, #131624 0%, #232458 100%)",
          boxShadow: "0 8px 32px 0 rgba(24,22,43,0.55)",
          backdropFilter: "blur(9px)",
          WebkitBackdropFilter: "blur(9px)",
          borderRadius: "0 0 20px 20px",
          border: "1px solid rgba(255,255,255,0.08)",
          position: "relative",
          zIndex: 99,
        }}
        className="glass-header py-2"
      >
        <Container className="d-flex justify-content-between align-items-center">
          <Link
            to="/"
            className="navbar-brand d-flex align-items-center"
            style={{
              color: "#eceff1",
              fontWeight: 700,
              fontSize: "1.8rem",
              letterSpacing: "1px",
              textShadow: "0 2px 12px #2343",
              gap: "12px",
            }}
          >
            <FaFilm
              style={{
                fontSize: "2rem",
                color: "#00e1ff",
                transition: "transform 0.4s cubic-bezier(.68,-0.55,.27,1.55)",
                filter: "drop-shadow(0 0 6px #00e1ff77)",
              }}
              className="film-icon"
              onMouseEnter={e =>
                (e.currentTarget.style.transform = "rotate(-14deg) scale(1.25)")
              }
              onMouseLeave={e =>
                (e.currentTarget.style.transform = "none")
              }
            />
            Movie Collector
          </Link>
          <Link
            to="/add"
            className="btn dark-neon-btn rounded-pill px-4 py-2"
            style={{
              fontWeight: 600,
              background: "linear-gradient(90deg,#232458 70%,#00e1ff 100%)",
              color: "#fff",
              border: "none",
              boxShadow: "0 0 14px #00e1ff55,0 0 4px #232458dd",
              fontSize: "1.07rem",
            }}
          >
            Add Movie
          </Link>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;