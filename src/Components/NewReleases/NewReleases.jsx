import React from "react";
import ContainerGenerator from "../ContainerGenerator/ContainerGenerator";

function NewReleases(props) {
  let newReleases;
  if (props.getNewReleases)
    newReleases = (
      <ContainerGenerator
        data={props.getNewReleases.albums.items}
        type={"playlists"}
      />
    );
  return (
    <div className="generator new-releases">
      <h2 className="app__fetch-title">{"New albums & singles"}</h2>
      <div className="app__fetch-container">
        {newReleases || <ContainerGenerator />}
      </div>
    </div>
  );
}

export default NewReleases;
