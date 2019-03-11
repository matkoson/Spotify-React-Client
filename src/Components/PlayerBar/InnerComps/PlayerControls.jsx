import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PlayerControls(props) {
  console.log(props);
  return (
    <div className="player-bar__tab player-bar__center-tab">
      <div className="player-bar__player-controls">
        <FontAwesomeIcon
          icon="random"
          data-testid="shuffleIcon"
          onClick={() =>
            props.APIrequest("toggleShuffle", {
              shuffle: !props.shuffled
            })
          }
          style={{ color: props.shuffled ? "#1db954" : "white" }}
          className="fas"
        />
        <FontAwesomeIcon
          data-testid="stepBackwardIcon"
          onClick={() => props.player.previousTrack()}
          icon="step-backward"
          className="fas"
        />
        <div
          data-testid="playPauseControl"
          onClick={props.handlePausePlay}
          className="player-bar__play-pause"
        >
          {props.paused || !props.playbackSDK ? (
            <FontAwesomeIcon data-testid="play" icon="play" className="fas" />
          ) : (
            <FontAwesomeIcon data-testid="pause" icon="pause" className="fas" />
          )}
        </div>
        <FontAwesomeIcon
          onClick={() => props.player.nextTrack()}
          icon="step-forward"
          className="fas"
          data-testid="stepForwardIcon"
        />
        <FontAwesomeIcon
          icon="redo"
          data-testid="repeatIcon"
          onClick={props.handleRepeatModeChange}
          className={
            props.repeatMode === "off"
              ? "fas"
              : "player-bar__redo-icon--repeat-cx fas"
          }
        >
          {props.repeatMode === "track" ? <span>1</span> : null}
        </FontAwesomeIcon>
      </div>
      <div className="player-bar__player-progress">
        <div className="player-bar__player-progress__time">
          {(props.progressTime &&
            `${props.progressTime.min}:${props.progressTime.sec}`) ||
            "00:00"}
        </div>
        <div
          id="progress-bar"
          className="player-bar__player-progress__wrapper"
          onClick={props.handleRangeChange}
          data-testid="progressBar"
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
          {(props.totalTime &&
            `${props.totalTime.min}:${props.totalTime.sec}`) ||
            "00:00"}
        </div>
      </div>
    </div>
  );
}
