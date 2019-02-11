import React, { PureComponent } from "react";
import DeviceTab from "./InnerComps/DeviceTab";
import AlbumDetails from "./InnerComps/AlbumDetails";
import PlayerControls from "./InnerComps/PlayerControls";
import SideControls from "./InnerComps/SideControls";

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
    if (!this.player && this.props.player) this.player = this.props.player;
    //at first viable update, while SDK is still not acitve, display the info from the last played track
    if (this.props.playerState && this.props.playerState.bitrate) {
      // console.log("BITRATE");
      //if I have the player ready
      if (!this.playbackSDK) {
        this.playbackSDKinterval();
      }
    } else if (!this.props.player && this.props.recent) {
      const lastTrack = this.props.recent.track;
      // console.log(lastTrack, lastTrack.name);

      const songTitle =
        lastTrack.name.length >= 32
          ? `${lastTrack.name.slice(0, 29)}...`
          : lastTrack.name;
      // console.log(lastTrack.name.length);
      this.setState({
        albumImage: lastTrack.album.images[0].url, //1
        songTitle, //2
        artistName: lastTrack.artists[0].name, //3
        repeatMode: "off", //4
        rawTrackTime: lastTrack.duration_ms, //5
        rawTrackProgress: 0, //6
        volumePercentage: 100, //7
        paused: false
      });
    }
  }

  playbackSDKinterval() {
    this.playbackSDK = setInterval(() => {
      this.player.getCurrentState().then(state => {
        if (state) {
          // console.log("SDK updated, state:", state);
          const trackPlaying = state.track_window.current_track;
          const songTitle =
            trackPlaying.name.length >= 32
              ? `${trackPlaying.name.slice(0, 29)}...`
              : trackPlaying.name;
          return this.setState(prevState => {
            // console.log("state", state, "prevState", prevState);
            if (prevState.songTitle !== trackPlaying.name)
              this.props.APIrequest("currentlyPlaying");
            return {
              albumImage: trackPlaying.album.images[0].url, //1
              songTitle, //2
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
    // console.log(this.playbackSDK, this.props.recent, "recent");
    if (this.player) {
      if (!this.playbackSDK) {
        this.props.APIrequest("playRecentTracks", {
          cx: this.props.recent.track.uri
        });
      } else {
        if (this.state.paused) {
          this.player.resume().then(() => {
            this.setState({ paused: false });
            this.props.APIrequest("currentlyPlaying");
          });
        } else {
          this.player.pause().then(() => {
            this.props.APIrequest("currentlyPlaying");
            this.setState({ paused: true });
          });
        }
      }
    }
  }

  handleRangeChange(e) {
    //handle onClick changes on progress/volume-bar
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
                this.setState({ rawTrackProgress: state && state.position })
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
    return (
      <div className="player-bar">
        <AlbumDetails
          albumImage={albumImage}
          songTitle={songTitle}
          artistName={artistName}
        />
        <PlayerControls
          shuffled={this.state.shuffled}
          handlePausePlay={this.handlePausePlay}
          paused={this.state.paused}
          playbackSDK={this.playbackSDK}
          player={this.player}
          repeatMode={repeatMode}
          handleRepeatModeChange={this.handleRepeatModeChange}
          progressTime={progressTime}
          handleRangeChange={this.handleRangeChange}
          progressPercentage={progressPercentage}
          totalTime={totalTime}
        />
        <SideControls
          isDeviceTabOn={this.props.isDeviceTabOn}
          handleDeviceTabClick={this.props.handleDeviceTabClick}
          handleRangeChange={this.handleRangeChange}
          volumePercentage={volumePercentage}
        >
          {this.props.isDeviceTabOn && (
            <DeviceTab deviceName={this.props.deviceName} />
          )}
        </SideControls>
      </div>
    );
  }
}

export default PlayerBar;

// if (this.props.player) {
//   this.player = this.props.player;
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
