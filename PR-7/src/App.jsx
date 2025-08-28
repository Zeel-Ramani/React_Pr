import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AddMovie from "./Pages/AddMovie";
import EditMovie from "./Pages/EditMovie";
import MovieDetails from "./Pages/MovieDetails";
import NavigationBar from "./Components/Movie";

function App() {
  return (
    <>
      <NavigationBar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddMovie />} />
          <Route path="/edit/:id" element={<EditMovie />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;