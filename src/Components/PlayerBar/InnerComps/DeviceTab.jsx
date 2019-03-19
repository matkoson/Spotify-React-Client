import React from "react";
import devicePng from "../../../assets/devices.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTransition, animated } from "react-spring";

import("../../../Styles/Components/devices-tab.scss");
export default function DeviceTab(propsDev) {
  const transition = useTransition(propsDev.isDeviceTabOn, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });
  return transition.map(
    ({ item, props }) =>
      item &&
      (propsDev.deviceName ? (
        <animated.div
          style={props}
          className="devices-tab"
          data-testid="deviceTabOn"
        >
          <span className="devices-tab__title">Active Device</span>
          <img className="devices-tab__img" src={devicePng} alt="" />
          <div className="devices-tab__listening-device">
            <span className="devices-tab__device-title">Listening On:</span>
            <FontAwesomeIcon
              data-testid="laptopIcon"
              icon="laptop"
              className="fas"
              style={{ color: "#1db954" }}
            />

            <div className="devices-tab__listening-device__device-data">
              <FontAwesomeIcon
                data-testid="headphonesAlt"
                icon="headphones-alt"
                className="fas"
              />
              <span className="devices-tab__device-name">
                {propsDev.deviceName}
              </span>
            </div>
          </div>
        </animated.div>
      ) : (
        <animated.div
          style={props}
          className="devices-tab"
          data-testid="deviceTabOn"
        >
          <span className="devices-tab__title">No active devices</span>
        </animated.div>
      ))
  );
}
