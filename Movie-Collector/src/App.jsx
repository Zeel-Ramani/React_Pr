import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import HomePage from "./Pages/HomePage";
import AddPage from "./Pages/AddPage";
import EditPage from "./Pages/EditPage";
import MovieDetails from "./Pages/moviedetails";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/details/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
