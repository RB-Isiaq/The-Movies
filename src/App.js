import { Fragment, useEffect, useState } from "react";

import Layout from "./components/Layout";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import Movie from "./components/Movie";
import MoviesList from "./components/MoviesList";
import MovieModal from "./components/MovieModal";
import InstallPrompt from "./components/InstallPrompt";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState([]);
  const [showSingleMovie, setShowSingleMovie] = useState(false);
  const [searchMovie, setSearchMovie] = useState(false);
  const [empty, setEmpty] = useState(false);

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

      async function genres(movieID) {
        const GENRE = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=en-US`;
        const res = await fetch(GENRE);
        const data = await res.json();
        const id = data.id;
        const title = data.title;
        const overview = data.overview;
        const releaseDate = data.release_date;
        const runtime = data.runtime;
        const time = timeConvert(runtime);
        const link = data.homepage;
        const tagline = data.tagline;
        const backdrop = `${IMG_URL}${data.backdrop_path}`;
        const image = `${IMG_URL}${data.poster_path}`;
        const ratings = data.vote_average.toFixed(1);
        const genres = data.genres.map((r) => r.name);
        const genre = genres.join(", ");
        return (
          <MovieModal
            key={id}
            id={id}
            backdrop={backdrop}
            title={title}
            image={image}
            genres={genre}
            releaseDate={releaseDate}
            duration={time}
            ratings={ratings}
            overview={overview}
            link={link}
            tagline={tagline}
            close={closeSingleMovie}
          />
        );
      }

      async function getMovie(e) {
        setShowSingleMovie(true);
        const movie = await genres(e.target.id);
        setMovie(movie);
      }

      moviesResult.map((movie) => {
        const title = movie.title;
        const releaseDate = movie.release_date;
        const image = `${IMG_URL}${movie.poster_path}`;
        const ratings = movie.vote_average.toFixed(1);
        const id = movie.id;

        return fetchedMovies.push(
          <Movie
            key={id}
            id={id}
            releaseDate={releaseDate}
            image={image}
            ratings={ratings}
            title={title}
            getMovieDetails={getMovie}
          />
        );
      });
      if (year === "" && rating === "") {
        setEmpty(false);
        setMovies(fetchedMovies);
      }
      if (year !== "" && rating !== "") {
        let movies = fetchedMovies.filter(
          (movie) => movie.props.releaseDate.slice(0, 4) === year
        );
        movies = movies.filter(
          (movie) => movie.props.ratings.slice(0, 1) === rating
        );
        if (movies.length === 0) {
          setEmpty(true);
        } else {
          setEmpty(false);
          setMovies(movies);
        }
      }
      if (rating !== "" && year === "") {
        const movies = fetchedMovies.filter(
          (movie) => movie.props.ratings.slice(0, 1) === rating
        );
        console.log(movies);
        if (movies.length === 0) {
          setMovies(movies);
          setEmpty(true);
        } else {
          setEmpty(false);
          setMovies(movies);
        }
      }
      if (year !== "" && rating === "") {
        const movies = fetchedMovies.filter(
          (movie) => movie.props.releaseDate.slice(0, 4) === year
        );
        if (movies.length === 0) {
          setMovies(movies);
          setEmpty(true);
        } else {
          setEmpty(false);
          setMovies(movies);
        }
      }
    }
    try {
      fetchMovies();
    } catch (error) {
      console.log(error);
    }
  }, [SEARCH, searchInput, showSingleMovie, searchMovie, year, rating]);

  const filterYear = (e) => {
    setYear(e.target.value);
  };

  const filterRating = (e) => {
    setRating(e.target.value);
  };

  function closeSingleMovie() {
    setShowSingleMovie(false);
  }
  function timeConvert(min) {
    const hour = min / 60;
    const rhour = Math.trunc(hour);
    const mins = (hour - rhour) * 60;
    const rmins = Math.round(mins);
    return `${rhour}h : ${rmins}mins`;
  }

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
      <InstallPrompt />
      {!showSingleMovie && <Layout />}
      {!showSingleMovie && (
        <SearchBar
          onSubmit={formSubmitHandler}
          value={searchInput}
          onChange={searchHandler}
        />
      )}
      {!showSingleMovie && (
        <Filter
          yearValue={year}
          onChangeYear={filterYear}
          ratingValue={rating}
          onChangeRating={filterRating}
        />
      )}
      {!showSingleMovie && <MoviesList>{movies}</MoviesList>}
      {empty && (
        <p style={{ textAlign: "center" }}>
          Results unavailable. <br />
          Filter for recent years or lower ratings.
        </p>
      )}
      {showSingleMovie && movie}
    </Fragment>
  );
}

export default App;
