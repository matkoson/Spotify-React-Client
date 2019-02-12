import React from "react";

export const Context = React.createContext({
  APIrequest() {},
  currentlyPlaying: "",
  playerState: "",
  handleAlbumRightOverride() {}
});

export const Provider = Context.Provider;
export const Consumer = Context.Consumer;
