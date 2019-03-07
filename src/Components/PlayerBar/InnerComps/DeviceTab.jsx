import React from "react";
import devicePng from "../../../assets/devices.png";
import("../../../Styles/Components/devices-tab.scss");
export default function DeviceTab(props) {
  return props.deviceName ? (
    <div className="devices-tab" data-testid="deviceTabOn">
      <span className="devices-tab__title">Active Device</span>
      <img className="devices-tab__img" src={devicePng} alt="" />
      <div className="devices-tab__listening-device">
        <span className="devices-tab__device-title">Listening On:</span>
        <i className="fas fa-laptop" style={{ color: "#1db954" }} />
        <div className="devices-tab__listening-device__device-data">
          <i className="fas fa-headphones" />
          <span className="devices-tab__device-name">{props.deviceName}</span>
        </div>
      </div>
    </div>
  ) : (
    <div className="devices-tab" data-testid="deviceTabOn">
      <span className="devices-tab__title">No active devices</span>{" "}
    </div>
  );
}
