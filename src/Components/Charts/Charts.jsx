import React from "react";
import ContainerGenerator from "../ContainerGenerator/ContainerGenerator";
import HeadlineAnimator from "../Helpers/HeadlineAnimator";

let headlines;
function renderCharts(props) {
  let countryTop, countryViral, PolandTop;
  if (props.PolandTop) {
    PolandTop = (
      <ContainerGenerator
        data={props.PolandTop.playlists.items}
        type={"playlists"}
        animate={true}
      />
    );
  }
  //
  //
  //
  if (props.getCategoryPlaylists.length) {
    countryTop = props.getCategoryPlaylists
      .map(e => e.playlists.items[e.playlists.items.length - 5])
      .filter(e => {
        return (
          /^(?!.*(Global Top)).*50$/.test(e.name) && e.name.includes("Top")
        );
      });
    countryTop = <ContainerGenerator data={countryTop} type={"playlists"} />;
    const hash = {};
    countryViral = props.getCategoryPlaylists
      .map(e => {
        const name = e.playlists.items[e.playlists.items.length - 2].name;
        hash[name] ? (hash[name] += 1) : (hash[name] = 1);
        return e.playlists.items[e.playlists.items.length - 2];
      })
      .filter(e => {
        return /^(?!.*(Global Viral)).*50$/.test(e.name) && hash[e.name] < 2;
      });
    countryViral = (
      <ContainerGenerator data={countryViral} type={"playlists"} />
    );
  }
  headlines = ["Featured Charts", "Top 50 by Country", "Viral 50 by Country"];
  headlines = HeadlineAnimator(headlines);

  return {
    countryTop,
    countryViral,
    PolandTop
  };
}
export default function Charts(props) {
  const { countryTop, countryViral, PolandTop } = renderCharts(props);
  return (
    <div className="generator">
      {headlines[0]}
      <div className="app__fetch-container generator__playlist-container">
        {PolandTop || <ContainerGenerator />}
      </div>
      {headlines[1]}{" "}
      <div className="app__fetch-container ">
        {countryTop || <ContainerGenerator />}
      </div>
      {headlines[2]}{" "}
      <div className="app__fetch-container ">
        {countryViral || <ContainerGenerator />}
      </div>
    </div>
  );
}
