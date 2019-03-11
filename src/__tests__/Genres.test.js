import React from "react";
import Genres from "../Components/Genres/Genres";
import { render, fireEvent } from "react-testing-library";
import { feedGetCategories } from "../feeds";
import { Provider, Consumer } from "../Context/Context";

const fakeAPIrequest = jest.fn();
const fakeHandleMainRightViewChange = jest.fn();
const renderFakeGenres = data =>
  render(
    <Provider
      value={{
        handleMainRightViewChange: fakeHandleMainRightViewChange,
        APIrequest: fakeAPIrequest
      }}
    >
      <Consumer>
        {context => <Genres getCategories={data ? feedGetCategories : null} />}
      </Consumer>
    </Provider>
  );

test("Renders Genres component correctly, when fed with data.", async () => {
  const { getByText } = renderFakeGenres(true);
  feedGetCategories.categories.items
    .map(e => e.name)
    .forEach(e => getByText(e));
});
test("Makes the right request when no data is provided.", () => {
  renderFakeGenres(false);
  expect(fakeAPIrequest).toHaveBeenCalledWith("getCategories");
});

test("Makes the right request when no data is provided.", () => {
  const { getByTestId } = renderFakeGenres(true);
  fireEvent.click(getByTestId("containerGeneratedElement"));
  expect(fakeHandleMainRightViewChange).toHaveBeenCalled();
});
