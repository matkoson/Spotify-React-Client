export default function handlePausePlay(e) {
  // console.log(this.playbackSDK, this.props.recent, "recent");
  if (this.player) {
    if (!this.playbackSDK) {
      this.context.APIrequest("playRecentTracks", {
        cx: this.props.recent.track.uri
      });
    } else {
      if (this.state.paused) {
        this.player.resume().then(() => {
          this.setState({ paused: false });

          this.context.APIrequest("currentlyPlaying");
        });
      } else {
        this.player.pause().then(() => {
          this.context.APIrequest("currentlyPlaying");
          this.setState({ paused: true });
        });
      }
    }
  }
}
