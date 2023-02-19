import React, { useState } from "react";

import classes from "./Filter.module.css";

const Filter = (props) => {
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const filterYear = (e) => {
    setYear(e.target.value);
    const filteredYear = e.target.value;
    console.log(filteredYear);
  };
  const filterGenre = (e) => {
    setGenre(e.target.value);
    const filteredGenre = e.target.value;
    console.log(filteredGenre);
  };

  return (
    <div className={classes.filter}>
      <h3>FIlter movies by</h3>
      <div>
        <div className={classes.filters}>
          <label>Year</label>
          <select value={props.selected} onChange={year} onSelect={filterYear}>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2019">2018</option>
            <option value="2019">2017</option>
            <option value="2019">2016</option>
          </select>
        </div>
        <div className={classes.filters}>
          <label>Genre</label>
          <select
            value={props.selected}
            onChange={genre}
            onSelect={filterGenre}
          >
            <option value="All">Action</option>
            <option value="Drama">Drama</option>
            <option value="Thriller">Thriller</option>
            <option value="Comedy">Comedy</option>
            <option value="Adventure">Adventure</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
