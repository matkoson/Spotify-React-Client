import React from "react";
import GenAlbumContainer from "../GenAlbumContainer/GenAlbumContainer";

class CatInnerView extends React.Component {
  constructor(props) {
    super(props);
    this.generateInnerView = this.generateInnerView.bind(this);
  }
  componentDidMount() {
    console.log("inner props", this.props);
  }
  generateInnerView() {}
  render() {
    let categoryIcon, categoryName, catRender;
    if (this.props.getCategory && this.props.PolandTop) {
      categoryIcon = this.props.getCategory.icons[0].url;
      categoryName = this.props.getCategory.name;
      catRender = (
        <GenAlbumContainer
          data={this.props.PolandTop.playlists.items}
          type={"playlists"}
          playerState={this.props.playerState}
          APIrequest={this.props.APIrequest}
          currPlay={this.props.currentlyPlaying}
        />
      );
    }
    return (
      <div className="cat-inner-view">
        <div className="cat-inner-view__cat-icon">
          <img
            width="275px"
            height="275px"
            className="cat-inner-view__img"
            src={categoryIcon}
            alt="category icon"
          />
        </div>
        <div className="cat-inner-view__cat-name">{categoryName}</div>

        <h2 className="app__fetch-title">{"Popular Playlists"}</h2>
        <div className="app__fetch-container ">
          {catRender || <GenAlbumContainer />}
        </div>
      </div>
    );
  }
}

export default CatInnerView;
