// src/pages/MoviesGrid.jsx
import React, { useEffect, useState } from 'react';
import { fetchPopularMovies, searchMovies } from '../api';
import MovieCard from '../components/MovieCard';
import './MoviesGrid.css';

export default function MoviesGrid() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [mode, setMode] = useState('popular'); // 'popular' or 'search'

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data =
          mode === 'popular'
            ? await fetchPopularMovies(page)
            : await searchMovies(searchTerm, page);

        if (!cancelled) {
          setMovies(data.results || []);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [page, mode, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setMode('search');
      setPage(1);
    } else {
      setMode('popular');
      setPage(1);
    }
  };

  return (
    <main className="movies-page">
      <header className="movies-header">
        <h1>Popular Movies</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </header>

      {error && <div className="error">Error: {error}</div>}

      <section className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>

      <div className="controls">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1 || loading}>
          Previous
        </button>
        <span className="page-indicator">Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)} disabled={loading}>
          Next
        </button>
      </div>

      {loading && <div className="loading">Loading...</div>}
    </main>
  );
}