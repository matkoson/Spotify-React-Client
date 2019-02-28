import React from "react";
import { render } from "react-testing-library";
import "jest-dom/extend-expect";
import { Provider, Consumer } from "./Context";

it("Consumer shows default value", () => {
  const tree = (
    <Provider
      value={{
        playerState: "STATE",
        APIrequest: "API",
        currentlyPlaying: "CURRENT",
        getMinsSecs: "MINSEC"
      }}
    >
      <Consumer>
        {context => (
          <span>
            {`playerState${context.playerState}`}
            {`APIrequest${context.APIrequest}`}
            {`currentlyPlaying${context.currentlyPlaying}`}
            {`getMinsSecs${context.getMinsSecs}`}
          </span>
        )}
      </Consumer>
    </Provider>
  );
  const { getByText } = render(tree);
  console.log(getByText);
  expect(getByText(/playerState/)).toHaveTextContent(
    "STATE",
    "API",
    "CURRENT",
    "MINSEC"
  );
});
