import classes from "./SearchBar.module.css";

function SearchBar(props) {
  return (
    <form className={classes["search-container"]} onSubmit={props.onSubmit}>
      <input
        type="search"
        id="search"
        placeholder="Search"
        onChange={props.onChange}
        value={props.value}
      />
    </form>
  );
}

export default SearchBar;
