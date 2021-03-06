import React from "react";
import ContainerGenerator from "../ContainerGenerator/ContainerGenerator";
import "../../Styles/Components/cat-inner-view.scss";

class CatInnerView extends React.Component {
  render() {
    let categoryIcon, categoryName, catRender;
    if (this.props.getCategory && this.props.PolandTop) {
      categoryIcon = this.props.getCategory.icons[0].url;
      categoryName = this.props.getCategory.name;
      catRender = (
        <ContainerGenerator
          data={this.props.PolandTop.playlists.items}
          type={"playlists"}
        />
      );
    }
    return (
      <div data-testid="navCatInnerView" className="cat-inner-view">
        <div className="cat-inner-view__cat-title">
          <div className="cat-inner-view__img">
            <img
              className="cat-inner-view__img-file"
              width="275px"
              height="275px"
              src={categoryIcon}
              alt="category icon"
            />
          </div>
          <div className="cat-inner-view__cat-name">{categoryName}</div>
        </div>

        <h2 className="app__fetch-title">{"Popular Playlists"}</h2>
        <div className="app__fetch-container ">{catRender}</div>
      </div>
    );
  }
}

export default CatInnerView;
