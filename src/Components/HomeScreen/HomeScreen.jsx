import React, { Component } from "react";
import genAlbumEle from "./genAlbumEle";
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.genAlbumEle = genAlbumEle.bind(this);
  }

  render() {
    let ftrdMssg, albumPics, ftrdProp, recentProp, processedProp, relatedTop;
    // console.log(this.props);
    //
    //
    //
    if (this.props.recent) {
      recentProp = this.props.recent.items.slice(0, 6);
      processedProp = this.genAlbumEle(recentProp, "recent");
    }
    // if (recentProp) console.log("recent", processedProp);
    if (this.props.featured) {
      ftrdProp = this.props.featured;
      // console.log(ftrdProp);
      ftrdMssg = ftrdProp.message;
      albumPics = this.genAlbumEle(
        ftrdProp.playlists.items.slice(0, 6),
        "featured"
      );
    }
    if (this.props.relatedTop) {
      relatedTop = this.genAlbumEle(this.props.relatedTop, "related");
    }
    // console.log(albumPics, processedProp, relatedTop);
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
