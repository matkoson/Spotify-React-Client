import React, { useEffect, useContext, useState } from "react";
import ContainerGenerator from "../ContainerGenerator/ContainerGenerator";
import { Context } from "../../Context/Context";
import HeadlineAnimator from "../Helpers/HeadlineAnimator";
import "../../Styles/Base/app.scss";
function Genres(props) {
  const [mount, set] = useState(false);
  const context = useContext(Context);
  let categoriesList;
  useEffect(
    () => {
      if (context && !props.getCategories) {
        context.APIrequest("getCategories");
      }
      context&&context.setCompGradient(
        "linear-gradient(105deg, #000000 30%,  #584501 100%"
      );
      set(true);
    },
    [mount]
  );
  if (props.getCategories) {
    categoriesList = (
      <ContainerGenerator
        data={props.getCategories.categories.items}
        type={"categories"}
      />
    );
  }
  let headlines = ["Genres & Moods"].map(e => <HeadlineAnimator title={e} />);
  return (
    <div
      style={{ color: "#FCCD21" }}
      data-testid="navGenres"
      className="generator genres"
    >
      {headlines[0]}
      <div className="app__fetch-container">{categoriesList}</div>
    </div>
  );
}

export default Genres;
