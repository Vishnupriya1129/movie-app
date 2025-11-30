import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MoviesGrid from './pages/MoviesGrid';
import MovieDetails from './pages/MovieDetails';
import './styles/global.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MoviesGrid />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  );
}

export default App;