import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SideControls(props) {
  return (
    <div className="player-bar__tab player-bar__right-tab player-bar__perip-tab--end">
      <div className="player-bar__right-tab__controls">
        <FontAwesomeIcon
          className="fas"
          icon="tablet"
          data-testid="deviceTabOnIcon"
          style={
            props.isDeviceTabOn
              ? { color: "#1db954" }
              : { color: "rgb(255, 255, 255)" }
          }
          onClick={props.handleDeviceTabClick}
        />
        <div
          className="player-bar__right-tab__volume"
          onClick={props.handleMute}
        >
          {props.muted ? (
            <FontAwesomeIcon icon="volume-mute" className="fas" />
          ) : (
            <FontAwesomeIcon icon="volume-up" className="fas" />
          )}
        </div>
      </div>
      <div
        id="volume-bar"
        className="player-bar__volume-wrapper"
        onClick={props.handleRangeChange}
      >
        <div className="player-bar__right-tab_volume-bar player-bar__progress-bar player-bar__progress-bar--static">
          <div
            style={{ left: `-${100 - props.volumePercentage}%` }}
            className="player-bar__progress-bar player-bar__progress-bar--dynamic "
          />
        </div>
      </div>
      {props.children}
    </div>
  );
}
