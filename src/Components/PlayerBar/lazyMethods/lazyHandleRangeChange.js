export default function handleRangeChange(e) {
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
