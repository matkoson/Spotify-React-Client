import React from "react";
import GenAlbumContainer from "../GenAlbumContainer/GenAlbumContainer";

function renderCharts(props) {
  let countryTop, countryViral, PolandTop;
  if (props.PolandTop) {
    PolandTop = (
      <GenAlbumContainer
        data={props.PolandTop.playlists.items}
        type={"playlists"}
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
    countryTop = <GenAlbumContainer data={countryTop} type={"playlists"} />;
    const hash = {};
    countryViral = props.getCategoryPlaylists
      .map(e => {
        const name = e.playlists.items[e.playlists.items.length - 2].name;
        hash[name] ? (hash[name] += 1) : (hash[name] = 1);
        return e.playlists.items[e.playlists.items.length - 2];
      })
      .filter(e => {
        // console.log("DUPL?", /^(?!.*(Global Viral)).*50$/.test(e.name));
        return /^(?!.*(Global Viral)).*50$/.test(e.name) && hash[e.name] < 2;
      });
    countryViral = <GenAlbumContainer data={countryViral} type={"playlists"} />;
  }

  return {
    countryTop,
    countryViral,
    PolandTop
  };
}
export default function Charts(props) {
  const { countryTop, countryViral, PolandTop } = renderCharts(props);
  return (
    <div className="home-screen">
      <h2 className="app__fetch-title home-screen__made-for-user__title">
        {"Featured Charts"}
      </h2>
      <div className="app__fetch-container home-screen__made-for-user__playlist-container">
        {PolandTop || <GenAlbumContainer />}
      </div>
      <h2 className="app__fetch-title">{"Top 50 by Country"}</h2>
      <div className="app__fetch-container ">
        {countryTop || <GenAlbumContainer />}
      </div>
      <h2 className="app__fetch-title">{"Viral 50 by Country"}</h2>
      <div className="app__fetch-container ">
        {countryViral || <GenAlbumContainer />}
      </div>
    </div>
  );
}
