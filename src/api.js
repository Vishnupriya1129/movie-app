const TMDB_BASE = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p';

const getApiKey = () => {
  const key = import.meta.env.VITE_TMDB_API_KEY;
  if (!key) throw new Error('Missing VITE_TMDB_API_KEY');
  return key;
};

export const buildImageUrl = (path, size = 'w500') => {
  if (!path) return null;
  return `${IMAGE_BASE}/${size}${path}`;
};

export const fetchPopularMovies = async (page = 1) => {
  const apiKey = getApiKey();
  const url = `${TMDB_BASE}/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB error ${res.status}`);
  return res.json();
};
// 🔍 New: search movies by query
export const searchMovies = async (query, page = 1) => {
  const apiKey = getApiKey();
  const url = `${TMDB_BASE}/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB search error ${res.status}`);
  return res.json();
};
