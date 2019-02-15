import React from "react";
import ContainerGenerator from "../ContainerGenerator/ContainerGenerator";
import { Context } from "../../Context/Context";

class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chosenTab: "PLAYLISTS" };
  }
  componentDidMount() {
    this.context.APIrequest("getUserPlaylists");
    this.context.APIrequest("getUserSavedAlbums");
    this.context.APIrequest("getUserSavedTracks");
  }
  render() {
    // console.log("PROPS", this.props);
    if (this.props.getUserPlaylists) {
      //   console.log("PROPS IN");
      this.userPlaylists = (
        <React.Fragment>
          <h2 className="app__fetch-title">{"Your Saved Playlists"}</h2>
          <div className="app__fetch-container ">
            {(
              <ContainerGenerator
                data={this.props.getUserPlaylists.items}
                type={"playlists"}
              />
            ) || <ContainerGenerator />}
          </div>
        </React.Fragment>
      );
    }
    if (this.props.getUserSavedAlbums) {
      this.savedAlbums = (
        <React.Fragment>
          <h2 className="app__fetch-title">{"Your Saved Albums"}</h2>
          <div className="app__fetch-container ">
            {(
              <ContainerGenerator
                data={this.props.getUserSavedAlbums.items.map(e => e.album)}
                type={"playlists"}
              />
            ) || <ContainerGenerator />}
          </div>
        </React.Fragment>
      );
    }
    if (this.props.getUserSavedTracks) {
      this.savedTracks = (
        <React.Fragment>
          <h2 className="app__fetch-title">{"Your Saved Tracks"}</h2>
          <div className="app__fetch-container ">
            {(
              <ContainerGenerator
                data={this.props.getUserSavedTracks.items.map(e => e.track)}
                type={"playlists"}
              />
            ) || <ContainerGenerator />}
          </div>
        </React.Fragment>
      );
    }
    let renderLib;
    switch (this.state.chosenTab) {
      case "ALBUMS":
        renderLib = this.savedAlbums;
        break;
      case "TRACKS":
        renderLib = this.savedTracks;
        break;
      default:
        renderLib = this.userPlaylists;
    }
    const libNav = ["PLAYLISTS", "ALBUMS", "TRACKS"].map(e => (
      <li
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
      <div className="library app__right-container-generic__outer">
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
