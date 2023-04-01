import React from "react";

import classes from "./Filter.module.css";

const Filter = (props) => {
  return (
    <div className={classes.filter}>
      <h3>Filter movies by</h3>
      <div>
        <div className={classes.filters}>
          <label>Year</label>
          <select value={props.yearValue} onChange={props.onChangeYear}>
            <option value="">All</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
          </select>
        </div>
        <div className={classes.filters}>
          <label>Ratings</label>
          <select value={props.ratingValue} onChange={props.onChangeRating}>
            <option value="">All</option>
            <option value="10">10</option>
            <option value="9">9+</option>
            <option value="8">8+</option>
            <option value="7">7+</option>
            <option value="6">6+</option>
            <option value="5">5+</option>
            <option value="4">4+</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
