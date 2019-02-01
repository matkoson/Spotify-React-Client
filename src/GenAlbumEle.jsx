import React from "react";
// import { playerRequest } from "././APImethods";
function GenAlbumEle(props) {
  let name,
    image,
    key,
    dataType,
    cx,
    cx_pos,
    recentTracks,
    recentTracksPos,
    data = props.data,
    type = props.type;
  if (window.innerWidth < 1000 && data.length > 3) data = data.slice(0, 3);
  // console.log("generator data", data, type);
  // console.log('currPlay',props.currPlay)
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
      } else if (type === "featured") {
        name = e.name;
        image = e.images[0].url;
        key = e.id;
        dataType = e.type;
        cx = e.uri;
      } else if (type === "related") {
    //     if(props.currPlay)
    //  {   console.log(props.currPlay)
    //     console.log(props.currPlay.item.artists[0].name, e.name)}

        name = e.name;
        image = e.images[0].url;
        key = e.id;
        dataType = e.type;
        cx = e.uri;
      }
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
            onClick={e => {
              if (dataType === "artist") {
                props.playCX("playArtist", { cx: e.currentTarget.dataset.cx });
              } else if (dataType === "playlist") {
                props.playCX("playSpecificPlayback", {
                  cx: e.currentTarget.dataset.cx,
                  cx_pos: e.currentTarget.dataset.cx_pos
                });
              } else if (dataType === "track") {
                props.playCX("playRecentTracks", {
                  cx: recentTracks,
                  cx_pos: e.currentTarget.dataset.recent_pos
                });
              }
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
              {((dataType === "track") &&
                props.currPlay.item &&
                cx === props.currPlay.item.uri) ||
                (dataType==='artist'&&props.currPlay&&props.currPlay.item.artists[0].name===e.name)
                ||
              (dataType === "playlist" &&
                props.currPlay.context &&
                cx === props.currPlay.context.uri) ? (
                <i
                  id="pause"
                  className="fas fa-pause app__pause-visible__icon"
                />
              ) : (
                <i if="play" className="fas fa-play app__play-hover__icon" />
              )}
              {/* check whether the uri of the curr playing album/artist/track is same as the uri of the generated element */}
            </div>
            <img
              className={
                dataType !== "artist"
                  ? "home-screen__made-for-user__playlist-element__img-pic"
                  : "app__rounded-album home-screen__made-for-user__playlist-element__img-pic"
              }
              height="200px"
              width="200px"
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

export default GenAlbumEle;
