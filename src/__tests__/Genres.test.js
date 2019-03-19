import React from "react";
import Genres from "../Components/Genres/Genres";
import { render, fireEvent } from "react-testing-library";
import { feedGetCategories } from "../feeds";
import { Provider, Consumer } from "../Context/Context";

const fakeSetCompGradient = jest.fn();
const fakeAPIrequest = jest.fn();
const fakeHandleInnerCategoryViewChangeChange = jest.fn();
const renderFakeGenres = data =>
  render(
    <Provider
      value={{
        handleInnerCategoryViewChange: fakeHandleInnerCategoryViewChangeChange,
        APIrequest: fakeAPIrequest,
        setCompGradient: fakeSetCompGradient
      }}
    >
      <Consumer>
        {context => <Genres getCategories={data ? feedGetCategories : null} />}
      </Consumer>
    </Provider>
  );

test("Renders Genres component correctly, when fed with data.", () => {
  const { getByText } = renderFakeGenres(true);
  feedGetCategories.categories.items
    .map(e => e.name)
    .forEach(e => getByText(e));
});
test("Makes the right request when no data is provided.", () => {
  renderFakeGenres(false);
  expect(fakeAPIrequest).toHaveBeenCalledWith("getCategories");
  expect(fakeSetCompGradient).toHaveBeenCalledWith(
    "linear-gradient(105deg, #000000 30%,  #584501 100%"
  );
});

test("Makes the right request when no data is provided.", () => {
  const { getByTestId } = renderFakeGenres(true);
  fireEvent.click(getByTestId("containerGeneratedElement"));
  expect(fakeHandleInnerCategoryViewChangeChange).toHaveBeenCalled();
});
