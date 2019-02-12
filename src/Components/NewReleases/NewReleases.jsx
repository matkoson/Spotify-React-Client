import React from "react";
import GenAlbumContainer from "../GenAlbumContainer/GenAlbumContainer";

function NewReleases(props) {
  let newReleases;
  if (props.getNewReleases)
    newReleases = (
      <GenAlbumContainer
        data={props.getNewReleases.albums.items}
        type={"playlists"}
      />
    );
  return (
    <div className="new-releases home-screen">
      <h2 className="app__fetch-title">{"New albums & singles"}</h2>
      <div className="app__fetch-container">
        {newReleases || <GenAlbumContainer />}
      </div>
    </div>
  );
}

export default NewReleases;
