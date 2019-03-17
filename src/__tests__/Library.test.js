import Library from "../Components/Library/Library";
import React from "react";
import { render, wait, waitForElement, fireEvent } from "react-testing-library";
import {
  feedGetUserPlaylists,
  feedGetUserSavedAlbums,
  feedGetUserSavedTracks
} from "../feeds";
import { Provider, Consumer } from "../Context/Context";
import { StateMock } from "@react-mock/state";

const fakeSetCompGradient = jest.fn();

const fakeAPIrequest = jest.fn();
const renderFakeLibrary = tab =>
  render(
    <Provider
      value={{
        APIrequest: fakeAPIrequest,
        setCompGradient: fakeSetCompGradient
      }}
    >
      <Consumer>
        {context => (
          <StateMock
            state={{
              chosenTab: tab
            }}
          >
            <Library
              getUserPlaylists={feedGetUserPlaylists}
              getUserSavedAlbums={feedGetUserSavedAlbums}
              getUserSavedTracks={feedGetUserSavedTracks}
            />
          </StateMock>
        )}
      </Consumer>
    </Provider>
  );
test("Renders properly", () => {
  const { getByText } = renderFakeLibrary();
  expect(fakeAPIrequest).toHaveBeenCalledWith("getUserPlaylists");
  expect(fakeAPIrequest).toHaveBeenCalledWith("getUserSavedAlbums");
  expect(fakeAPIrequest).toHaveBeenCalledWith("getUserSavedTracks");
  getByText("Your Saved Playlists");
  expect(fakeSetCompGradient).toHaveBeenCalledWith(
    "linear-gradient(105deg, #000000 15%, #282828 100%)"
  );
});
test("Renders albums tab.", async () => {
  const { getByText } = renderFakeLibrary("ALBUMS");
  await wait(() => {
    getByText("Your Saved Albums");
  });
});
test("Renders tracks tab", async () => {
  const { getByText } = renderFakeLibrary("TRACKS");
  await wait(() => {
    getByText("Your Saved Tracks");
  });
});
test("Switches tabs onClick", async () => {
  const { getByText } = renderFakeLibrary("TRACKS");
  const tracksNavBtn = getByText("TRACKS");
  fireEvent.click(tracksNavBtn);
  await wait(() => getByText("Your Saved Tracks"));
});
