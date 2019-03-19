import React, { PureComponent, lazy } from "react";
import PlayerControls from "./InnerComps/PlayerControls";
import SideControls from "./InnerComps/SideControls";
import { Context } from "../../Context/Context";
import "../../Styles/Components/PlayerBar/player-bar.scss";
import "../../Styles/Components/PlayerBar/lazyPlayerBarAbv820px.scss";

const DeviceTab = lazy(() => import("./InnerComps/DeviceTab"));
const AlbumDetails = lazy(() => import("./InnerComps/AlbumDetails"));
const getPerc = (progressTime, totalTime) =>
  100 - (progressTime / totalTime) * 100;
let totalTime, progressTime;
const repeatMode = ["off", "context", "track"];
class PlayerBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      playing: "",
      albumImage: "", //1
      songTitle: "", //2
      artistName: "", //3
      repeatMode: repeatMode[0], //4
      rawTrackTime: "", //5
      rawTrackProgress: "", //6
      volumePercentage: "", //7
      progressPercentage: "", //8
      distanceTotal: "",
      paused: false,
      shuffled: false,
      muted: false
    };
    this.repeatMode = repeatMode;
  }
  componentDidMount() {
    // console.log(this.props);
    let playbackSDKinterval,
      handleRangeChange,
      handlePausePlay,
      handleRepeatModeChange,
      handleMute;
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

  componentDidUpdate() {
    if (!this.state.player && this.props.player) {
      this.setState({ player: this.props.player });
    }
    //at first viable update, while SDK is still not acitve, display the info from the last played track
    if (
      this.context &&
      this.context.playerState &&
      this.context.playerState.bitrate
    ) {
      if (!this.playbackSDK) {
        if (this.state.player) {
          this.state.playbackSDKinterval && this.state.playbackSDKinterval();
        }
      }
    }
  }

  render() {
    const lastTrack = this.props.recent && this.props.recent.track;
    let { rawTrackProgress, volumePercentage } = this.state;
    const rawTrackTime =
      this.state.rawTrackTime || (lastTrack && lastTrack.duration_ms);
    const albumImage =
      this.state.albumImage || (lastTrack && lastTrack.album.images[0].url);
    const songTitle =
      this.state.songTitle ||
      (lastTrack &&
        (lastTrack.name.length >= 32
          ? `${lastTrack.name.slice(0, 29)}...`
          : lastTrack.name));
    const repeatMode = this.state.repeatMode || "off";
    const artistName =
      this.state.artistName || (lastTrack && lastTrack.artists[0].name);
    const progressPercentage = getPerc(rawTrackProgress, rawTrackTime) || 0;
    volumePercentage = this.state.muted ? 0 : volumePercentage;
    if (this.context && this.context.getMinsSecs) {
      progressTime = this.context.getMinsSecs(rawTrackProgress);
      totalTime = this.context.getMinsSecs(rawTrackTime);
    }
    //
    return (
      <div data-testid="navPlayerBar" className="player-bar">
        <AlbumDetails
          albumImage={albumImage}
          songTitle={songTitle}
          artistName={artistName}
        />
        <PlayerControls
          shuffled={this.state.shuffled}
          handlePausePlay={this.state.handlePausePlay}
          paused={this.state.paused}
          playbackSDK={this.playbackSDK}
          player={this.state.player}
          repeatMode={repeatMode}
          handleRepeatModeChange={this.state.handleRepeatModeChange}
          progressTime={progressTime}
          handleRangeChange={this.state.handleRangeChange}
          progressPercentage={progressPercentage}
          totalTime={totalTime}
          APIrequest={this.context.APIrequest}
        />
        <SideControls
          isDeviceTabOn={this.props.isDeviceTabOn}
          handleDeviceTabClick={this.props.handleDeviceTabClick}
          handleRangeChange={this.state.handleRangeChange}
          volumePercentage={volumePercentage}
          handleMute={this.state.handleMute}
          muted={this.state.muted}
          oneIsEnough={this.state.oneIsEnough}
        >
          <DeviceTab
            isDeviceTabOn={this.props.isDeviceTabOn}
            deviceName={this.props.deviceName}
          />
        </SideControls>
      </div>
    );
  }
}
PlayerBar.contextType = Context;

export default PlayerBar;
