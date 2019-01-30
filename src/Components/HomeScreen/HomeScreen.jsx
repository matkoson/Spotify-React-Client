import React, { Component } from "react";
import GenAlbumEle from "./GenAlbumEle";
class HomeScreen extends Component {
  render() {
    let ftrdMssg, albumPics, ftrdProp, recentProp, processedProp, relatedTop;
    if (this.props.recent) {
      recentProp = this.props.recent.items.slice(0, 6);
      processedProp = <GenAlbumEle data={recentProp} type={"recent"} />;
    }
    if (this.props.featured) {
      ftrdProp = this.props.featured;
      ftrdMssg = ftrdProp.message;
      albumPics = (
        <GenAlbumEle
          data={ftrdProp.playlists.items.slice(0, 6)}
          type={"featured"}
        />
      );
    }
    if (this.props.relatedTop) {
      relatedTop = (
        <GenAlbumEle data={this.props.relatedTop} type={"related"} />
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
