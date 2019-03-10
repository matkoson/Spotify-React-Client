import NewReleases from "../Components/NewReleases/NewReleases";
import React from "react";
import { render, wait, waitForElement, fireEvent } from "react-testing-library";
import { feedGetNewReleases } from "../feeds";
import { Provider, Consumer } from "../Context/Context";
import { StateMock } from "@react-mock/state";

const fakeAPIrequest = jest.fn();
const renderFakeNewReleases = On =>
  render(
    <Provider value={{ APIrequest: fakeAPIrequest }}>
      <Consumer>
        {context => (
          <NewReleases getNewReleases={On ? feedGetNewReleases : null} />
        )}
      </Consumer>
    </Provider>
  );

test("Renders properly", async () => {
  const { debug, getByText } = renderFakeNewReleases(true);
  getByText("New albums & singles");
  getByText(feedGetNewReleases.albums.items[0].name);
  getByText(feedGetNewReleases.albums.items[0].artists[0].name);
});

test("Correctly makes a request for the required data.", async () => {
  renderFakeNewReleases();
  await wait(() =>
    expect(fakeAPIrequest).toHaveBeenCalledWith("getNewReleases")
  );
});
