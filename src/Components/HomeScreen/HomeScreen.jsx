import React from "react";
import ContainerGenerator from "../ContainerGenerator/ContainerGenerator";

function HomeScreen(props) {
  let ftrdMssg, albumPics, ftrdProp, recentProp, processedProp, relatedTop;
  if (props.recent) {
    recentProp = props.recent.items.slice(0, 6);
    processedProp = <ContainerGenerator data={recentProp} type={"recent"} />;
  }
  if (props.featured) {
    ftrdProp = props.featured;
    ftrdMssg = ftrdProp.message;
    albumPics = (
      <ContainerGenerator
        data={ftrdProp.playlists.items.slice(0, 6)}
        type={"playlists"}
      />
    );
  }
  if (props.relatedTop) {
    relatedTop = (
      <ContainerGenerator
        data={props.relatedTop}
        type={"playlists"}
        special={true}
      />
    );
  }
  return (
    <div className="generator">
      <h2 className="app__fetch-title generator__title">
        {ftrdMssg ? ftrdMssg : null}
      </h2>
      <div className="app__fetch-container generator__playlist-container">
        {albumPics || <ContainerGenerator />}
      </div>
      {/*  */}
      {/*  */}
      {/*  */}
      <h2 className="app__fetch-title">Recently played</h2>
      <div className="app__fetch-container generator__playlist-container">
        {processedProp || <ContainerGenerator />}
      </div>
      <h2 className="app__fetch-title">More like {props.topArtist}</h2>
      <div className="app__fetch-container generator__playlist-container">
        {relatedTop || <ContainerGenerator />}
      </div>
    </div>
  );
}

export default HomeScreen;
