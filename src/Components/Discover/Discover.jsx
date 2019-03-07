import React, { useContext, useEffect } from "react";
import ContainerGenerator from "../ContainerGenerator/ContainerGenerator";
import HeadlineAnimator from "../Helpers/HeadlineAnimator";
import { Context } from "../../Context/Context";
import "../../Styles/Base/app.scss";

function Discover(props) {
  const context = useContext(Context);
  useEffect(() => {
    if (context && !props.getMultipleArtistAlbums.length) {
      context.APIrequest("getMultipleArtists", { ids: props.idList });
    }
  });
  let discoverRender;
  if (props.getMultipleArtistAlbums.length) {
    discoverRender = props.getMultipleArtistAlbums
      .map(e => e.items)
      .reduce((acc, cur) => (acc = [...acc, ...cur]), []);
    discoverRender = (
      <ContainerGenerator
        data={discoverRender.slice(0, 5)}
        type={"playlists"}
        animate={true}
      />
    );
  }
  let headlines = ["Recommended Albums & Singles"];
  headlines = HeadlineAnimator(headlines);
  return (
    <div data-testid="navDiscover" className="generator discover">
      {headlines[0]}
      <div className="app__fetch-container">{discoverRender}</div>
    </div>
  );
}

export default Discover;
