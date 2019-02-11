import React from "react";

class Album extends React.Component {
  componentDidMount() {
    if (this.props.chosenAlbum)
      this.props.APIrequest("getAlbum", { uri: this.props.chosenAlbum });
  }
  componentDidUpdate() {
    console.log(this.props);
  }
  render() {
    return <div className="album" />;
  }
}

export default Album;
