import React, { useContext, useEffect } from "react";
import ContainerGenerator from "../ContainerGenerator/ContainerGenerator";
import { Context } from "../../Context/Context";
import HeadlineAnimator from "../Helpers/HeadlineAnimator";
import "../../Styles/Base/app.scss";

function NewReleases(props) {
  const context = useContext(Context);
  let newReleases;
  useEffect(() => {
    if (context && !props.getNewReleases) {
      context.APIrequest("getNewReleases");
    }
  });
  if (props.getNewReleases)
    newReleases = (
      <ContainerGenerator
        data={props.getNewReleases.albums.items}
        type={"playlists"}
      />
    );
  let headlines = ["New albums & singles"];
  headlines = HeadlineAnimator(headlines);
  return (
    <div data-testid="navNewReleases" className="generator new-releases">
      {headlines[0]} <div className="app__fetch-container">{newReleases}</div>
    </div>
  );
}

export default NewReleases;
