import React from "react";
import ContainerGenerator from "../ContainerGenerator/ContainerGenerator";

function Discover(props) {
  let discoverRender;
  if (props.getMultipleArtistAlbums && !discoverRender) {
    discoverRender = props.getMultipleArtistAlbums
      .map(e => e.items.slice(0, 5))
      .reduce((acc, cur) => (acc = [...acc, ...cur]), []);
    discoverRender = (
      <ContainerGenerator data={discoverRender} type={"playlists"} />
    );
  }

  return (
    <div className="generator discover">
      <h2 className="app__fetch-title generator__title">
        {"Recommended Albums & Singles"}
      </h2>
      <div className="app__fetch-container">
        {discoverRender || <ContainerGenerator />}
      </div>
    </div>
  );
}

export default Discover;
