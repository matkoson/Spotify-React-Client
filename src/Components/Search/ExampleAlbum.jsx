import React from "react";
const getMinsSecs = (ms = 0) => {
  console.log(ms);
  ms = (ms - (ms % 1000)) / 1000;
  return {
    min: String(
      Math.floor(ms / 60) < 10 ? `0${Math.floor(ms / 60)}` : Math.floor(ms / 60)
    ),
    sec: String(ms % 60 < 10 ? `0${ms % 60}` : ms % 60)
  };
};
export default function ExampleAlbum(props) {
  let name, artist, albumsExmp, albums, cx, top5Tracks, totalDuration;
  if (props.albums.items) {
    albums = props.albums;
    albumsExmp = albums.items[0];
    if (albumsExmp) {
      name = albumsExmp.name;
      name = name.length > 26 ? `${name.slice(0, 26)}...` : name;
      artist = albumsExmp.artists[0].name;
      cx = albumsExmp.uri;
    }
  }
  if (props.tracks && props.tracks.items) {
    top5Tracks = props.tracks.items.slice(0, 5).map(e => {
      totalDuration = e.duration_ms;
      totalDuration = getMinsSecs(totalDuration);
      return (
        <li className="search-response__albums-example__tracks-li">
          <div class="title-name-wrapper">
            <span className="search-response__albums-example__tracks-li__name">
              {e.name}
            </span>
            <span className="search-response__albums-example__tracks-li__artist">
              {e.artists[0].name}
            </span>
          </div>
          <div className="search-response__albums-example__tracks-li__duration">
            {`${totalDuration.min}:${totalDuration.sec}`}
          </div>
        </li>
      );
    });
  }
  return (
    <div className="search__response__album-example">
      <div className="search__response__album-example__element ">
        <div
          className="search__response__album-example__element__img"
          data-cx={cx}
          onClick={e => {
            props.APIrequest("playSpecificPlayback", {
              cx: e.currentTarget.dataset.cx,
              cx_pos: e.currentTarget.dataset.cx_pos
            });
            props.APIrequest("currentlyPlaying");
          }}
          onMouseOver={e => {
            e.currentTarget.className =
              "search__response__album-example__element__img home-screen__made-for-user__playlist-element__img--hover";
          }}
          onMouseLeave={e =>
            (e.currentTarget.className =
              "search__response__album-example__element__img home-screen__made-for-user__playlist-element__img")
          }
          onMouseDown={e =>
            (e.currentTarget.className =
              "search__response__album-example__element__img home-screen__made-for-user__playlist-element__img--hover home-screen__made-for-user__playlist-element__img--click")
          }
          onMouseUp={e =>
            (e.currentTarget.className =
              "search__response__album-example__element__img home-screen__made-for-user__playlist-element__img--hover")
          }
        >
          {props.type !== "categories" && (
            <div
              className="app__play-hover"
              onMouseOver={e =>
                (e.currentTarget.className =
                  "app__play-hover app__play-hover--hover")
              }
              onMouseLeave={e =>
                (e.currentTarget.className = "app__play-hover")
              }
            >
              {props.playerState &&
              !props.playerState.paused &&
              ((props.currentlyPlaying.item &&
                cx === props.currentlyPlaying.item.uri) ||
                (props.currentlyPlaying.context &&
                  cx === props.currentlyPlaying.context.uri)) ? (
                <i
                  id="pause"
                  className="fas fa-pause app__pause-visible__icon"
                />
              ) : (
                <i id="play" className="fas fa-play app__play-hover__icon" />
              )}
              {/* check whether the uri of the curr playing album/artist/track is same as the uri of the generated element */}
            </div>
          )}
          <img
            height="200px"
            width="200px"
            src={albumsExmp && albums.items[0].images[0].url}
            alt=""
            className="search__response__album-example__img-file home-screen__made-for-user__playlist-element__img-pic"
          />
        </div>
        <div className="search__response__album-example__element__title home-screen__made-for-user__playlist-element__title">
          {name}
        </div>
        <div className="search__response__album-example__element__artist home-screen__made-for-user__playlist-element__artists">
          {artist}
        </div>
      </div>
      <div className="search__response__album-example__album-tracks">
        {/* {tracksList} */}
        <ul className="search__response__album-example__tracks-ul">
          {top5Tracks}
        </ul>
      </div>
    </div>
  );
}
