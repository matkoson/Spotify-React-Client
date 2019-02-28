import React from "react";
import App from "../App";
import sinon from "sinon";
import { render } from "react-testing-library";

// import { render } from "react-testing-library";

it("Renders without crashing", () => {
  sinon.stub(window.location, "assign");
  render(<App />);
});
it("", () => {});
// it("Renders correct initial URL",()=>{

// })
