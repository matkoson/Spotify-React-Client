export default function playbackSDKinterval() {
  this.playbackSDK = setInterval(() => {
    this.player.getCurrentState().then(state => {
      if (state) {
        console.log("SDK updated, state:", state);
        const trackPlaying = state.track_window.current_track;
        const songTitle =
          trackPlaying.name.length >= 32
            ? `${trackPlaying.name.slice(0, 29)}...`
            : trackPlaying.name;
        return this.setState(prevState => {
          // console.log("state", state, "prevState", prevState);
          if (prevState.songTitle !== trackPlaying.name) {
            this.context.APIrequest("currentlyPlaying");
          }
          return {
            albumImage: trackPlaying.album.images[0].url, //1
            songTitle, //2
            artistName: trackPlaying.artists[0].name, //3
            repeatMode: this.repeatMode[state.repeat_mode], //4
            rawTrackTime: trackPlaying.duration_ms, //5
            rawTrackProgress: state.position, //6
            processedProgress: this.context.getMinsSecs(
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
