import React from "react";
import {
  render,
  waitForElement,
  getByText,
  getByTestId
} from "react-testing-library";
import HomeScreen from "../Components/HomeScreen/HomeScreen";
import { feedHomeScreenAlbums } from "../feeds";
import { feedRecent, feedFeatured, feedRelatedTop } from "../feeds";
import { Provider, Consumer } from "../Context/Context";

const titles = feedHomeScreenAlbums.playlists.items.map(e => e.name);
const setupHomeScreen = isPlaying =>
  render(
    <Provider
      value={{
        playerState: { paused: false },
        currentlyPlaying: {
          item: { uri: isPlaying ? feedRecent.items[0].track.uri : null }
        }
      }}
    >
      <Consumer>
        {context => (
          <HomeScreen
            featured={feedFeatured}
            recent={feedRecent}
            relatedTop={feedRelatedTop.artists}
            topArtist={"Mietek"}
          />
        )}
      </Consumer>
    </Provider>
  );
it("Renders without an error, when fed with all the full input.", () => {
  const { getByText, getByTestId } = setupHomeScreen();
  getByText("Recently played");
  getByText(feedFeatured.message);
  getByText(`More like Mietek`);
  getByTestId("play");
});
it("Recognizes that the currently rendered album is being played, thus pause icon appears.", () => {
  const { getByTestId } = setupHomeScreen(true);
  getByTestId("pause");
});
it("Correctly gets rid of dupls while rendering recently played tracks.", () => {
  const { getAllByTestId } = render(
    <HomeScreen
      recent={{
        items: [
          { track: { id: "a", album: { id: "A" }, artists: [{ name: "" }] } },
          { track: { id: "b", album: { id: "B" }, artists: [{ name: "" }] } },
          { track: { id: "a", album: { id: "A" }, artists: [{ name: "" }] } }
        ]
      }}
    />
  );
  expect(getAllByTestId("A").length).toBe(1);
  //There's only one element rendered out of a duplicated id
});
