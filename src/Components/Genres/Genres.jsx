import React, { useEffect, useContext } from "react";
import ContainerGenerator from "../ContainerGenerator/ContainerGenerator";
import { Context } from "../../Context/Context";

function Genres(props) {
  let categoriesList;
  const context = useContext(Context);
  useEffect(() => {
    if (context && !props.getCategories) {
      context.APIrequest("getCategories");
    }
  });
  if (props.getCategories) {
    categoriesList = (
      <ContainerGenerator
        data={props.getCategories.categories.items.slice(1)}
        type={"categories"}
        animate={true}
        //+context
      />
    );
  }
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
