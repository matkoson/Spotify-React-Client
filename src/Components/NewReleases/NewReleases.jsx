import React from "react";
import GenAlbumContainer from "../GenAlbumContainer/GenAlbumContainer";

class NewReleases extends React.Component {
  // componentDidMount() {
  //   console.log(this.props.getNewReleases);
  // }
  render() {
    console.log(this.props.getNewReleases);
    if (this.props.getNewReleases)
      this.newReleases = (
        <GenAlbumContainer
          data={this.props.getNewReleases.albums.items}
          type={"playlists"}
          playerState={this.props.playerState}
          APIrequest={this.props.APIrequest}
          currPlay={this.props.currentlyPlaying}
        />
      );
    return (
      <div className="new-releases home-screen">
        <h2 className="app__fetch-title">{"New albums & singles"}</h2>
        <div className="app__fetch-container">
          {this.newReleases || <GenAlbumContainer />}
        </div>
      </div>
    );
  }
}

export default NewReleases;
