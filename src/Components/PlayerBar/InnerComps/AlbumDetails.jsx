import React from "react";

export default function AlbumDetails(props) {
  return (
    <div className="player-bar__tab player-bar__left-tab player-bar__perip-tab">
      <div className="player-bar__left-tab__inside-perip">
        <div className="player-bar__album-img">
          {props.albumImage && (
            <img
              src={`${props.albumImage}`}
              alt="album cover"
              height="56px"
              width="56px"
            />
          )}
        </div>
      </div>
      <div className="player-bar__tab player-bar__left-tab__center">
        <span className="player-bar__left-tab__center-title-artist__title">
          {props.songTitle}
        </span>
        <span className="player-bar__left-tab__center-title-artist__artist">
          {props.artistName}
        </span>
      </div>
    </div>
  );
}
