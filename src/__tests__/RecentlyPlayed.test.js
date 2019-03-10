import RecentlyPlayed from "../Components/RecentlyPlayed/RecentlyPlayed";
import { render, wait, getByTestId } from "react-testing-library";
import { feedRawRecPlayed } from "../feeds";
import React from "react";
import { fireEvent } from "react-testing-library/dist";
import { handleNavClick } from "../AppMethods/AppMethods";
import { debug } from "util";

const fakeAPIrequest = jest.fn();
const renderFakeRecentlyPlayed = () =>
  render(
    <RecentlyPlayed
      handleNavClick={handleNavClick}
      rawRecPlayed={feedRawRecPlayed}
      APIrequest={fakeAPIrequest}
      player={[]}
    />
  );
test("Correctly acknowledges clicking on one of the recently played tracks", async () => {
  const { getByText, getByTestId, debug } = renderFakeRecentlyPlayed();
  const getTrack = getByText(feedRawRecPlayed.items[0].track.name);
  fireEvent.click(getTrack);
  expect(fakeAPIrequest).toHaveBeenCalledWith("playRecentTracks", {
    cx: feedRawRecPlayed.items[0].track.uri
  });
  await wait(() => {
    getByTestId("clickedNavBtn");
    fireEvent.mouseLeave(getTrack);
    // debug();
    getByTestId("navBtnClickedLeft");
  });
});
test("Correctly responds to mouseOver and mouseLeave events.", () => {
  const { getByText, getByTestId } = renderFakeRecentlyPlayed();
  const getTrack = getByText(feedRawRecPlayed.items[0].track.name);
  fireEvent.mouseOver(getTrack);
  getByTestId("navBtnOver");
  fireEvent.mouseLeave(getTrack);
  getByTestId("navBtnLeft");
});
