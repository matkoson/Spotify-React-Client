export default function handleMainRightChange(mainRightView) {
  mainRightView === "Search"
    ? this.setState({
        // mainRightView,
        // rightTabView: "",
        currGrad:
          "linear-gradient(to right bottom, #000000, #000000,  #202020, #282828, #282828)",
        mobile: false
      })
    : this.setState({ mainRightView, rightTabView: "" });
}
