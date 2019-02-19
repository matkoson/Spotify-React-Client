import React from "react";
import ContainerGenerator from "../ContainerGenerator/ContainerGenerator";
import HeadlineAnimator from "../Helpers/HeadlineAnimator";

function HomeScreen(props) {
  let ftrdMssg,
    albumPics,
    ftrdProp,
    recentProp,
    processedProp,
    relatedTop,
    headlines,
    hash;
  if (props.recent) {
    hash = {};

    recentProp = props.recent.items.slice(0, 10);
    // console.log("BEFORE", recentProp);
    recentProp = recentProp.filter(e => {
      if (!hash[e.track.id]) {
        hash[e.track.id] = true;
        return true;
      } else if (hash[e.id]) {
        return false;
      }
    });
    //Getting rid of dupls

    processedProp = (
      <ContainerGenerator data={recentProp} type={"recent"} animate={true} />
    );
  }
  if (props.featured) {
    ftrdProp = props.featured;
    ftrdMssg = ftrdProp.message;
    albumPics = (
      <ContainerGenerator
        data={ftrdProp.playlists.items.slice(0, 6)}
        type={"playlists"}
        animate={true}
      />
    );
  }
  if (props.relatedTop) {
    relatedTop = (
      <ContainerGenerator
        data={props.relatedTop}
        type={"playlists"}
        special={true}
        animate={true}
      />
    );
  }
  if (props.relatedTop && props.featured && props.recent) {
    headlines = HeadlineAnimator([
      ftrdMssg,
      "Recently played",
      `More like ${props.topArtist}`
    ]);
  }
  return (
    <div className="generator">
      {headlines && headlines[0]}
      <div className="app__fetch-container generator__playlist-container">
        {albumPics || <ContainerGenerator />}
      </div>
      {/*  */}
      {/*  */}
      {/*  */}
      {headlines && headlines[1]}
      <div className="app__fetch-container generator__playlist-container">
        {processedProp || <ContainerGenerator />}
      </div>
      {headlines && headlines[2]}
      <div className="app__fetch-container generator__playlist-container">
        {relatedTop || <ContainerGenerator />}
      </div>
    </div>
  );
}

export default HomeScreen;
