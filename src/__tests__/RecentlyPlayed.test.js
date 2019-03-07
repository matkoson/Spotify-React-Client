import RecentlyPlayed from "../Components/RecentlyPlayed/RecentlyPlayed";
import { render, wait, getByTestId } from "react-testing-library";
import { feedRawRecPlayed } from "../feeds";
import React from "react";
import { fireEvent } from "react-testing-library/dist";
import { handleNavClick } from "../AppMethods/AppMethods";

it("Correctly acknowledges clicking on one of the recently played tracks", async () => {
  const { getByText, getByTestId } = render(
    <RecentlyPlayed
      handleNavClick={handleNavClick}
      rawRecPlayed={feedRawRecPlayed}
    />
  );
  const getTrack = getByText(feedRawRecPlayed.items[0].track.name);
  fireEvent.click(getTrack);
  await wait(() => getByTestId("clickedNavBtn"));
});
