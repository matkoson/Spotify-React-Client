import React from "react";
import GenAlbumContainer from "../GenAlbumContainer/GenAlbumContainer";

class Genres extends React.Component {
  componentDidMount() {
    this.renderContainer();
  }
  renderContainer() {
    if (this.props.getCategories) {
      this.categoriesList = (
        <GenAlbumContainer
          data={this.props.getCategories.categories.items.slice(1)}
          type={"categories"}
          playerState={this.props.playerState}
          APIrequest={this.props.APIrequest}
          currPlay={this.props.currentlyPlaying}
        />
      );
    }
  }
  componentDidUpdate() {
    this.renderContainer();
  }

  render() {
    return (
      <div style={{ color: "#ffffff" }} className="genres home-screen">
        <h2 className="app__fetch-title">{"Genres & Moods"}</h2>
        <div className="app__fetch-container">{this.categoriesList}</div>
      </div>
    );
  }
}

export default Genres;
