import React from "react";
import GenAlbumContainer from "../GenAlbumContainer/GenAlbumContainer";

function renderContainer(props) {
  let categoriesList;
  console.log("render", props.getCategories || null);
  if (props.getCategories) {
    console.log("render called");
    categoriesList = (
      <GenAlbumContainer
        data={props.getCategories.categories.items.slice(1)}
        type={"categories"}
        //+context
      />
    );
  }
  return categoriesList;
}

function Genres(props) {
  const categoriesList = renderContainer(props);
  if (!categoriesList) props.makeApropriateFetch("Genres");
  return (
    <div style={{ color: "#ffffff" }} className="genres home-screen">
      <h2 className="app__fetch-title">{"Genres & Moods"}</h2>
      <div className="app__fetch-container">
        {categoriesList || <GenAlbumContainer />}
      </div>
    </div>
  );
}

export default Genres;
