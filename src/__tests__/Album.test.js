import React from "react";
import { render, waitForElement, getByText } from "react-testing-library";
import Album from "../Components/Album/Album";

it("Correctly renders a given playlist", async () => {
  //   console.log(feedPlaylist);
  const { getByText } = render(<Album />);
  await waitForElement(() => getByText("Play All", "Tracklist"));
});
