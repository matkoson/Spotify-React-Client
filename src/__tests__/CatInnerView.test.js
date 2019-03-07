import CatInnerView from "../Components/CatInnerView/CatInnerView";
import React from "react";
import { render } from "react-testing-library";
import { feedGetCategory, feedGetCategoryPlaylist } from "../feeds";
import { getByTestId } from "react-testing-library";

const renderFakeCatInnerView = () =>
  render(
    <CatInnerView
      getCategory={feedGetCategory}
      PolandTop={feedGetCategoryPlaylist}
    />
  );
it("Renders correctly", () => {
  const { getByTestId, getByText, debug } = renderFakeCatInnerView();
  debug();
  getByText("Popular Playlists");
  getByText(feedGetCategoryPlaylist.playlists.items[0].name);
  getByText(feedGetCategory.name);
});
