import React from "react";
import Discover from "../Components/Discover/Discover";
import { render, wait, waitForElement } from "react-testing-library";
import { Provider, Consumer } from "../Context/Context";
import { feedTopRelatedArtists, feedGetMultipleArtistAlbums } from "../feeds";
import { debug } from "util";

const fakeAPIrequest = jest.fn();
const renderFakeDiscover = albumListPresent =>
  render(
    <Provider value={{ APIrequest: fakeAPIrequest }}>
      <Consumer>
        {context => (
          <Discover
            getMultipleArtistAlbums={
              albumListPresent ? feedGetMultipleArtistAlbums : undefined
            }
            idList={feedTopRelatedArtists}
          />
        )}
      </Consumer>
    </Provider>
  );

it("Makes right requests when not fed with getMultipleArtistAlbums", () => {
  renderFakeDiscover();
  expect(fakeAPIrequest).toHaveBeenCalledWith("getMultipleArtists", {
    ids: feedTopRelatedArtists
  });
});
it("Renders correctly when fed with getMultipleArtistAlbums", async () => {
  const { getByText } = renderFakeDiscover(true);
  getByText("Recommended Albums & Singles");
  await wait(() => {
    getByText(feedGetMultipleArtistAlbums[0].items[0].name);
  });
});
