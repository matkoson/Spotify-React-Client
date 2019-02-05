import React from "react";

export default function SideControls(props) {
  return (
    <div className="player-bar__tab player-bar__right-tab player-bar__perip-tab--end">
      <div className="player-bar__right-tab__controls">
        <i className="fas fa-list-ol" />
        <i
          style={{ color: "rgb(255, 255, 255)" }}
          onClick={props.handleDeviceTabClick}
          className="fas fa-tablet-alt"
        />
        <i className="fas fa-volume-up" />
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
      {/* <i className="fas fa-volume-mute"></i> */}
    </div>
  );
}