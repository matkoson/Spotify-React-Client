import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PlayerControls(props) {
  return (
    <div className="player-bar__tab player-bar__center-tab">
      <div className="player-bar__player-controls">
        <FontAwesomeIcon
          icon="random"
          onClick={() =>
            this.props.APIrequest("toggleShuffle", {
              shuffle: !props.shuffled
            })
          }
          style={{ color: props.shuffled ? "#1db954" : "white" }}
        />

        {/* <i

          className="fas fa-random"
        /> */}
        {/* <i
          onClick={() => props.player.previousTrack()}
          className="fas fa-step-backward"
        /> */}
        <FontAwesomeIcon icon="step-backward" />

        <div onClick={props.handlePausePlay} className="player-bar__play-pause">
          {props.paused || !props.playbackSDK ? (
            // <i className="fas fa-play player__play-pause" />
            <FontAwesomeIcon icon="play" />
          ) : (
            // <i className="fas fa-pause player__play-pause" />
            <FontAwesomeIcon icon="pause" />
          )}
        </div>
        {/* */}
        {/* <i
          className="fas fa-step-forward"
        /> */}
        <FontAwesomeIcon
          onClick={() => props.player.nextTrack()}
          icon="step-forward"
        />

        {/* <i
          onClick={props.handleRepeatModeChange}
          className={
            props.repeatMode === "off"
              ? "fas fa-redo"
              : "fas fa-redo player-bar__redo-icon--repeat-cx"
          }
        > */}
        <FontAwesomeIcon
          icon="redo"
          onClick={props.handleRepeatModeChange}
          className={
            props.repeatMode === "off" ? "" : "player-bar__redo-icon--repeat-cx"
          }
        >
          {props.repeatMode === "track" ? <span>1</span> : null}
        </FontAwesomeIcon>
      </div>
      <div className="player-bar__player-progress">
        <div className="player-bar__player-progress__time">
          {props.progressTime &&
            `${props.progressTime.min}:${props.progressTime.sec}`}
        </div>
        <div
          id="progress-bar"
          className="player-bar__player-progress__wrapper"
          onClick={props.handleRangeChange}
        >
          <div className="player-bar__player-progress__bar player-bar__progress-bar player-bar__progress-bar--static">
            <div
              style={{
                left: `-${props.progressPercentage}%`,
                transitionDuration: "0.3s",
                transitionTimingFunction: "cubic-bezier(1,0,.7,1)"
              }}
              className="player-bar__progress-bar player-bar__progress-bar--dynamic"
            />
          </div>
        </div>
        <div className="player-bar__player-progress__time">
          {props.totalTime && `${props.totalTime.min}:${props.totalTime.sec}`}
        </div>
      </div>
    </div>
  );
}
