import React, { useEffect, useContext } from "react";
import ContainerGenerator from "../ContainerGenerator/ContainerGenerator";
import HeadlineAnimator from "../Helpers/HeadlineAnimator";
import { Context } from "../../Context/Context";
import "../../Styles/Base/app.scss";

let headlines;
function renderCharts(props) {
  const context = useContext(Context);

  useEffect(() => {
    if (context) {
      if (!props.PolandTop) {
        context.APIrequest("getCategoryPlaylists", {
          category: "toplists",
          country: "PL"
        });
      }
      if (props.getCategoryPlaylists && !props.getCategoryPlaylists.length) {
        const visited = {};
        let index;
        for (let i = 0; i < 20; i += 1) {
          index = Math.round(Math.random() * (props.countryCodes.length - 1));
          while (visited[props.countryCodes[index].isoCode])
            index = Math.round(Math.random() * (props.countryCodes.length - 1)); //making sure not to fetch one country's playlists twice
          visited[props.countryCodes[index].isoCode] = true;
          context.APIrequest("getCategoryPlaylists", {
            category: "toplists",
            country: props.countryCodes[index].isoCode
          });
        }
      }
    }
  });
  let countryTop, countryViral, PolandTop;
  if (props.PolandTop) {
    PolandTop = (
      <ContainerGenerator
        data={props.PolandTop.playlists.items.slice(0, 5)}
        type={"playlists"}
      />
    );
  }
  //
  //
  //
  if (PolandTop && props.getCategoryPlaylists && props.getCategoryPlaylists) {
    let hash = {};
    countryTop =
      props.getCategoryPlaylists.length &&
      props.getCategoryPlaylists
        .map(e => {
          const name = e.playlists.items[e.playlists.items.length - 5].name;
          hash[name] ? (hash[name] += 1) : (hash[name] = 1);
          return e.playlists.items[e.playlists.items.length - 5];
        })
        .filter(e => {
          return hash[e.name] < 2 && /^(?!.*(Global Top)).*50$/.test(e.name);
        });
    hash = {}; //cleaning hash
    countryViral =
      props.getCategoryPlaylists.length &&
      props.getCategoryPlaylists
        .map(e => {
          const name = e.playlists.items[e.playlists.items.length - 2].name;
          hash[name] ? (hash[name] += 1) : (hash[name] = 1);
          return e.playlists.items[e.playlists.items.length - 2];
        })
        .filter(e => {
          return /^(?!.*(Global Viral)).*50$/.test(e.name) && hash[e.name] < 2;
        });
  }
  headlines = [
    "Featured Charts",
    "Top 50 by Country",
    "Viral 50 by Country"
  ].map(e => <HeadlineAnimator title={e} />);

  return {
    countryTop,
    countryViral,
    PolandTop,
    headlines
  };
}
export default function Charts(props) {
  const { countryTop, countryViral, PolandTop } = renderCharts(props);
  return (
    <div className="generator" data-testid="navCharts">
      {headlines[0]}
      {PolandTop}
      {PolandTop && headlines[1]}
      {PolandTop && (
        <ContainerGenerator
          forbidAnimate={true}
          data={countryTop}
          type={"playlists"}
        />
      )}
      {PolandTop && headlines[2]}
      {PolandTop && (
        <ContainerGenerator
          forbidAnimate={true}
          data={countryViral}
          type={"playlists"}
        />
      )}
    </div>
  );
}
