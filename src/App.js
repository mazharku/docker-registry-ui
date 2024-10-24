import './App.css';
import { HomePage } from './home/HomePage.js';
import { NavBar, Footer } from './home/NavBar.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DockerHubPage } from './dockerhub/DockerHubPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <HomePage />
              <Footer />
            </>
          }
        />
        <Route
          path="/dockerhub"
          element={<DockerHubPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
