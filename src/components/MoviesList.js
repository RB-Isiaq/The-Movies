// import { useEffect, useState } from "react";
import classes from "./MoviesList.module.css";
// import Movie from "./Movie";

const MoviesList = (props) => {
  // const [movies, setMovies] = useState([]);
  // const API_KEY = "a23c40820ded910fd30f9f739307f06e";
  // // const BASE_URL = "https://api.themoviedb.org/3";
  // // const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`;
  // const API_URL1 = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
  // const IMG_URL = "https://image.tmdb.org/t/p/w500/";

  // let fetchedMovies = [];

  // useEffect(() => {
  //   async function fetchMovies() {
  //     const res = await fetch(API_URL1);
  //     const data = await res.json();
  //     const movies = data.results;

  //     movies.map((movie) => {
  //       const title = movie.title;
  //       const overview = movie.overview;
  //       const releaseDate = movie.release_date;
  //       const image = `${IMG_URL}${movie.poster_path}`;
  //       // const backdropPath = movie.backdrop_path;
  //       const ratings = movie.vote_average;
  //       const id = movie.id;
  //       const genres = movie.genres_id;

  //       return fetchedMovies.push(
  //         <Movie
  //           key={id}
  //           id={id}
  //           overview={overview}
  //           releaseDate={releaseDate}
  //           genres={genres}
  //           image={image}
  //           ratings={ratings}
  //           title={title}
  //         />
  //       );
  //     });
  //     setMovies(fetchedMovies);
  //   }
  //   try {
  //     fetchMovies();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [fetchedMovies, API_URL1, movies]);

  return (
    <div className={classes.movies}>
      <h2>Popular Movies</h2>
      <div>
        <ul>{props.children}</ul>
      </div>
    </div>
  );
};

export default MoviesList;
