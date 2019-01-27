import React, { Component } from "react";

class PlayerBar extends Component {
  render() {
    return (
      <div className="player-bar">
        {/*  */}
        <div className="player-bar__tab player-bar__left-tab player-bar__perip-tab">
          <div className="player-bar__left-tab__inside-perip">
            <div className="player-bar__album-img" />
          </div>
          <div className="player-bar__tab player-bar__left-tab__center">
            <span className="player-bar__left-tab__center-title-artist__title">
              All I Want
            </span>
            <span className="player-bar__left-tab__center-title-artist__artist">
              The Offspring
            </span>
          </div>
          <div className="player-bar__tab player-bar__left-tab__perip">
            <i className="fas fa-plus" />
          </div>
        </div>

        {/*  */}
        <div className="player-bar__tab player-bar__center-tab">
          <div className="player-bar__player-controls">
            <i className="fas fa-random" />
            <i className="fas fa-step-backward" />
            {/* <i className="fas fa-pause player__play-pause" /> */}
            <i class="fas fa-play player__play-pause" />
            <i className="fas fa-step-forward" />
            <i className="fas fa-redo" />
          </div>
          <div className="player-bar__player-progress">
            <div className="player-bar__player-progress__time">00:00</div>
            <div className="player-bar__player-progress__bar player-bar__progress-bar" />
            <div className="player-bar__player-progress__time">00:00</div>
          </div>
        </div>
        {/*  */}

        <div className="player-bar__tab player-bar__right-tab player-bar__perip-tab">
          <div class="player-bar__right-tab__controls">
            <i className="fas fa-list-ol" />
            <i className="fas fa-tablet-alt" />
            <i className="fas fa-volume-up" />
          </div>
          <div className="player-bar__right-tab_volume-bar player-bar__progress-bar" />
          {/* <i class="fas fa-volume-mute"></i> */}
        </div>
      </div>
    );
  }
}

export default PlayerBar;
