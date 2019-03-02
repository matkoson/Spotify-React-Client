import React from "react";
import { render, waitForElement, getByText } from "react-testing-library";
import HomeScreen from "../Components/HomeScreen/HomeScreen";
import { feedHomeScreenAlbums } from "../feeds";

const titles = feedHomeScreenAlbums.playlists.items.map(e => e.name);
it("Shows the main headline", async () => {
  const { getByText } = render(<HomeScreen featured={feedHomeScreenAlbums} />);
  await waitForElement(() => getByText(titles[0]));
  // expect(getByText("Editor's picks")).toBeInTheDocument();
});
