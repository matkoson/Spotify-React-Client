import React, { useContext, useEffect, useState } from "react";
import ContainerGenerator from "../ContainerGenerator/ContainerGenerator";
import HeadlineAnimator from "../Helpers/HeadlineAnimator";
import { Context } from "../../Context/Context";

function HomeScreen(props) {
  const [mount, set] = useState(false);
  const context = useContext(Context);
  useEffect(
    () => {
      context.setCompGradient(
        "linear-gradient(105deg, #000000 15%, #2A0943 25%,#711c33 100%)"
      );
      set(true);
    },
    [mount]
  );

  let ftrdMssg,
    albumPics,
    ftrdProp,
    recentProp,
    processedProp,
    relatedTop,
    headlines,
    hash;
  ftrdProp = props.featured;
  ftrdMssg = ftrdProp && ftrdProp.message;
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
  }

  if (props.relatedTop && props.featured && props.recent) {
    headlines = [
      ftrdMssg,
      "Recently played",
      `More like ${props.topArtist}`
    ].map(e => <HeadlineAnimator key={e} title={e} />);
  }
  return (
    <div
      data-testid="navHome"
      className="generator"
      style={{ color: "#FB3268" }}
    >
      {headlines && headlines[0]}
      <ContainerGenerator
        key="ftrdProp"
        data={ftrdProp && ftrdProp.playlists.items.slice(0, 6)}
        type={"playlists"}
        importance={"high"}
      />

      {headlines && headlines[1]}
      <ContainerGenerator
        key="recentProp"
        data={recentProp && recentProp}
        type={"recent"}
        importance={"low"}
      />
      {headlines && headlines[2]}
      <ContainerGenerator
        key="relatedTop"
        data={props.relatedTop}
        type={"playlists"}
        special={true}
        importance={"low"}
      />
    </div>
  );
}

export default HomeScreen;
