import React, { PureComponent, lazy } from "react";
import PlayerControls from "./InnerComps/PlayerControls";
import SideControls from "./InnerComps/SideControls";
import { Context } from "../../Context/Context";
import "../../Styles/Components/player-bar.scss";

const DeviceTab = lazy(() => import("./InnerComps/DeviceTab"));
const AlbumDetails = lazy(() => import("./InnerComps/AlbumDetails"));
const getPerc = (progressTime, totalTime) =>
  100 - (progressTime / totalTime) * 100;
let totalTime, progressTime;

class PlayerBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      playing: "",
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
      shuffled: false,
      muted: false
    };
    this.repeatMode = ["off", "context", "track"];
    this.processRecent = this.processRecent.bind(this);
  }
  componentDidMount() {
    let playbackSDKinterval,
      handleRangeChange,
      handlePausePlay,
      handleRepeatModeChange,
      handleMute;
    if (this.props.recent) this.processRecent();
    lazy(
      import("./PlayerBarMethods").then(res => {
        playbackSDKinterval = res.playbackSDKinterval.bind(this);
        handleRangeChange = res.handleRangeChange.bind(this);
        handlePausePlay = res.handlePausePlay.bind(this);
        handleRepeatModeChange = res.handleRepeatModeChange.bind(this);
        handleMute = res.handleMute.bind(this);
        return this.setState({
          playbackSDKinterval,
          handleRangeChange,
          handlePausePlay,
          handleRepeatModeChange,
          handleMute
        });
      })
    );
  }
  processRecent() {
    const lastTrack = this.props.recent.track;
    const songTitle =
      lastTrack.name.length >= 32
        ? `${lastTrack.name.slice(0, 29)}...`
        : lastTrack.name;
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
  componentDidUpdate() {
    if (!this.player && this.props.player) this.player = this.props.player;
    //at first viable update, while SDK is still not acitve, display the info from the last played track
    if (this.context.playerState && this.context.playerState.bitrate) {
      if (!this.playbackSDK) {
        if (this.playbackSDKinterval) this.playbackSDKinterval();
      }
    } else if (this.props.recent) {
      // console.log("PLAYER-BAR, PROCESSING RECENT");
      this.processRecent();
    }
  }

  render() {
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
    const initVal = this.context.getMinsSecs(0);
    progressTime = processedProgress || initVal;
    totalTime = this.context.getMinsSecs(rawTrackTime) || initVal;
    progressPercentage = getPerc(rawTrackProgress, rawTrackTime) || 100;
    volumePercentage = this.state.muted ? 0 : volumePercentage;
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
          handlePausePlay={this.state.handlePausePlay}
          paused={this.context.playerState.paused}
          playbackSDK={this.playbackSDK}
          player={this.player}
          repeatMode={repeatMode}
          handleRepeatModeChange={this.state.handleRepeatModeChange}
          progressTime={progressTime}
          handleRangeChange={this.state.handleRangeChange}
          progressPercentage={progressPercentage}
          totalTime={totalTime}
        />
        <SideControls
          isDeviceTabOn={this.props.isDeviceTabOn}
          handleDeviceTabClick={this.props.handleDeviceTabClick}
          handleRangeChange={this.state.handleRangeChange}
          volumePercentage={volumePercentage}
          handleMute={this.state.handleMute}
          muted={this.state.muted}
        >
          {this.props.isDeviceTabOn && (
            <DeviceTab deviceName={this.props.deviceName} />
          )}
        </SideControls>
      </div>
    );
  }
}
PlayerBar.contextType = Context;

export default PlayerBar;

// playbackSDKinterval() {
//   this.playbackSDK = setInterval(() => {
//     this.player.getCurrentState().then(state => {
//       if (state) {
//         console.log("SDK updated, state:", state);
//         const trackPlaying = state.track_window.current_track;
//         const songTitle =
//           trackPlaying.name.length >= 32
//             ? `${trackPlaying.name.slice(0, 29)}...`
//             : trackPlaying.name;
//         return this.setState(prevState => {
//           // console.log("state", state, "prevState", prevState);
//           if (prevState.songTitle !== trackPlaying.name) {
//             this.context.APIrequest("currentlyPlaying");
//           }
//           return {
//             albumImage: trackPlaying.album.images[0].url, //1
//             songTitle, //2
//             artistName: trackPlaying.artists[0].name, //3
//             repeatMode: this.repeatMode[state.repeat_mode], //4
//             rawTrackTime: trackPlaying.duration_ms, //5
//             rawTrackProgress: state.position, //6
//             processedProgress: this.context.getMinsSecs(
//               prevState && prevState.rawTrackProgress
//             ),
//             paused: state.paused,
//             shuffled: state.shuffle
//           };
//         });
//       } else {
//         console.log("No playback on SDK");
//         clearInterval(this.playbackSDK);
//         this.playbackSDK = null;
//       }
//     });
//   }, 1000);
// }

// handleRangeChange(e) {
//   //handle onClick changes on progress/volume-bar
//   console.log(e.currentTarget.id);
//   const targetId = e.currentTarget.id;
//   const targetMeasure = e.target.getBoundingClientRect();
//   const beginning = targetMeasure.left;
//   const end = targetMeasure.left + targetMeasure.width;
//   const eventMeasure = e.clientX;
//   let desiredProg;
//   //
//   if (this.player) {
//     if (targetId === "progress-bar") {
//       desiredProg = ((eventMeasure - beginning) / (end - beginning)) * 100;
//       const desiredMs =
//         Math.round(desiredProg * this.state.rawTrackTime) / 100;
//       console.log(desiredProg);
//       this.player
//         .seek(desiredMs)
//         .then(() =>
//           this.player
//             .getCurrentState()
//             .then(state =>
//               this.setState({ rawTrackProgress: state && state.position })
//             )
//         );
//     } else if (targetId === "volume-bar") {
//       desiredProg =
//         Math.round(((eventMeasure - beginning) / (end - beginning)) * 100) /
//         100;
//       this.player.setVolume(desiredProg).then(() => {
//         return this.player.getVolume().then(vol => {
//           return this.setState({ volumePercentage: vol * 100 }); //7
//         });
//       });
//     }
//   }
// }

// handlePausePlay(e) {
//   // console.log(this.playbackSDK, this.props.recent, "recent");
//   if (this.player) {
//     if (!this.playbackSDK) {
//       this.context.APIrequest("playRecentTracks", {
//         cx: this.props.recent.track.uri
//       });
//     } else {
//       if (this.state.paused) {
//         this.player.resume().then(() => {
//           this.setState({ paused: false });

//           this.context.APIrequest("currentlyPlaying");
//         });
//       } else {
//         this.player.pause().then(() => {
//           this.context.APIrequest("currentlyPlaying");
//           this.setState({ paused: true });
//         });
//       }
//     }
//   }
// }
