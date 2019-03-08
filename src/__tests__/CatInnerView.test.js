import CatInnerView from "../Components/CatInnerView/CatInnerView";
import React from "react";
import { render } from "react-testing-library";
import { feedGetCategory, feedPolandTop } from "../feeds";
import { getByTestId } from "react-testing-library";

const renderFakeCatInnerView = () =>
  render(
    <CatInnerView getCategory={feedGetCategory} PolandTop={feedPolandTop} />
  );
it("Renders correctly", () => {
  const { getByTestId, getByText } = renderFakeCatInnerView();
  getByText("Popular Playlists");
  getByText(feedPolandTop.playlists.items[0].name);
  getByText(feedGetCategory.name);
});
