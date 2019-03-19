import React from "react";
import { render, wait, fireEvent } from "react-testing-library";
import HomeScreen from "../Components/HomeScreen/HomeScreen";
import { feedRecent, feedFeatured, feedRelatedTop } from "../feeds";
import { Provider, Consumer } from "../Context/Context";

const fakeSetCompGradient = jest.fn();
const fakeAPIrequest = jest.fn();
const fakeHandleAlbumRightOverride = jest.fn();
const setupHomeScreen = isPlaying =>
  render(
    <Provider
      value={{
        handleAlbumRightOverride: fakeHandleAlbumRightOverride,
        APIrequest: fakeAPIrequest,
        playerState: { paused: false },
        currentlyPlaying: {
          item: { uri: isPlaying ? feedRecent.items[0].track.uri : null }
        },
        setCompGradient: fakeSetCompGradient
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
test("Renders without an error, when fed with all the full input.", () => {
  const { getByText, getByTestId } = setupHomeScreen();
  getByText("Recently played");
  getByText(feedFeatured.message);
  getByText(`More like Mietek`);
  getByTestId("play");
});
test("Recognizes that the currently rendered album is being played, thus pause icon appears.", () => {
  const { getByTestId } = setupHomeScreen(true);
  getByTestId("pause");
});
test("Correctly gets rid of dupls while rendering recently played tracks.", () => {
  const { getAllByTestId } = render(
    <Provider
      value={{
        setCompGradient: fakeSetCompGradient
      }}
    >
      <Consumer>
        {context => (
          <HomeScreen
            recent={{
              items: [
                {
                  track: {
                    id: "a",
                    album: { id: "A" },
                    artists: [{ name: "" }]
                  }
                },
                {
                  track: {
                    id: "b",
                    album: { id: "B" },
                    artists: [{ name: "" }]
                  }
                },
                {
                  track: {
                    id: "a",
                    album: { id: "A" },
                    artists: [{ name: "" }]
                  }
                }
              ]
            }}
          />
        )}
      </Consumer>
    </Provider>
  );
  expect(getAllByTestId("A").length).toBe(1);
  //There's only one element rendered out of a duplicated id
});
test("When clicked round artist element make the right request.", () => {
  const { getByTestId, queryAllByTestId } = setupHomeScreen();
  fireEvent.click(queryAllByTestId("containerGeneratedAlbum")[0]);
  expect(fakeAPIrequest).toHaveBeenCalledWith("playArtist", {
    cx: feedRelatedTop.artists[0].uri
  });
});
test("When clicked on a playlist-type element, it gets  me the right request response.", async () => {
  const { getByTestId, queryAllByTestId } = setupHomeScreen();
  fireEvent.click(getByTestId("containerGeneratedPlaylist"));
  await wait(() => {
    expect(fakeSetCompGradient).toHaveBeenCalledWith(
      "linear-gradient(105deg, #000000 15%, #2A0943 25%,#711c33 100%)"
    );
    expect(fakeAPIrequest).toHaveBeenCalledWith("playSpecificPlayback", {
      cx: feedFeatured.playlists.items[0].uri,
      cx_pos: undefined
    });
  });
});
test("Correctly makes a request to play a selected track", async () => {
  const { getByTestId } = setupHomeScreen();
  fireEvent.click(getByTestId("containerGeneratedTrack"));
  expect(fakeAPIrequest).toHaveBeenCalledWith("playRecentTracks", {
    cx: feedRecent.items.map(e => e.track.uri),
    cx_pos: "0"
  });
});

test("Correctly transfers view to the chosen album.", async () => {
  const { getByText } = setupHomeScreen();
  fireEvent.click(getByText(feedFeatured.playlists.items[0].name));
  expect(fakeHandleAlbumRightOverride).toHaveBeenCalled();
});
