import React, { useState } from "react";
import { animated, useTransition } from "react-spring";

export default function HeadlineAnimator(props) {
  let [show] = useState();
  let transitions = useTransition(show, null, {
    from: { opacity: 0, transform: "translate3d(0,-40px,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0px,0)" },
    unique: true
  });

  return props.map((e, i) =>
    transitions.map(({ props }) => (
      <animated.h2
        key={i}
        style={props}
        className="app__fetch-title generator__title"
      >
        {e}
      </animated.h2>
    ))
  );
}
