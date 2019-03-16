import React, { useContext, useEffect, useState } from "react";
import ContainerGenerator from "../ContainerGenerator/ContainerGenerator";
import { Context } from "../../Context/Context";
import HeadlineAnimator from "../Helpers/HeadlineAnimator";
import "../../Styles/Base/app.scss";

function NewReleases(props) {
  const [mount, set] = useState(false);

  const context = useContext(Context);
  let newReleases;
  useEffect(
    () => {
      if (context && !props.getNewReleases) {
        context.APIrequest("getNewReleases");
      }
      context.setCompGradient(
        "linear-gradient(105deg, #000000 20%, #7d1463 30%,#5e1330 100%)"
      );
      set(true);
    },
    [mount]
  );
  if (props.getNewReleases)
    newReleases = (
      <ContainerGenerator
        data={props.getNewReleases.albums.items}
        type={"playlists"}
      />
    );
  let headlines = ["New albums & singles"].map(e => (
    <HeadlineAnimator title={e} />
  ));
  return (
    <div
      style={{ color: "#30D95A" }}
      data-testid="navNewReleases"
      className="generator new-releases"
    >
      {headlines[0]} <div className="app__fetch-container">{newReleases}</div>
    </div>
  );
}

export default NewReleases;
