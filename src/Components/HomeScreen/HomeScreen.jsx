import React, { Component } from "react";
import GenAlbumContainer from "../GenAlbumContainer/GenAlbumContainer";
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { playerState: "" };
  }

  render() {
    let ftrdMssg, albumPics, ftrdProp, recentProp, processedProp, relatedTop;
    if (this.props.recent) {
      recentProp = this.props.recent.items.slice(0, 6);
      // console.log(this.props.recent, "recent");
      processedProp = (
        <GenAlbumContainer
          playerState={this.props.playerState}
          APIrequest={this.props.APIrequest}
          data={recentProp}
          type={"recent"}
          currPlay={this.props.currentlyPlaying}
        />
      );
    }
    if (this.props.featured) {
      ftrdProp = this.props.featured;
      ftrdMssg = ftrdProp.message;
      albumPics = (
        <GenAlbumContainer
          playerState={this.props.playerState}
          APIrequest={this.props.APIrequest}
          data={ftrdProp.playlists.items.slice(0, 6)}
          type={"playlists"}
          currPlay={this.props.currentlyPlaying}
        />
      );
    }
    if (this.props.relatedTop) {
      relatedTop = (
        <GenAlbumContainer
          playerState={this.props.playerState}
          APIrequest={this.props.APIrequest}
          data={this.props.relatedTop}
          type={"playlists"}
          currPlay={this.props.currentlyPlaying}
        />
      );
    }
    return (
      <div className="home-screen">
        <h2 className="app__fetch-title home-screen__made-for-user__title">
          {ftrdMssg ? ftrdMssg : null}
        </h2>
        <div className="app__fetch-container home-screen__made-for-user__playlist-container">
          {albumPics}
        </div>
        {/*  */}
        {/*  */}
        {/*  */}
        <h2 className="app__fetch-title home-screen__recently-played">
          Recently played
        </h2>
        <div className="app__fetch-container home-screen__made-for-user__playlist-container">
          {processedProp}
        </div>
        <h2 className="app__fetch-title home-screen__recommendation">
          More like {this.props.topArtist}
        </h2>
        <div className="app__fetch-container home-screen__made-for-user__playlist-container">
          {relatedTop}
        </div>
      </div>
    );
  }
}

export default HomeScreen;
