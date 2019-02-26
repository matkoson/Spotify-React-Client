import React, { lazy, useState } from "react";
import { Consumer } from "../../Context/Context";
import { animated, useSpring, useTransition } from "react-spring";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SimpleImg, initSimpleImg } from "react-simple-img";
import recentData from "./lazyRecentDeclaration";
import playlistData from "./lazyPlaylistDeclaration";
initSimpleImg({ threshold: [0.6] });
const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.03
];
const trans = (x, y, s) =>
  `perspective(2000px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

function ContainerGenerator(props) {
  let data = props.data,
    special = props.special,
    type = props.type,
    artistName = null,
    context = props.context,
    animate = props.animate,
    dataDef; // hash = {};
  let imgMeasurements = { width: "300px", height: "300px" };
  // console.log(type, data);
  if (props && data) {
    return data.map((e, i) => {
      if (type === "recent") {
        dataDef = recentData(e, data, i, type);
      } else if (type === "playlists" || type === "categories") {
        dataDef = playlistData(e, data, type);
      }
      let {
        name,
        image,
        key,
        dataType,
        cx,
        cx_pos,
        recentTracks,
        recentTracksPos,
        id,
        idS,
        albumType,
        artistName
      } = dataDef;
      if (animate) {
        var [show] = useState();
        var [propsAnimate, set] = useSpring(() => ({
          xys: [0, 0, 1],
          config: { mass: 20, tension: 200, friction: 50 }
        }));
        var transitions = useTransition(show, null, {
          from: { opacity: 0, transform: "translate3d(0,-40px,0)" },
          enter: { opacity: 1, transform: "translate3d(0,0px,0)" },
          unique: true
        });
      }
      //
      const content = (
        <React.Fragment key={key || idS}>
          <div
            key={key || idS}
            style={
              !special
                ? window.innerWidth < 428 && e === 0 && type === "playlist"
                  ? {
                      marginBottom: "50px",
                      boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.9)"
                    }
                  : {
                      boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.9)"
                    }
                : null
            }
            className="generator__playlist-element__img"
            data-cx={cx}
            data-cx_pos={
              cx_pos ? (dataType !== "track" ? cx_pos : recentTracksPos) : null
            }
            data-recent_pos={dataType === "track" ? recentTracksPos : null}
            data-data_type={dataType}
            data-category_type={dataType === "categories" ? id : null}
            onClick={e => {
              if (e.currentTarget.dataset.data_type === "categories") {
                context.handleMainRightViewChange(e);
              }
              if (special || e.currentTarget.dataset.data_type === "artist") {
                return context.APIrequest("playArtist", {
                  cx: e.currentTarget.dataset.cx
                });
              }
              if (e.currentTarget.dataset.data_type === "playlists") {
                context.APIrequest("playSpecificPlayback", {
                  cx: e.currentTarget.dataset.cx,
                  cx_pos: e.currentTarget.dataset.cx_pos
                });
              }
              if (e.currentTarget.dataset.data_type === "track") {
                context.APIrequest("playRecentTracks", {
                  cx: recentTracks,
                  cx_pos: e.currentTarget.dataset.recent_pos
                });
              }
              context.APIrequest("currentlyPlaying");
            }}
            onMouseOver={e => {
              e.currentTarget.className =
                "generator__playlist-element__img--hover";
            }}
            onMouseLeave={e =>
              (e.currentTarget.className = "generator__playlist-element__img")
            }
            onMouseDown={e =>
              (e.currentTarget.className =
                "generator__playlist-element__img--hover generator__playlist-element__img--click")
            }
            onMouseUp={e =>
              (e.currentTarget.className =
                "generator__playlist-element__img--hover")
            }
          >
            {props.type !== "categories" && (
              <div
                className="app__play-hover"
                onMouseOver={e => (
                  (e.currentTarget.className =
                    "app__play-hover app__play-hover--hover"),
                  (e.currentTarget.nextSibling.className =
                    "generator__playlist-element__img__overlay--hover")
                )}
                onMouseLeave={e =>
                  (e.currentTarget.className = "app__play-hover")
                }
              >
                {context.playerState &&
                !context.playerState.paused &&
                ((dataType === "track" &&
                  context.currentlyPlaying.item &&
                  cx === context.currentlyPlaying.item.uri) ||
                  (dataType === "artist" &&
                    context.currentlyPlaying &&
                    context.currentlyPlaying.item &&
                    context.currentlyPlaying.item.artists[0].name === e.name) ||
                  (dataType === "playlist" &&
                    context.currentlyPlaying.context &&
                    cx === context.currentlyPlaying.context.uri)) ? (
                  <FontAwesomeIcon
                    icon="play"
                    className=" app__pause-visible__icon"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon="play"
                    className="app__play-hover__icon"
                  />
                )}
                {/* check whether the uri of the curr playing album/artist/track is same as the uri of the generated element */}
              </div>
            )}
            <div
              className="generator__playlist-element__img__overlay"
              onMouseOver={e =>
                (e.currentTarget.className =
                  "generator__playlist-element__img__overlay--hover")
              }
              onMouseLeave={e =>
                (e.currentTarget.className =
                  "generator__playlist-element__img__overlay")
              }
            >
              <SimpleImg
                className={
                  !special
                    ? "generator__playlist-element__img__pic"
                    : "app__rounded-album generator__playlist-element__img__pic"
                }
                onMouseLeave={e =>
                  (e.target.className = !special
                    ? "generator__playlist-element__img__pic"
                    : "app__rounded-album generator__playlist-element__img__pic")
                }
                placeholder="#282828"
                height={imgMeasurements.height}
                width={imgMeasurements.width}
                style={{ height: "100%", width: "100%" }}
                src={image}
                animationDuration={1}
                alt=""
                key={key || idS}
              />
            </div>
          </div>
          {/*  */}
          {/*  */}
          {/*  */}
          <Link to="../../album">
            <div
              data-identi={albumType}
              data-album={idS}
              onClick={e => {
                return context.handleAlbumRightOverride(e, albumType);
              }}
              className="generator__playlist-element__title"
            >
              {name}
            </div>
          </Link>
          <div className="generator__playlist-element__artists">
            {artistName ? artistName : null}
          </div>
        </React.Fragment>
      );
      const contentNested = (
        <React.Fragment key={key || idS}>
          {animate ? (
            transitions.map(({ props }) => (
              <animated.div
                key={key || idS}
                className="generator__animation-wrapper"
                style={props}
              >
                <animated.div
                  key={key || idS}
                  className="generator__playlist-element"
                  onMouseMove={({ clientX: x, clientY: y }) =>
                    set({ xys: calc(x, y) })
                  }
                  onMouseLeave={() => set({ xys: [0, 0, 1] })}
                  style={{ transform: propsAnimate.xys.interpolate(trans) }}
                >
                  {content}
                </animated.div>
              </animated.div>
            ))
          ) : (
            <div key={key || idS} className="generator__playlist-element">
              {content}
            </div>
          )}
        </React.Fragment>
      );
      return (
        <React.Fragment key={key || idS}>
          {type === "categories" ? (
            <Link to="../../category">{contentNested}</Link>
          ) : (
            <React.Fragment key={key || idS}>{contentNested}</React.Fragment>
          )}
        </React.Fragment>
      );
    });
  }
}

export default function ContainerGeneratorWithCx(props) {
  return (
    <Consumer>
      {context => (
        <ContainerGenerator
          data={props.data}
          type={props.type}
          context={context}
          special={props.special}
          animate={props.animate}
          importance={props.importance}
        />
      )}
    </Consumer>
  );
}
