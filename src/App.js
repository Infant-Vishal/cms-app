import logo from "./logo.svg";
import "./App.css";
import Posts from "./Components/Posts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SinglePost from "./Components/SinglePost";

function App() {
  return (
    <BrowserRouter>
      {/* navbar */}
      <nav className="navbar navbar-expand-lg navbar-light nav-container">
        <a class="navbar-brand" href="#">
          <img src="https://connect2clinic.com/static/media/c2cimg.38b36c5a.svg" />
        </a>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item ">
              <a class="nav-link" href="#">
                Home
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/post">
                Med Updates <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Book Appointment
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/post" element={<Posts />} />
        <Route path="/post/:slug" element={<SinglePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
