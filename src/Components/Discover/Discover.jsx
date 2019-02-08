import React from "react";
import GenAlbumContainer from "../GenAlbumContainer/GenAlbumContainer";

class Discover extends React.Component {
  render() {
    let discoverRender;
    console.log(
      this.props.getMultipleArtistAlbums,
      Array.isArray(this.discoverRender)
    );
    if (this.props.getMultipleArtistAlbums && !discoverRender) {
      discoverRender = this.props.getMultipleArtistAlbums
        .map(e => e.items.slice(0, 5))
        .reduce((acc, cur) => (acc = [...acc, ...cur]), []);
      console.log(discoverRender);
      this.disoverRender = (
        <GenAlbumContainer
          data={discoverRender}
          type={"playlists"}
          playerState={this.props.playerState}
          APIrequest={this.props.APIrequest}
          currPlay={this.props.currentlyPlaying}
        />
      );
      console.log("discoverRender", discoverRender);
    }
    console.log("discoverRender POST", discoverRender);

    return (
      <div className="home-screen discover">
        <h2 className="app__fetch-title home-screen__made-for-user__title">
          {"Recommended Albums & Singles"}
        </h2>
        <div className="app__fetch-container">
          {this.disoverRender || <GenAlbumContainer />}
        </div>
      </div>
    );
  }
}

export default Discover;
