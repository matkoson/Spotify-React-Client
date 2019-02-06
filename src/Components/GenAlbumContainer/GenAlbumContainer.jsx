import React from "react";
// import { playerRequest } from "././APImethods";
let name, image, key, dataType, cx, cx_pos, recentTracks, recentTracksPos;
export default function GenAlbumContainer(props) {
  const data = props.data,
    type = props.type;
  // console.log(data, type);
  if (props && data)
    return data.map((e, i) => {
      // if (type === "featured") console.log(data);
      if (type === "recent") {
        name = e.track.name;
        image = e.track.album.images[0].url;
        key = e.played_at;
        dataType = e.track.type;
        cx = e.track.uri;
        cx_pos = e.track.track_number;
        recentTracksPos = i;
        if (!recentTracks) recentTracks = data.map(e => e.track.uri);
      } else if (type === "playlists" || type === "categories") {
        name = e.name;
        key = e.href || e.id;
        // console.log('key',key)
        image = type === "playlists" ? e.images[0].url : e.icons[0].url;
        dataType = e.type;
        cx = e.uri;
      }
      // } else if (type === "playlists") {
      //   //     if(props.currPlay)
      //   //  {   console.log(props.currPlay)
      //   //     console.log(props.currPlay.item.artists[0].name, e.name)}

      //   name = e.name;
      //   image = e.images[0].url;
      //   key = e.id;
      //   dataType = e.type;
      //   cx = e.uri;
      // }
      // if (dataType === "playlist") console.log(props.data, props.currPlay);

      //
      //
      //
      return (
        <div key={key} className="home-screen__made-for-user__playlist-element">
          {/*  */}
          {/*  */}
          {/*  */}
          <div
            className="home-screen__made-for-user__playlist-element__img"
            data-cx={cx}
            data-cx_pos={
              cx_pos ? (dataType !== "track" ? cx_pos : recentTracksPos) : null
            }
            data-recent_pos={dataType === "track" ? recentTracksPos : null}
            data-data_type={dataType}
            onClick={e => {
              // console.log(e.currentTarget.dataset);
              if (e.currentTarget.dataset.data_type === "artist") {
                props.APIrequest("playArtist", {
                  cx: e.currentTarget.dataset.cx
                });
              }
              if (e.currentTarget.dataset.data_type === "playlist") {
                props.APIrequest("playSpecificPlayback", {
                  cx: e.currentTarget.dataset.cx,
                  cx_pos: e.currentTarget.dataset.cx_pos
                });
              }
              if (e.currentTarget.dataset.data_type === "track") {
                props.APIrequest("playRecentTracks", {
                  cx: recentTracks,
                  cx_pos: e.currentTarget.dataset.recent_pos
                });
              }
              props.APIrequest("currentlyPlaying");
            }}
            onMouseOver={e => {
              e.currentTarget.className =
                "home-screen__made-for-user__playlist-element__img--hover";
            }}
            onMouseLeave={e =>
              (e.currentTarget.className =
                "home-screen__made-for-user__playlist-element__img")
            }
            onMouseDown={e =>
              (e.currentTarget.className =
                "home-screen__made-for-user__playlist-element__img--hover home-screen__made-for-user__playlist-element__img--click")
            }
            onMouseUp={e =>
              (e.currentTarget.className =
                "home-screen__made-for-user__playlist-element__img--hover")
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
                ((dataType === "track" &&
                  props.currPlay.item &&
                  cx === props.currPlay.item.uri) ||
                  (dataType === "artist" &&
                    props.currPlay &&
                    props.currPlay.item.artists[0].name === e.name) ||
                  (dataType === "playlist" &&
                    props.currPlay.context &&
                    cx === props.currPlay.context.uri)) ? (
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
              className={
                dataType !== "artist"
                  ? "home-screen__made-for-user__playlist-element__img-pic"
                  : "app__rounded-album home-screen__made-for-user__playlist-element__img-pic"
              }
              height="300px"
              width="300px"
              src={image}
              alt=""
            />
          </div>
          {/*  */}
          {/*  */}
          {/*  */}
          <div className="home-screen__made-for-user__playlist-element__title">
            {name}
          </div>
          <div className="home-screen__made-for-user__playlist-element__artists" />
        </div>
      );
    });
}
