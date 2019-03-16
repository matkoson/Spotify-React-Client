import React, { useContext, useEffect, useState } from "react";
import ContainerGenerator from "../ContainerGenerator/ContainerGenerator";
import HeadlineAnimator from "../Helpers/HeadlineAnimator";
import { Context } from "../../Context/Context";
import "../../Styles/Base/app.scss";
function Discover(props) {
  const context = useContext(Context);
  const [mount, set] = useState(false);

  useEffect(
    () => {
      context.setCompGradient(
        "linear-gradient(105deg, #000000 30%, #602227 40%,#CE3639 100%)"
      );
      set(true);
      if (
        props.getMultipleArtistAlbums &&
        !props.getMultipleArtistAlbums.length
      ) {
        if (context)
          context.APIrequest("getMultipleArtists", { ids: props.idList });
      }
    },
    [mount]
  );
  let discoverRender;
  if (!discoverRender && props.getMultipleArtistAlbums) {
    discoverRender = props.getMultipleArtistAlbums
      .map(e => e.items)
      .reduce((acc, cur) => {
        return (acc = [...acc, ...cur]);
      }, []);
    discoverRender = (
      <ContainerGenerator
        data={discoverRender.slice(0, 5)}
        type={"playlists"}
      />
    );
  }
  let headlines = ["Recommended Albums & Singles"].map(e => (
    <HeadlineAnimator title={e} />
  ));
  return (
    <div
      style={{ color: "#3ACCDF" }}
      data-testid="navDiscover"
      className="generator discover"
    >
      {headlines[0]}
      <div className="app__fetch-container">{discoverRender}</div>
    </div>
  );
}

export default Discover;
