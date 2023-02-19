import { Fragment, useEffect, useState } from "react";

import Layout from "./components/Layout";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import Movie from "./components/Movie";
import MoviesList from "./components/MoviesList";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState(false);

  // CONFIG PARAMETERS
  const API_KEY = "a23c40820ded910fd30f9f739307f06e";
  const SEARCH = `
  https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchInput}&language=en-US&page=1&include_adult=false`;
  const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
  const IMG_URL = "https://image.tmdb.org/t/p/w500/";

  let fetchedMovies = [];

  useEffect(() => {
    async function fetchMovies() {
      const fetchPara = searchMovie ? SEARCH : API_URL;
      const res = await fetch(fetchPara);
      const data = await res.json();
      const moviesResult = data.results;

      moviesResult.map((movie) => {
        const title = movie.title;
        const overview = movie.overview;
        const releaseDate = movie.release_date;
        const image = `${IMG_URL}${movie.poster_path}`;
        const ratings = movie.vote_average.toFixed(1);
        const id = movie.id;
        let genre = [];
        let gen = "";
        const GENRE = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;

        async function genres() {
          const res = await fetch(GENRE);
          const data = await res.json();
          const results = data.genres;
          const genres = results.map((r) => r.name);
          return genre.push(genres.join(", "));
        }
        try {
          genres();
          gen = genre.toString();
        } catch (error) {
          console.log(error);
        }

        return fetchedMovies.push(
          <Movie
            key={id}
            id={id}
            overview={overview}
            releaseDate={releaseDate}
            // genres={gen}
            image={image}
            ratings={ratings}
            title={title}
          />
        );
      });

      setMovies(fetchedMovies);
    }
    try {
      fetchMovies();
    } catch (error) {
      console.log(error);
    }
  }, [API_URL, searchMovie, SEARCH, movies, searchInput, fetchedMovies]);

  const searchHandler = (e) => {
    setSearchInput(e.target.value);
    if (e.target.value === "") {
      setSearchMovie(false);
    } else {
      setSearchMovie(true);
    }
  };

  function formSubmitHandler(e) {
    e.preventDefault();
  }

  return (
    <Fragment>
      <Layout />
      <SearchBar
        onSubmit={formSubmitHandler}
        value={searchInput}
        onChange={searchHandler}
      />
      <Filter onSelectFiltered={movies} />
      <MoviesList>{movies}</MoviesList>
    </Fragment>
  );
}

export default App;
