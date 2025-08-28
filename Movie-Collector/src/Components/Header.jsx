import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/add">Add Movie</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;