import React from "react";
import ContainerGenerator from "../ContainerGenerator/ContainerGenerator";

function renderContainer(props) {
  let categoriesList;
  console.log("render", props.getCategories || null);
  if (props.getCategories) {
    console.log("render called");
    categoriesList = (
      <ContainerGenerator
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
    <div style={{ color: "#ffffff" }} className="generator genres">
      <h2 className="app__fetch-title">{"Genres & Moods"}</h2>
      <div className="app__fetch-container">
        {categoriesList || <ContainerGenerator />}
      </div>
    </div>
  );
}

export default Genres;
