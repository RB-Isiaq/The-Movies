import classes from "./Movie.module.css";

function Movie(props) {
  return (
    <div className={classes.movie}>
      <div className={classes.div1}>
        <img src={props.image} alt={props.title} />
      </div>
      <div className={classes.div2}>
        <h2>{props.title}</h2>
        <h4>Release date: {props.releaseDate}</h4>
        <h4>Ratings: {props.ratings}</h4>
      </div>
      <button type="button" onClick={props.getMovieDetails} id={props.id}>
        Show Movie
      </button>
    </div>
  );
}

export default Movie;
