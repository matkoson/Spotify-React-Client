import React, { PureComponent } from "react";

const getMinsSecs = (ms = 0) => {
  // console.log(ms);
  ms = (ms - (ms % 1000)) / 1000;
  return {
    min: String(
      Math.floor(ms / 60) < 10 ? `0${Math.floor(ms / 60)}` : Math.floor(ms / 60)
    ),
    sec: String(ms % 60 < 10 ? `0${ms % 60}` : ms % 60)
  };
};
const getPerc = (progressTime, totalTime) =>
  100 - (progressTime / totalTime) * 100;
let totalTime, progressTime;

class PlayerBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      playing: "",
      songProgress: getMinsSecs(0),
      albumImage: "", //1
      songTitle: "", //2
      artistName: "", //3
      repeatMode: "", //4
      rawTrackTime: "", //5
      rawTrackProgress: "", //6
      volumePercentage: "", //7
      progressPercentage: "", //8
      distanceTotal: "",
      paused: false,
      shuffled: false
    };
    this.audio = React.createRef();
    this.repeatMode = ["off", "context", "track"];

    //
    this.handlePausePlay = this.handlePausePlay.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.handleRepeatModeChange = this.handleRepeatModeChange.bind(this);
    this.playbackSDKinterval = this.playbackSDKinterval.bind(this);
  }
  componentDidUpdate() {
    //at first viable update, while SDK is still not acitve, display the info from the last played track
    if (!this.props.SDK && this.props.recent) {
      const lastTrack = this.props.recent.track;
      this.setState({
        albumImage: lastTrack.album.images[0].url, //1
        songTitle: lastTrack.name, //2
        artistName: lastTrack.artists[0].name, //3
        repeatMode: "off", //4
        rawTrackTime: lastTrack.duration_ms, //5
        rawTrackProgress: 0, //6
        volumePercentage: 100, //7
        paused: false
      });
    } else if (this.props.SDK && !this.player) {
      //if I have the player ready
      this.player = this.props.SDK;
    } else if (this.player) {
      if (!this.playbackSDK) {
        this.playbackSDKinterval();
      }
    }
  }

  playbackSDKinterval() {
    this.playbackSDK = setInterval(() => {
      this.player.getCurrentState().then(state => {
        if (state) {
          // console.log("SDK updated, state:", state);
          const trackPlaying = state.track_window.current_track;
          return this.setState(prevState => {
            console.log("state", state, "prevState", prevState);
            if (prevState.songTitle !== trackPlaying.name)
              this.props.APIrequest("currentlyPlaying");
            return {
              albumImage: trackPlaying.album.images[0].url, //1
              songTitle: trackPlaying.name, //2
              artistName: trackPlaying.artists[0].name, //3
              repeatMode: this.repeatMode[state.repeat_mode], //4
              rawTrackTime: trackPlaying.duration_ms, //5
              rawTrackProgress: state.position, //6
              processedProgress: getMinsSecs(
                prevState && prevState.rawTrackProgress
              ),
              paused: state.paused,
              shuffled: state.shuffle
            };
          });
        } else {
          console.log("No playback on SDK");
          clearInterval(this.playbackSDK);
          this.playbackSDK = null;
        }
      });
    }, 1000);
  }

  handlePausePlay(e) {
    console.log(this.playbackSDK, this.props.recent, "recent");
    if (this.player) {
      if (this.state.paused) {
        if (!this.playbackSDK) {
          this.props.APIrequest("playRecentTracks", {
            cx: this.props.recent.track.uri
          });
        } else {
          this.player.resume().then(() => this.setState({ paused: false }));
        }
      } else {
        this.player.pause().then(() => this.setState({ paused: true }));
      }
    }
  }

  handleRangeChange(e) {
    console.log(e.currentTarget.id);
    const targetId = e.currentTarget.id;
    const targetMeasure = e.target.getBoundingClientRect();
    const beginning = targetMeasure.left;
    const end = targetMeasure.left + targetMeasure.width;
    const eventMeasure = e.clientX;
    let desiredProg;
    //
    if (this.player) {
      if (targetId === "progress-bar") {
        desiredProg = ((eventMeasure - beginning) / (end - beginning)) * 100;
        const desiredMs =
          Math.round(desiredProg * this.state.rawTrackTime) / 100;
        console.log(desiredProg);
        this.player
          .seek(desiredMs)
          .then(() =>
            this.player
              .getCurrentState()
              .then(state =>
                this.setState({ rawTrackProgress: state.position })
              )
          );
      } else if (targetId === "volume-bar") {
        desiredProg =
          Math.round(((eventMeasure - beginning) / (end - beginning)) * 100) /
          100;
        this.player.setVolume(desiredProg).then(() => {
          return this.player.getVolume().then(vol => {
            return this.setState({ volumePercentage: vol * 100 }); //7
          });
        });
      }
    }
  }
  handleRepeatModeChange(e) {
    if (this.playbackSDK) {
      const currentI = this.repeatMode.indexOf(this.state.repeatMode);
      const current = this.repeatMode[(currentI + 1) % this.repeatMode.length];
      console.log(current, this.state.repeatMode);
      return this.props.APIrequest("setRepeat", { mode: current });
    }
  }

  render() {
    //
    let {
      rawTrackProgress,
      rawTrackTime,
      albumImage,
      songTitle,
      artistName,
      processedProgress,
      progressPercentage,
      repeatMode,
      volumePercentage
    } = this.state;
    const initVal = getMinsSecs(0);
    progressTime = processedProgress || initVal;
    totalTime = getMinsSecs(rawTrackTime) || initVal;
    progressPercentage = getPerc(rawTrackProgress, rawTrackTime) || 100;
    //
    // console.log(progressPercentage, "progressPercentage");
    return (
      <div className="player-bar">
        {/*  */}
        <div className="player-bar__tab player-bar__left-tab player-bar__perip-tab">
          <div className="player-bar__left-tab__inside-perip">
            <div className="player-bar__album-img">
              {albumImage && (
                <img
                  src={`${albumImage}`}
                  alt="album cover"
                  height="56px"
                  width="56px"
                />
              )}
            </div>
          </div>
          <div className="player-bar__tab player-bar__left-tab__center">
            <span className="player-bar__left-tab__center-title-artist__title">
              {songTitle}
            </span>
            <span className="player-bar__left-tab__center-title-artist__artist">
              {artistName}
            </span>
          </div>
          <div className="player-bar__tab player-bar__left-tab__perip">
            <i className="fas fa-plus" />
          </div>
        </div>

        {/*  */}
        <div className="player-bar__tab player-bar__center-tab">
          <div className="player-bar__player-controls">
            <i
              onClick={() =>
                this.props.APIrequest("toggleShuffle", {
                  shuffle: !this.state.shuffled
                })
              }
              style={{ color: this.state.shuffled ? "#1db954" : "white" }}
              className="fas fa-random"
            />
            <i
              onClick={() => this.player.previousTrack()}
              className="fas fa-step-backward"
            />
            <div
              onClick={this.handlePausePlay}
              className="player-bar__play-pause"
            >
              {this.state.paused || !this.playbackSDK ? (
                <i className="fas fa-play player__play-pause" />
              ) : (
                <i className="fas fa-pause player__play-pause" />
              )}
            </div>
            {/* */}
            <i
              onClick={() => this.player.nextTrack()}
              className="fas fa-step-forward"
            />
            <i
              onClick={this.handleRepeatModeChange}
              className={
                repeatMode === "off"
                  ? "fas fa-redo"
                  : "fas fa-redo player-bar__redo-icon--repeat-cx"
              }
            >
              {repeatMode === "track" ? <span>1</span> : null}
            </i>
          </div>
          <div className="player-bar__player-progress">
            <div className="player-bar__player-progress__time">
              {progressTime && `${progressTime.min}:${progressTime.sec}`}
            </div>
            <div
              id="progress-bar"
              className="player-bar__player-progress__wrapper"
              onClick={this.handleRangeChange}
            >
              <div className="player-bar__player-progress__bar player-bar__progress-bar player-bar__progress-bar--static">
                <div
                  style={{
                    left: `-${progressPercentage}%`,
                    transitionDuration: "0.3s",
                    transitionTimingFunction: "cubic-bezier(1,0,.7,1)"
                  }}
                  className="player-bar__progress-bar player-bar__progress-bar--dynamic"
                />
              </div>
            </div>
            <div className="player-bar__player-progress__time">
              {totalTime && `${totalTime.min}:${totalTime.sec}`}
            </div>
          </div>
        </div>
        {/*  */}

        <div className="player-bar__tab player-bar__right-tab player-bar__perip-tab">
          <div className="player-bar__right-tab__controls">
            <i className="fas fa-list-ol" />
            <i className="fas fa-tablet-alt" />
            <i className="fas fa-volume-up" />
          </div>
          <div
            id="volume-bar"
            className="player-bar__volume-wrapper"
            onClick={this.handleRangeChange}
          >
            <div className="player-bar__right-tab_volume-bar player-bar__progress-bar player-bar__progress-bar--static">
              <div
                style={{ left: `-${100 - volumePercentage}%` }}
                className="player-bar__progress-bar player-bar__progress-bar--dynamic "
              />
            </div>
          </div>
          {/* <i className="fas fa-volume-mute"></i> */}
        </div>
        <audio ref={this.audio} src={this.props.audio} />
      </div>
    );
  }
}

export default PlayerBar;

// if (this.props.SDK) {
//   this.player = this.props.SDK;
//   this.player.getCurrentState().then(state => {
//     if (state) {
//       console.log("player-bar updated, SDK state:", state);
//     } else {
//       return console.log("User is not playing music through player.");
//     }
//   });
// }
// let currPlay, playback;
// if (this.props.playbackSDK) {
//   currPlay = this.props.playbackSDK;
// } else if (this.props.currentlyPlaying && this.props.currentPlayback) {
//   currPlay = this.props.currentlyPlaying;
//   playback = this.props.currentPlayback;
// }
// if (currPlay) {
//   this.handleAPIpayload(currPlay, playback);
//   if (currPlay.is_playing) {
//     if (!this.playbackSDK) {
//       this.playbackSDK = setInterval(() => {
//         this.props.APIrequest("currentlyPlaying");
//         this.props.APIrequest("currentPlayback");
//       }, 800);
//     }
//   }
// }

// handleAPIpayload(playingPayload, playbackPayload) {
//   if (this.props.playbackSDK) {
//     const currTrack = playingPayload.track_window.current_track;
//     //
//     this.setState({
//       rawTrackTime: currTrack.duration_ms,
//       rawTrackProgress: this.props.playbackSDK,
//       albumImage: currTrack.album.images[0].url,
//       songTitle: currTrack.name,
//       artistName: currTrack.artists[0].name
//     });
//     // rawTotal = currTrack.duration_ms;
//     // rawProgress = this.props.playbackSDK;
//     distanceProgress = getMinsSecs(rawProgress);
//     distanceTotal = getMinsSecs(rawTotal);
//     // albumImage = currTrack.album.images[0].url;
//     // songTitle = currTrack.name;
//     // artistName = currTrack.artists[0].name;
//     if (!this.playbackSDK)
//       this.playbackSDK = setInterval(() => this.forceUpdate(), 1000);
//   } else if (this.props.currentlyPlaying) {
//     if (playbackPayload && !playbackPayload.device)
//       console.log("playbackPayload", playbackPayload);
//     if (playingPayload) {
//       if (!this.state.playing && playingPayload.is_playing) {
//         this.setState({ playing: true });
//       } else if (this.state.playing && !playingPayload.is_playing) {
//         this.setState({ playing: false });
//       }
//       rawProgress = playingPayload.progress_ms;
//       playingPayload = playingPayload.item;
//       //
//       albumImage = playingPayload.album.images[0].url;
//       songTitle = playingPayload.name;
//       artistName = playingPayload.artists[0].name;
//       rawTotal = playingPayload.duration_ms;
//       distanceProgress = getMinsSecs(rawProgress);
//       distanceTotal = getMinsSecs(rawTotal);
//       progressPercentage = getPerc(rawProgress, rawTotal);
//     }
//   }
// }
//
