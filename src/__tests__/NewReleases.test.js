import NewReleases from "../Components/NewReleases/NewReleases";
import React from "react";
import { render, wait, waitForElement, fireEvent } from "react-testing-library";
import { feedGetNewReleases } from "../feeds";
import { Provider, Consumer } from "../Context/Context";
import { StateMock } from "@react-mock/state";

const fakeSetCompGradient = jest.fn();
const fakeAPIrequest = jest.fn();
const renderFakeNewReleases = On =>
  render(
    <Provider
      value={{
        APIrequest: fakeAPIrequest,
        setCompGradient: fakeSetCompGradient
      }}
    >
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
  expect(fakeSetCompGradient).toHaveBeenCalledWith(
    "linear-gradient(105deg, #000000 20%, #7d1463 30%,#5e1330 100%)"
  );
});

test("Correctly makes a request for the required data.", async () => {
  renderFakeNewReleases();
  await wait(() =>
    expect(fakeAPIrequest).toHaveBeenCalledWith("getNewReleases")
  );
});
