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
    recentProp = recentProp.filter(e => {
      if (!hash[e.track.id]) {
        hash[e.track.id] = true;
        return true;
      } else if (hash[e.track.id]) {
        return false;
      }
    });
    //Getting rid of dupls

    processedProp = (
      <ContainerGenerator
        data={recentProp}
        type={"recent"}
        importance={"high"}
      />
    );
  }
  if (props.featured) {
    ftrdProp = props.featured;
    ftrdMssg = ftrdProp.message;
    albumPics = (
      <ContainerGenerator
        data={ftrdProp.playlists.items.slice(0, 6)}
        type={"playlists"}
        importance={"auto"}
      />
    );
  }
  if (props.relatedTop) {
    relatedTop = (
      <ContainerGenerator
        data={props.relatedTop}
        type={"playlists"}
        special={true}
        importance={"low"}
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
    <div data-testid="navHome" className="generator">
      {headlines && headlines[0]}
      {albumPics}
      {headlines && headlines[1]}
      {processedProp}
      {headlines && headlines[2]}
      {relatedTop}
    </div>
  );
}

export default HomeScreen;
