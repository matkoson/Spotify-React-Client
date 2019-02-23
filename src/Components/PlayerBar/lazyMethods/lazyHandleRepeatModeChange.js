export default function handleRepeatModeChange(e) {
  if (this.playbackSDK) {
    const currentI = this.repeatMode.indexOf(this.state.repeatMode);
    const current = this.repeatMode[(currentI + 1) % this.repeatMode.length];
    console.log(current, this.state.repeatMode);
    return this.context.APIrequest("setRepeat", { mode: current });
  }
}
