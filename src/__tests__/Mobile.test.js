import React from "react";
import Mobile from "../Components/Mobile/Mobile";
import { render, fireEvent } from "react-testing-library";

const fakeHandleMainRightChange = jest.fn();

test("Calles the right callback when clicking on mobileNav", () => {
  const { getByText } = render(
    <Mobile mobile={true} handleMainRightChange={fakeHandleMainRightChange} />
  );
  const mobileSearchBtn = getByText("Search");
  fireEvent.click(mobileSearchBtn);
  expect(fakeHandleMainRightChange).toHaveBeenCalled();
});
