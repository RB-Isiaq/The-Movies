import classes from "./MoviesList.module.css";

const MoviesList = (props) => {

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
