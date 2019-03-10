import { render } from "react-testing-library";
import React from "react";
import { fireEvent } from "react-testing-library/dist";
import ExampleAlbum from "../Components/Search/ExampleAlbum";
import { feedTracks, feedExmplAlbum } from "../feeds";

const handelAlbumFake = jest.fn();
const APIfake = jest.fn();
const setup = (paused = false) => {
  const utils = render(
    <ExampleAlbum
      tracks={feedTracks}
      getMinsSecs={jest.fn()}
      albums={feedExmplAlbum}
      APIrequest={APIfake}
      handleAlbumRightOverride={handelAlbumFake}
      player={jest.fn()}
      playerState={{ paused: paused }}
      currentlyPlaying={{ item: { uri: feedExmplAlbum.items[0].uri } }}
    />
  );
  const imgEle = utils.getByAltText("Example album");
  return { imgEle, ...utils };
};
test("Click on the example image leads to the correct API request being called for.", () => {
  const { imgEle } = setup();
  fireEvent.click(imgEle);
  expect(APIfake).toHaveBeenCalledWith("currentlyPlaying");
  expect(APIfake).toHaveBeenCalledWith(
    "playSpecificPlayback",
    expect.anything()
  );
});
test("Hovering over example displays the pause or play icon, depending on the conditions.", () => {
  let { imgEle } = setup();
  fireEvent.mouseOver(imgEle);
  let { getByTestId } = setup();
  getByTestId("pause");
  const playCondition = setup(true);
  getByTestId = playCondition.getByTestId;
  fireEvent.mouseOver(imgEle);
  getByTestId("play");
  fireEvent.mouseLeave(imgEle);
  getByTestId("invisible");
  fireEvent.mouseDown(imgEle);
  getByTestId("clicked");
});
test("Click on the example album title results in the correct API request being made.", () => {
  const { getByText } = setup();
  const albumEle = getByText(
    `${feedExmplAlbum.items[0].name.slice(0, 26)}...`,
    { exact: false }
  );
  fireEvent.click(albumEle);
  expect(handelAlbumFake).toHaveBeenCalled();
});
test("Click on a track presented in the 'top results' section calles for a specific playback.", () => {
  const { getByText } = setup();
  const trackEle = getByText(feedTracks.items[0].artists[0].name);
  fireEvent.click(trackEle);
  expect(APIfake).toHaveBeenCalled();
});
// debug();
