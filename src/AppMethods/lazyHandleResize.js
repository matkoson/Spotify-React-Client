export default function handleResize() {
  if (window.innerWidth > 800 && this.state.mobile) {
    this.setState({ mobile: false });
  }
}
