import React from "react";

export default function ExampleAlbum(props) {
  let name, artist, albumsExmp, albums, cx, top5Tracks, totalDuration;
  if (props.albums && props.albums.items) {
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
      totalDuration = props.getMinsSecs(totalDuration);
      return (
        <li className="search__response__album-example__tracks-li">
          <div className="title-name-wrapper">
            <span className="search__response__album-example__tracks-li__name">
              {e.name}
            </span>
            <span className="search__response__album-example__tracks-li__artist">
              {e.artists[0].name}
            </span>
          </div>
          <div className="search__response__album-example__tracks-li__duration">
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
              "search__response__album-example__element__img generator__playlist-element__img--hover";
          }}
          onMouseLeave={e =>
            (e.currentTarget.className =
              "search__response__album-example__element__img generator__playlist-element__img")
          }
          onMouseDown={e =>
            (e.currentTarget.className =
              "search__response__album-example__element__img generator__playlist-element__img--hover generator__playlist-element__img--click")
          }
          onMouseUp={e =>
            (e.currentTarget.className =
              "search__response__album-example__element__img generator__playlist-element__img--hover")
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
            height="250px"
            width="250px"
            src={albumsExmp && albums.items[0].images[0].url}
            alt=""
            className="search__response__album-example__img-file generator__playlist-element__img-pic"
          />
        </div>
        <div className="search__response__album-example__element__title generator__playlist-element__title">
          {name}
        </div>
        <div className="search__response__album-example__element__artist generator__playlist-element__artists">
          {artist}
        </div>
      </div>
      <div className="search__response__album-example__album-tracks">
        <ul className="search__response__album-example__tracks-ul">
          {top5Tracks}
        </ul>
      </div>
    </div>
  );
}
