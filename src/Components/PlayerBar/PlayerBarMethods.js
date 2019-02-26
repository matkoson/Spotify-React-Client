export function handleMute() {
  this.setState({ muted: !this.state.muted });
}
export function handlePausePlay(e) {
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
export function handleRangeChange(e) {
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
      const desiredMs = Math.round(desiredProg * this.state.rawTrackTime) / 100;
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
export function handleRepeatModeChange(e) {
  if (this.playbackSDK) {
    const currentI = this.repeatMode.indexOf(this.state.repeatMode);
    const current = this.repeatMode[(currentI + 1) % this.repeatMode.length];
    console.log(current, this.state.repeatMode);
    return this.context.APIrequest("setRepeat", { mode: current });
  }
}
export function playbackSDKinterval() {
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
