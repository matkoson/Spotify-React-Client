import React from "react";
import { animated, useSpring, useTransition } from "react-spring";

export default function Animator(props) {
  const calc = (x, y) => [
    -(y - window.innerHeight / 2) / 20,
    (x - window.innerWidth / 2) / 20,
    1.03
  ];
  var [propsAnimate, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 20, tension: 200, friction: 50 }
  }));
  const trans = (x, y, s) =>
    `perspective(800px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;
  const { key, content } = props;
  return (
    <animated.div
      key={key}
      className="generator__playlist-element"
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{
        transform: propsAnimate.xys.interpolate(trans)
      }}
    >
      {content}
    </animated.div>
  );
}
