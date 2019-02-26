export default function remainingListeners() {
  console.log("Called");
  this.player.addListener("initialization_error", ({ message }) => {
    console.error(message);
    this.setState({ SDKconnected: false });
  });
  this.player.addListener("authentication_error", ({ message }) => {
    console.error(message);
    this.setState({ SDKconnected: false });
  });
  this.player.addListener("account_error", ({ message }) => {
    console.error(message);
    this.setState({ SDKconnected: false });
  });
  this.player.addListener("playback_error", ({ message }) => {
    console.error(message);
  });

  // Playback status updates
  this.player.addListener("player_state_changed", state => {
    if (state) {
      if (state.bitrate && !state.paused) {
        this.setState({
          valueContext: { ...this.state.valueContext, playerState: state },
          deviceTabOn: true
        });
      } else if (state.paused) {
        this.setState({ playerState: state, deviceTabOn: false });
      }
    }
  });
}
