export default function initSDK(token) {
  const nameSDK = "React Spotify Web Client";
  this.player = new window.Spotify.Player({
    name: nameSDK,
    getOAuthToken: cb => {
      cb(token);
    }
  });

  // Error handling
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

  // Ready
  this.player.addListener("ready", ({ device_id }) => {
    console.log("Ready with Device ID", device_id);
    this.setState({
      SDKconnected: true,
      deviceID: device_id,
      deviceName: nameSDK
    });
    return this.playerRequest("getDevices");
  });

  // Not Ready
  this.player.addListener("not_ready", ({ device_id }) => {
    console.log("Device ID has gone offline", device_id);
    this.setState({ SDKconnected: false });
  });

  // Connect to the player!
  this.player.connect().then(success => {
    if (success) console.log("SDK connected, waiting for ready...");
  });
}
