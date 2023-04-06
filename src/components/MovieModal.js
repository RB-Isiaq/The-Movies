import styles from "./MovieModal.module.css";

function MovieModal(props) {
  return (
    <div
      className={styles.backdrop}
      style={{
        backgroundImage: `linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.70),
        rgba(0, 0, 0, 0.70)
      ),
      url(${props.backdrop})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0px 0px, 50% 50%",
      }}
    >
      <button type="button" className={styles.close} onClick={props.close}>
        &times;
      </button>
      <div className={styles.movie}>
        <div className={styles.div1}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={styles.div2}>
          <h2>{props.title}</h2>
          <h4>Genres: {props.genres}</h4>
          <h4>Released date: {props.releaseDate}</h4>
          <h4>Duration: {props.duration}</h4>
          <h4>Ratings: {props.ratings}</h4>
          <p>{props.overview}</p>
          <h4>{props.tagline}</h4>
        </div>
        <button type="button" className={styles.btn}>
          <a href={props.link}>Movie page</a>
        </button>
      </div>
    </div>
  );
}

export default MovieModal;
