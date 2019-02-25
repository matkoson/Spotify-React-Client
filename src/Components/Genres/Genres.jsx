import React, { useEffect, useContext } from "react";
import ContainerGenerator from "../ContainerGenerator/ContainerGenerator";
import { Context } from "../../Context/Context";
import HeadlineAnimator from "../Helpers/HeadlineAnimator";
import "../../Styles/Base/app.scss";

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
  let headlines = ["Genres & Moods"];
  headlines = HeadlineAnimator(headlines);
  return (
    <div style={{ color: "#ffffff" }} className="generator genres">
      {headlines[0]}
      <div className="app__fetch-container">{categoriesList}</div>
    </div>
  );
}

export default Genres;
