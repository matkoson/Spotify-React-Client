import React from "react";
import ExampleAlbum from "./ExampleAlbum";
import ContainerGenerator from "../ContainerGenerator/ContainerGenerator";
import { Context } from "../../Context/Context";

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
      this.context.APIrequest("searchQuery", { query: value });
    }, 200);
  }
  handleHighlightChange(e) {}

  render() {
    const { albums, artists, playlists, tracks } = this.props.searchQuery;
    let resultRender;
    switch (this.state.chosenTab) {
      case "albums":
        resultRender = (
          <React.Fragment>
            <h2 className="app__fetch-title">{"Matching Albums"}</h2>
            <div className="app__fetch-container ">
              {this.albums || <ContainerGenerator />}
            </div>
          </React.Fragment>
        );
        break;
      case "artists":
        resultRender = (
          <React.Fragment>
            <h2 className="app__fetch-title">{"Matching Artists"}</h2>
            <div className="app__fetch-container ">
              {(
                <ContainerGenerator
                  data={artists.items.slice(0, 10)}
                  type={"playlists"}
                />
              ) || <ContainerGenerator />}
            </div>
          </React.Fragment>
        );
        break;
      case "tracks":
        resultRender = (
          <React.Fragment>
            <h2 className="app__fetch-title">{"Matching Tracks"}</h2>
            <div className="app__fetch-container ">
              {(
                <ContainerGenerator
                  data={tracks.items.slice(0, 100)}
                  type={"playlists"}
                />
              ) || <ContainerGenerator />}
            </div>
          </React.Fragment>
        );
        break;
      case "playlists":
        resultRender = (
          <React.Fragment>
            <h2 className="app__fetch-title">{"Matching Artists"}</h2>
            <div className="app__fetch-container generator--exception">
              {this.playlists || <ContainerGenerator />}
            </div>
          </React.Fragment>
        );
        break;
      default:
        resultRender = (
          <React.Fragment>
            <h2 className="app__fetch-title">{"Top Result"}</h2>
            <ExampleAlbum
              playerState={this.context.playerState}
              currentlyPlaying={this.context.currentlyPlaying}
              albums={albums}
              getMinsSecs={this.context.getMinsSecs}
              tracks={tracks}
              APIrequest={this.context.APIrequest}
            />
            <h2 className="app__fetch-title">{"Matching Artists"}</h2>
            <div className="app__fetch-container generator--exception">
              {this.artists || <ContainerGenerator />}
            </div>
            <h2 className="app__fetch-title">{"Matching Playlists"}</h2>
            <div className="app__fetch-container ">
              {this.playlists || <ContainerGenerator />}
            </div>
          </React.Fragment>
        );
    }
    if (playlists) {
      this.playlists = (
        <ContainerGenerator
          data={playlists.items.slice(0, 5)}
          type={"playlists"}
        />
      );
    }
    if (artists) {
      this.artists = (
        <ContainerGenerator
          data={artists.items.slice(0, 2)}
          type={"playlists"}
        />
      );
    }
    if (albums) {
      this.albums = (
        <ContainerGenerator
          data={albums.items.slice(0, 50)}
          type={"playlists"}
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
            ? "search__response__nav--clicked search__response__nav__li"
            : "search__response__nav__li"
        }
        onClick={e => this.setState({ chosenTab: e.target.id })}
      >
        {e}
      </li>
    ));
    return (
      <div className="search generator">
        <div class="search__input">
          <input
            autoFocus
            placeholder={"Insert your query..."}
            value={this.state.searchInput}
            onChange={this.handleInputChange}
            type="text"
            className="search__input__area"
          />
          <i class="fas fa-search" />
        </div>
        {this.props.searchQuery &&
          (this.state.searchInput && (
            <div className="search__response">
              <ul className="search__response__nav">{searchNav}</ul>
              {resultRender}
            </div>
          ))}
      </div>
    );
  }
}
Search.contextType = Context;

export default Search;
