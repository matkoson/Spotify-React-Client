import React, { useContext, useEffect } from "react";
import ContainerGenerator from "../ContainerGenerator/ContainerGenerator";
import { Context } from "../../Context/Context";

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
