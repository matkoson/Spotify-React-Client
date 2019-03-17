import React from "react";
import ContainerGenerator from "../ContainerGenerator/ContainerGenerator";
import { Context } from "../../Context/Context";
import "../../Styles/Base/app.scss";
import "../../Styles/Components/library.scss";

class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chosenTab: "PLAYLISTS" };
  }
  componentDidMount() {
    this.context.APIrequest("getUserPlaylists");
    this.context.APIrequest("getUserSavedAlbums");
    this.context.APIrequest("getUserSavedTracks");
    this.context &&
      this.context.setCompGradient(
        "linear-gradient(105deg, #000000 15%, #282828 100%)"
      );
  }
  render() {
    let renderLib;
    switch (this.state.chosenTab) {
      case "ALBUMS":
        renderLib = (
          <React.Fragment>
            <h2 className="app__fetch-title">{"Your Saved Albums"}</h2>
            {this.props.getUserSavedAlbums && (
              <ContainerGenerator
                data={this.props.getUserSavedAlbums.items
                  .map(e => e.album)
                  .slice(0, 20)}
                type={"playlists"}
              />
            )}
          </React.Fragment>
        );
        break;
      case "TRACKS":
        renderLib = (
          <React.Fragment>
            <h2 className="app__fetch-title">{"Your Saved Tracks"}</h2>
            {this.props.getUserSavedTracks && (
              <ContainerGenerator
                data={this.props.getUserSavedTracks.items}
                type={"playlists"}
              />
            )}
          </React.Fragment>
        );
        break;
      default:
        renderLib = (
          <React.Fragment>
            <h2 className="app__fetch-title">{"Your Saved Playlists"}</h2>
            <div className="app__fetch-container ">
              {this.props.getUserPlaylists && (
                <ContainerGenerator
                  data={this.props.getUserPlaylists.items.slice(0, 20)}
                  type={"playlists"}
                />
              )}
            </div>
          </React.Fragment>
        );
    }
    const libNav = ["PLAYLISTS", "ALBUMS", "TRACKS"].map(e => (
      <li
        key={e}
        id={e}
        onClick={e => this.setState({ chosenTab: e.target.id })}
        className={
          this.state.chosenTab === e
            ? "library__nav--clicked library__nav__li"
            : "library__nav__li"
        }
      >
        {e}
      </li>
    ));
    return (
      <div
        data-testid="navLibrary"
        className="library app__right-container-generic__outer"
      >
        <ul className="app__right-container-generic__outer__right-nav library__nav">
          {libNav}
        </ul>
        <div className="generator">{renderLib}</div>
      </div>
    );
  }
}
Library.contextType = Context;

export default Library;
