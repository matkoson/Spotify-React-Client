import React, { PureComponent, lazy } from "react";
import PlayerControls from "./InnerComps/PlayerControls";
import SideControls from "./InnerComps/SideControls";
import { Context } from "../../Context/Context";
import "../../Styles/Components/PlayerBar/player-bar.scss";
// import "../../Styles/Components/PlayerBar/lazyPlayerBarAbv820px.scss";

lazy(import("../../Styles/Components/PlayerBar/lazyPlayerBarAbv820px.scss"));
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
        if (this.state.playbackSDKinterval) this.state.playbackSDKinterval();
        console.log(this.playbackSDK);
      }
    } else if (this.props.recent) {
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
