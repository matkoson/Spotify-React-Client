import React from "react";
import GenAlbumContainer from "../GenAlbumContainer/GenAlbumContainer";

function Discover(props) {
  let discoverRender;
  if (props.getMultipleArtistAlbums && !discoverRender) {
    discoverRender = props.getMultipleArtistAlbums
      .map(e => e.items.slice(0, 5))
      .reduce((acc, cur) => (acc = [...acc, ...cur]), []);
    discoverRender = (
      <GenAlbumContainer data={discoverRender} type={"playlists"} />
    );
  }

  return (
    <div className="home-screen discover">
      <h2 className="app__fetch-title home-screen__made-for-user__title">
        {"Recommended Albums & Singles"}
      </h2>
      <div className="app__fetch-container">
        {discoverRender || <GenAlbumContainer />}
      </div>
    </div>
  );
}

export default Discover;
