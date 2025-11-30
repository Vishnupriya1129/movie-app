// src/components/MovieCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { buildImageUrl } from '../api';
import './MovieCard.css';

export default function MovieCard({ movie }) {
  const poster = buildImageUrl(movie.poster_path, 'w342');

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <div className="poster-wrap">
        {poster ? (
          <img src={poster} alt={movie.title} className="poster" />
        ) : (
          <div className="poster-placeholder">No Image</div>
        )}
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="rating">⭐ {movie.vote_average}</span>
          <span className="date">{movie.release_date}</span>
        </div>
      </div>
    </Link>
  );
}