import React from "react";
import GenAlbumContainer from "../GenAlbumContainer/GenAlbumContainer";

class Genres extends React.Component {
  componentDidMount() {
    console.log("mount", this.props);
    this.renderContainer();
  }
  renderContainer() {
    console.log("render", this.props.getCategories || null);
    if (this.props.getCategories) {
      console.log("render called");
      this.categoriesList = (
        <GenAlbumContainer
          data={this.props.getCategories.categories.items.slice(1)}
          type={"categories"}
          playerState={this.props.playerState}
          APIrequest={this.props.APIrequest}
          currPlay={this.props.currentlyPlaying}
          handleMainRightViewChange={this.props.handleMainRightViewChange}
        />
      );
    }
  }
  componentDidUpdate() {
    console.log("update", this.props);
    this.renderContainer();
  }

  render() {
    if (!this.categoriesList) this.props.makeApropriateFetch("Genres");
    return (
      <div style={{ color: "#ffffff" }} className="genres home-screen">
        <h2 className="app__fetch-title">{"Genres & Moods"}</h2>
        <div className="app__fetch-container">{this.categoriesList}</div>
      </div>
    );
  }
}

export default Genres;
