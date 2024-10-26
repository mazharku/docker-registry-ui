import './App.css';
import React, { useState } from 'react';
import { HomePage } from './home/HomePage.js';
import { NavBar, Footer } from './home/NavBar.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DockerHubPage } from './dockerhub/DockerHubPage';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
              <HomePage searchTerm={searchTerm} />
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
