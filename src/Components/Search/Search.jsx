import React from "react";
import ExampleAlbum from "./ExampleAlbum";
import GenAlbumContainer from "../GenAlbumContainer/GenAlbumContainer";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchInput: "", chosenTab: "top result" };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleHighlightChange = this.handleHighlightChange.bind(this);
  }
  handleInputChange(e) {
    const value = e.target.value;
    this.setState({ searchInput: value });
    setTimeout(() => {
      this.props.APIrequest("searchQuery", { query: value });
    }, 700);
  }
  handleHighlightChange(e) {}

  render() {
    const { albums, artists, playlists, tracks } = this.props.searchQuery;
    if (playlists) {
      this.playlists = (
        <GenAlbumContainer
          data={playlists.items.slice(0, 5)}
          type={"playlists"}
          playerState={this.props.playerState}
          APIrequest={this.props.APIrequest}
          currPlay={this.state.currentlyPlaying}
        />
      );
    }
    if (artists) {
      this.artists = (
        <GenAlbumContainer
          data={artists.items.slice(0, 2)}
          type={"playlists"}
          playerState={this.props.playerState}
          APIrequest={this.props.APIrequest}
          currPlay={this.state.currentlyPlaying}
        />
      );
    }
    const searchNav = [
      "top result",
      "albums",
      "artists",
      "playlists",
      "tracks"
    ].map(e => (
      <li
        id={e}
        className={
          this.state.chosenTab === e
            ? "search-response__nav--clicked search__response-nav__li"
            : "search__response-nav__li"
        }
        onClick={e => this.setState({ chosenTab: e.target.id })}
      >
        {e}
      </li>
    ));
    return (
      <div className="search home-screen">
        <div class="search__input-row">
          <input
            autoFocus
            placeholder={"Insert your query here..."}
            value={this.state.searchInput}
            onChange={this.handleInputChange}
            type="text"
            className="search__input"
          />
          <i class="fas fa-search" />
        </div>
        {this.props.searchQuery && this.state.searchInput.length && (
          <div className="search__response">
            <ul className="search__response__nav">{searchNav}</ul>
            <h2 className="app__fetch-title">{"Top Result"}</h2>
            <ExampleAlbum
              playerState={this.state.playerState}
              currentlyPlaying={this.state.currentlyPlaying}
              albums={albums}
              tracks={tracks}
              APIrequest={this.props.APIrequest}
            />
            <h2 className="app__fetch-title">{"Matching Artists"}</h2>
            <div className="app__fetch-container ">
              {this.artists || <GenAlbumContainer />}
            </div>
            <h2 className="app__fetch-title">{"Matching Playlists"}</h2>
            <div className="app__fetch-container ">
              {this.playlists || <GenAlbumContainer />}
            </div>
          </div>
        )}
        {/* {JSON.stringify(this.props)} */}
      </div>
    );
  }
}

export default Search;
