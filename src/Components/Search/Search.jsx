import React from "react";
import ExampleAlbum from "./ExampleAlbum";
import ContainerGenerator from "../ContainerGenerator/ContainerGenerator";
import { Context } from "../../Context/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../Styles/Base/app.scss";
import "../../Styles/Components/search.scss";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchInput: "", chosenTab: "top result" };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(e) {
    const value = e.target.value;
    this.setState({ searchInput: value });
    setTimeout(() => {
      this.context.APIrequest &&
        this.context.APIrequest("searchQuery", { query: value });
    }, 1000);
  }

  render() {
    if (this.props.searchQuery)
      var { albums, artists, playlists, tracks } = this.props.searchQuery;
    let resultRender;
    switch (this.state.chosenTab) {
      case "albums":
        resultRender = (
          <React.Fragment>
            <h2 className="app__fetch-title">{"Matching Albums"}</h2>
            <div className="app__fetch-container ">{this.albums}</div>
          </React.Fragment>
        );
        break;
      case "artists":
        resultRender = (
          <React.Fragment>
            <h2 className="app__fetch-title">{"Matching Artists"}</h2>
            <div className="app__fetch-container ">
              {artists && (
                <ContainerGenerator
                  data={artists.items.slice(0, 10)}
                  type={"playlists"}
                />
              )}
            </div>
          </React.Fragment>
        );
        break;
      case "tracks":
        resultRender = (
          <React.Fragment>
            <h2 className="app__fetch-title">{"Matching Tracks"}</h2>
            <div className="app__fetch-container ">
              {tracks && (
                <ContainerGenerator
                  data={tracks.items.slice(0, 100)}
                  type={"playlists"}
                />
              )}
            </div>
          </React.Fragment>
        );
        break;
      case "playlists":
        resultRender = (
          <React.Fragment>
            <h2 className="app__fetch-title">{"Matching Playlists"}</h2>
            <div className="app__fetch-container generator--exception">
              {this.playlists}
            </div>
          </React.Fragment>
        );
        break;
      default:
        resultRender = (
          <React.Fragment>
            <h2 className="app__fetch-title">{"Top Result"}</h2>
            <ExampleAlbum
              handleAlbumRightOverride={this.context.handleAlbumRightOverride}
              playerState={this.context.playerState}
              currentlyPlaying={this.context.currentlyPlaying}
              albums={albums}
              getMinsSecs={this.context.getMinsSecs}
              tracks={tracks}
              APIrequest={this.context.APIrequest}
              player={this.props.player}
            />
            <h2 className="app__fetch-title">{"Matching Artists"}</h2>
            <div className="app__fetch-container generator--exception">
              {this.artists}
            </div>
            <h2 className="app__fetch-title">{"Matching Playlists"}</h2>
            <div className="app__fetch-container ">{this.playlists}</div>
          </React.Fragment>
        );
    }
    this.playlists = (
      <ContainerGenerator
        data={playlists && playlists.items.slice(0, 5)}
        type={"playlists"}
      />
    );
    this.artists = (
      <ContainerGenerator
        data={artists && artists.items.slice(0, 2)}
        type={"playlists"}
      />
    );
    this.albums = (
      <ContainerGenerator
        data={albums && albums.items.slice(0, 5)}
        type={"playlists"}
      />
    );
    const searchNav = [
      "top result",
      "albums",
      "artists",
      "playlists",
      "tracks"
    ].map(e => (
      <li
        key={e}
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
      <div data-testid="navSearch" className="search generator">
        <div className="search__input">
          <input
            autoFocus
            placeholder={"Insert your query..."}
            value={this.state.searchInput}
            onChange={this.handleInputChange}
            type="text"
            className="search__input__area"
          />
          <FontAwesomeIcon icon="search" />
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
