import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchInput: "" };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(e) {
    const inputValue = e.target.value;
    this.setState({ searchInput: inputValue });
  }
  render() {
    return (
      <div className="search home-screen">
        <input
          autoFocus
          placeholder={"Please insert your query here..."}
          value={this.state.searchInput}
          onChange={this.handleInputChange}
          type="text"
          className="search__input"
        />
      </div>
    );
  }
}

export default Search;
