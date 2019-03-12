import React, { useState } from "react";
import { animated, useTransition } from "react-spring";

export default function HeadlineAnimator(props) {
  let transitions = useTransition([props.title], null, {
    from: { opacity: 0, transform: "translate3d(0,-40px,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0px,0)" },
    unique: true
  });

  return transitions.map(({ item, props }) => (
    <animated.h2
      key={item}
      style={props}
      className="app__fetch-title generator__title"
    >
      {item}
    </animated.h2>
  ));
}
