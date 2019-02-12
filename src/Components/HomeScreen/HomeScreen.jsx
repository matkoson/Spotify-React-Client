import React from "react";
import GenAlbumContainer from "../GenAlbumContainer/GenAlbumContainer";

  function HomeScreen(props) {
    let ftrdMssg, albumPics, ftrdProp, recentProp, processedProp, relatedTop;
    if (props.recent) {
      recentProp = props.recent.items.slice(0, 6);
      processedProp = (
        <GenAlbumContainer
          data={recentProp}
          type={"recent"}
        />
      );
    }
    if (props.featured) {
      ftrdProp = props.featured;
      ftrdMssg = ftrdProp.message;
      albumPics = (
        <GenAlbumContainer
          data={ftrdProp.playlists.items.slice(0, 6)}
          type={"playlists"}
        />
      );
    }
    if (props.relatedTop) {
      relatedTop = (
        <GenAlbumContainer
          data={props.relatedTop}
          type={"playlists"}
          special={true}
        />
      );
    }
    return (
      <div className="home-screen">
        <h2 className="app__fetch-title home-screen__made-for-user__title">
          {ftrdMssg ? ftrdMssg : null}
        </h2>
        <div className="app__fetch-container home-screen__made-for-user__playlist-container">
          {albumPics || <GenAlbumContainer />}
        </div>
        {/*  */}
        {/*  */}
        {/*  */}
        <h2 className="app__fetch-title home-screen__recently-played">
          Recently played
        </h2>
        <div className="app__fetch-container home-screen__made-for-user__playlist-container">
          {processedProp || <GenAlbumContainer />}
        </div>
        <h2 className="app__fetch-title home-screen__recommendation">
          More like {props.topArtist}
        </h2>
        <div className="app__fetch-container home-screen__made-for-user__playlist-container">
          {relatedTop || <GenAlbumContainer />}
        </div>
      </div>
    );
}

export default HomeScreen;
