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

const fakeAPIrequest = jest.fn();
const renderFakeLibrary = tab =>
  render(
    <Provider value={{ APIrequest: fakeAPIrequest }}>
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
it("Renders properly", () => {
  const { getByText } = renderFakeLibrary();
  expect(fakeAPIrequest).toHaveBeenCalledWith("getUserPlaylists");
  expect(fakeAPIrequest).toHaveBeenCalledWith("getUserSavedAlbums");
  expect(fakeAPIrequest).toHaveBeenCalledWith("getUserSavedTracks");
  getByText("Your Saved Playlists");
});
it("Renders albums tab.", async () => {
  const { getByText } = renderFakeLibrary("ALBUMS");
  await wait(() => {
    getByText("Your Saved Albums");
  });
});
it("Renders tracks tab", async () => {
  const { getByText } = renderFakeLibrary("TRACKS");
  await wait(() => {
    getByText("Your Saved Tracks");
  });
});
it("Switches tabs onClick", async () => {
  const { getByText } = renderFakeLibrary("TRACKS");
  const tracksNavBtn = getByText("TRACKS");
  fireEvent.click(tracksNavBtn);
  await wait(() => getByText("Your Saved Tracks"));
});
