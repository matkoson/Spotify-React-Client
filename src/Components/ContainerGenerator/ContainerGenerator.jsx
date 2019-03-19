import React, { lazy, useState } from "react";
import { Consumer } from "../../Context/Context";
import { animated, useSpring, useTransition } from "react-spring";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SimpleImg, initSimpleImg } from "react-simple-img";
import recentDataDeclaration from "./lazyRecentDeclaration";
import playlistDataDeclaration from "./lazyPlaylistDeclaration";
import Animator from "./Animator";
import "../../Styles/Components/generator.scss";
import "../../Styles/Components/generatorLazy.scss";
initSimpleImg({ threshold: [0.4] });

function ContainerGenerator(props) {
  let data = props.data,
    special = props.special,
    type = props.type,
    artistName = null,
    context = props.context,
    forbidAnimate = props.forbidAnimate,
    dataDef,
    key = props.key;
  console.log(data);

  const transitions = useTransition(null, null, {
    from: { opacity: 0, transform: "translate3d(0,-40px,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0px,0)" },
    unique: true
  });

  let imgMeasurements = { width: "300px", height: "300px" };
  const cxPlay = context.currentlyPlaying;

  return transitions.map(({ props }) => (
    <animated.div
      key={key}
      className="app__fetch-container generator__playlist-container"
      style={props}
    >
      {props &&
        data &&
        data.map((e, i) => {
          if (type === "recent") {
            dataDef = recentDataDeclaration(e, data, i, type);
          } else if (type === "playlists" || type === "categories") {
            dataDef = playlistDataDeclaration(e, data, type);
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
                  cx_pos
                    ? dataType !== "track"
                      ? cx_pos
                      : recentTracksPos
                    : null
                }
                data-recent_pos={dataType === "track" ? recentTracksPos : null}
                data-data_type={dataType}
                data-testid={
                  special
                    ? "containerGeneratedAlbum"
                    : dataType === "playlists"
                    ? "containerGeneratedPlaylist"
                    : dataType === "track"
                    ? "containerGeneratedTrack"
                    : "containerGeneratedElement"
                }
                data-category_type={dataType === "categories" ? id : null}
                onClick={e => {
                  if (e.currentTarget.dataset.data_type === "categories") {
                    context.handleInnerCategoryViewChange(e);
                  }
                  if (
                    special ||
                    e.currentTarget.dataset.data_type === "artist"
                  ) {
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
                  (e.currentTarget.className =
                    "generator__playlist-element__img")
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
                      cxPlay.item &&
                      cx === cxPlay.item.uri) ||
                      (dataType === "artist" &&
                        cxPlay &&
                        cxPlay.item &&
                        cxPlay.artists &&
                        cxPlay.item.artists[0].name === e.name) ||
                      ((dataType === "playlist" || dataType === "track") &&
                        cxPlay.context &&
                        cxPlay.context.uri === cx)) ? (
                      <FontAwesomeIcon
                        icon="pause"
                        className=" app__pause-visible__icon"
                        data-testid="pause"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon="play"
                        className="app__play-hover__icon"
                        data-testid="play"
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
              <Link to="../../album">
                <div
                  data-identi={albumType}
                  data-album={idS}
                  data-testid={idS}
                  onClick={e => {
                    return context.handleAlbumRightOverride(e);
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
          const contentAnimated = (
            <Animator
            // key={key || idS}
            >
              {content}
            </Animator>
          );
          return (
            <React.Fragment key={key || idS}>
              {type === "categories" ? (
                <Link to="../../category">{contentAnimated}</Link>
              ) : (
                <React.Fragment key={key || idS}>
                  {contentAnimated}
                </React.Fragment>
              )}
            </React.Fragment>
          );
        })}
    </animated.div>
  ));
}

export default props => (
  <Consumer>
    {context => (
      <ContainerGenerator
        key={props.key}
        data={props.data}
        type={props.type}
        context={context}
        special={props.special}
        forbidAnimate={props.forbidAnimate}
        importance={props.importance}
      />
    )}
  </Consumer>
);
