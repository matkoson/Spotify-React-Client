// import { lazy } from "react";
export default function initSDK(token) {
  const nameSDK = "Spotify React Client";
  this.player = new window.Spotify.Player({
    name: nameSDK,
    getOAuthToken: cb => {
      cb(token);
    }
  });

  import("./lazyInitSDK").then(res => {
    res.default.bind(this)();
  });
  this.player.addListener("ready", ({ device_id }) => {
    console.log("Ready with Device ID", device_id);
    this.setState({
      SDKconnected: true,
      deviceID: device_id,
      deviceName: nameSDK,
      player: this.player
    });
    return this.state.playerRequest("getDevices");
  });

  // Not Ready
  this.player.addListener("not_ready", ({ device_id }) => {
    console.error("Device ID has gone offline", device_id);
    this.setState({ SDKconnected: false });
  });

  // Connect to the player!
  this.player.connect().then(success => {
    if (success) console.log("SDK connected, waiting for ready...");
  });
}
