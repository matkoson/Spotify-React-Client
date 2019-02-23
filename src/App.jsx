import React, { Component, Suspense, lazy } from "react";
import { Router, navigate } from "@reach/router";
import RightTab from "./Components/RightTab/RightTab";
import PlayerBar from "./Components/PlayerBar/PlayerBar";
import cdnLoader from "./loadScript";
import {
  setToken,
  getToken,
  getFtrdPlay,
  getRecent,
  getTopArtist,
  playerRequest,
  getContentFromMultiArtists
} from "./APIconnection/APImethods";
import { Provider } from "./Context/Context";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlay,
  faPause,
  faStepForward,
  faStepBackward,
  faRandom,
  faTablet,
  faVolumeUp,
  faVolumeMute,
  faRedo,
  faSearch,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import initSDK from "./APIconnection/initSDK";
import HomeScreen from "./Components/HomeScreen/HomeScreen";
library.add(
  faPlay,
  faPause,
  faStepForward,
  faStepBackward,
  faRandom,
  faTablet,
  faVolumeUp,
  faVolumeMute,
  faRedo,
  faSearch,
  faReact,
  faSpinner
);
import("./Styles/Components/left-tab.scss");
import("./Styles/Base/app.scss");
const Desktop =
  window.innerView > 820
    ? import("./Components/Desktop/Desktop")
    : lazy(() => import("./Components/Desktop/Desktop"));
const Mobile =
  window.innerView > 820
    ? import("./Components/Mobile/Mobile")
    : lazy(() => import("./Components/Mobile/Mobile"));
const Charts = lazy(() => import("./Components/Charts/Charts"));
const Album = lazy(() => import("./Components/Album/Album"));
const Library = lazy(() => import("./Components/Library/Library"));
const Genres = lazy(() => import("./Components/Genres/Genres"));
const NewReleases = lazy(() => import("./Components/NewReleases/NewReleases"));
const Discover = lazy(() => import("./Components/Discover/Discover"));
const Search = lazy(() => import("./Components/Search/Search"));
const CatInnerView = lazy(() =>
  import("./Components/CatInnerView/CatInnerView")
);
const RecentlyPlayed = lazy(() =>
  import("./Components/RecentlyPlayed/RecentlyPlayed")
);
export default class App extends Component {
  constructor(props) {
    super(props);
    this.clientID = "25be93ebc6a047cfbf6ed82187d766b4";
    this.initSDK = initSDK.bind(this);
    this.setToken = setToken.bind(this);
    this.getToken = getToken.bind(this);
    this.getRecent = getRecent.bind(this);
    this.getFtrdPlay = getFtrdPlay.bind(this);
    this.getTopArtist = getTopArtist.bind(this);
    this.getMinsSecs = this.getMinsSecs.bind(this);
    this.playerRequest = playerRequest.bind(this);
    this.getContentFromMultiArtists = getContentFromMultiArtists.bind(this);
    this.gradientArr = [
      "linear-gradient(105deg, rgba(67,13,107,1) 25%, #282828 56%);",
      "linear-gradient(105deg, rgba(13,28,107,1) 25%, #282828 56%)",
      "linear-gradient(105deg, rgba(13,82,107,1) 25%, #282828 56%)",
      "linear-gradient(105deg, rgba(124,113,10,1) 25%, #282828 56%)",
      "linear-gradient(105deg, rgba(102,37,37,1) 25%, #282828 56%)",
      "linear-gradient(105deg, rgba(127,22,7,1) 25%, #282828 56%)",
      " linear-gradient(105deg, rgba(52,54,81,1) 25%, #282828 56%)",
      "linear-gradient(105deg, rgba(81,52,79,1) 25%, #282828 56%)",
      "linear-gradient(105deg, rgba(107,13,20,1) 25%, #282828 56%)"
    ];
    this.state = {
      alreadyViewed: [],
      mobile: false,
      mainRightView: "Home",
      searchQuery: "",
      rightTabView: "",
      auth: "",
      recentlyPlayed: "",
      featured: "",
      topRelatedArtists: "",
      topArtist: "",
      getAlbum: "",
      getUserPlaylists: "",
      getUserSavedAlbums: "",
      getUserSavedTracks: "",
      audio: "",
      tokenSDK: "",
      playerState: "",
      shuffle: false,
      albumViewOption: "",
      deviceName: "",
      deviceTabOn: false,
      getCategories: "",
      getCategory: "",
      getCategoryPlaylists: [],
      getMultipleArtistAlbums: [],
      getPlaylist: "",
      getPlaylistTracks: "",
      getPlaylistCover: "",
      PolandTop: "",
      currGrad: "linear-gradient(105deg, rgba(112,45,58,1) 25%, #282828 56%)",
      valueContext: {
        playerState: "",
        APIrequest: this.playerRequest,
        currentlyPlaying: "",
        getMinsSecs: this.getMinsSecs
      }
    };
    this.homeRef = React.createRef();
  }
  async componentDidMount() {
    const handleNavClick = await import("./AppMethods/lazyHandleNavClick").then(
      res => res.default.bind(this)
    );
    const handleMainRightChange = await import("./AppMethods/lazyHandleMainRightChange").then(
      res => res.default.bind(this)
    );
    const handleAlbumRightOverride = await import("./AppMethods/lazyHandleAlbumRightOverride").then(
      res => res.default.bind(this)
    );
    const handleMainRightViewChange = await import("./AppMethods/lazyHandleMainRightViewChange").then(
      res => res.default.bind(this)
    );
    const countryCodes = await import("./assets/countries").then(res =>
      res.default()
    );
    const handleDeviceTabClick = await import("./AppMethods/lazyHandleDeviceTabClick").then(
      res => res.default.bind(this)
    );
    const handleResize = await import("./AppMethods/lazyHandleResize").then(
      res => res.default.bind(this)
    );
    const handleMobileNavToggle = await import("./AppMethods/lazyHandleMobileNavToggle").then(
      res => res.default.bind(this)
    );
    console.log(countryCodes);
    this.setState({
      handleNavClick,
      countryCodes,
      handleDeviceTabClick,
      handleResize,
      handleMobileNavToggle,
      handleMainRightChange,
      valueContext: {
        ...this.state.valueContext,
        handleAlbumRightOverride,
        handleMainRightViewChange
      }
    });
    import("./fontBundle");
    if (this.state.mainRightView === "Home" && this.homeRef.current)
      this.homeRef.current.scrollIntoView();
    window.addEventListener("resize", this.state.handleResize);
    //Initiate Spotify SDK Player through cdn script
    cdnLoader({
      src: "https://sdk.scdn.co/spotify-player.js",
      id: "SDK",
      callback: () => {
        this.setState({ SDKloaded: true });
        return (window.onSpotifyWebPlaybackSDKReady = () => {
          this.initSDK(this.state.tokenSDK);
        });
      }
    });
    const currAd = window.location.href;
    if (/callback/.test(currAd)) {
      this.setToken(currAd);
      navigate("home");
      if (this.state.SDK) {
        return this.checkSDK();
      } else {
        return;
      }
    } else if (/access_denied/.test(currAd)) {
      console.error("Access denied by the user");
    }
    //
    if (!this.state.auth) {
      this.getToken();
    }
  }
  componentDidUpdate() {
    if (this.state.auth) {
      if (!this.state.recentlyPlayed) this.getRecent();
      if (!this.state.featured) this.getFtrdPlay();
      if (!this.state.topRelatedArtists) this.getTopArtist();
    }
  }
  getMinsSecs = (ms = 0) => {
    ms = (ms - (ms % 1000)) / 1000;
    return {
      min: String(
        Math.floor(ms / 60) < 10
          ? `0${Math.floor(ms / 60)}`
          : Math.floor(ms / 60)
      ),
      sec: String(ms % 60 < 10 ? `0${ms % 60}` : ms % 60)
    };
  };

  render() {
    return (
      <main
        path="/"
        ref={this.homeRef}
        className="app"
        style={{
          backgroundImage: this.state.currGrad,
          transitionDuration: "1.5s"
        }}
        onClick={() =>
          this.state.deviceTabOn || this.state.mobile
            ? this.setState({ deviceTabOn: false, mobile: false })
            : null
        }
        //click anywhere in the app to make deviceTab disappear + same thing with mobile-nav
      >
        <Provider value={this.state.valueContext}>
          <Suspense
            fallback={
              <FontAwesomeIcon
                spin
                icon="spinner"
                style={{
                  position: "absolute",
                  top: `calc(50% - 100px)`,
                  left: `calc(50% - 100px)`,
                  height: "200px",
                  width: "200px"
                }}
              />
            }
          >
            <div path="/*" className="left-tab">
              {window.innerWidth <= 820 && (
                <Mobile
                  path="/*"
                  handleMainRightChange={this.state.handleMainRightChange}
                  handleMobileNavToggle={this.state.handleMobileNavToggle}
                  mobile={this.state.mobile}
                />
              )}
              {window.innerWidth > 820 && (
                <Desktop
                  path="/*"
                  handleNavClick={this.state.handleNavClick}
                  handleMainRightChange={this.state.handleMainRightChange}
                >
                  <RecentlyPlayed
                    path="/*"
                    handleNavClick={this.state.handleNavClick}
                    rawRecPlayed={this.state.recentlyPlayed}
                    player={this.player}
                    APIrequest={this.playerRequest}
                  />
                </Desktop>
              )}
            </div>
            <Router primary={false}>
              <RightTab
                path="home"
                mobile={this.state.mobile}
                handleNavClick={this.state.handleNavClick}
                className="right-tab"
              >
                <HomeScreen
                  path="/"
                  featured={this.state.featured}
                  recent={this.state.recentlyPlayed}
                  relatedTop={this.state.topRelatedArtists}
                  topArtist={this.state.topArtist}
                  player={this.player}
                />
                <Charts
                  path="charts"
                  getCategories={this.state.getCategories}
                  getCategoryPlaylists={this.state.getCategoryPlaylists}
                  PolandTop={this.state.PolandTop}
                  countryCodes={this.state.countryCodes}
                />
                <Genres
                  path="genres-moods"
                  getCategories={this.state.getCategories}
                  //
                />
                <NewReleases
                  path="new-releases"
                  getNewReleases={this.state.getNewReleases}
                />
                <Discover
                  path="discover"
                  getMultipleArtistAlbums={this.state.getMultipleArtistAlbums}
                  idList={
                    this.state.topRelatedArtists &&
                    this.state.topRelatedArtists.map(e => e.id)
                  }
                />
              </RightTab>
              <Search
                path="search"
                searchQuery={this.state.searchQuery}
                player={this.player}
              />
              <Library
                path="library"
                getUserPlaylists={this.state.getUserPlaylists}
                getUserSavedAlbums={this.state.getUserSavedAlbums}
                getUserSavedTracks={this.state.getUserSavedTracks}
              />
              <Album
                path="album"
                ref={this.albumRef}
                getAlbum={this.state.getAlbum}
                getPlaylist={this.state.getPlaylist}
                getPlaylistCover={this.state.getPlaylistCover}
                getPlaylistTracks={this.state.getPlaylistTracks}
                albumViewOption={this.state.albumViewOption}
              />
              <CatInnerView
                path="category"
                PolandTop={this.state.PolandTop}
                getCategory={this.state.getCategory}
                getCategoryPlaylists={this.state.getCategoryPlaylists}
              />
            </Router>
            <PlayerBar
              path="/*"
              recent={
                this.state.recentlyPlayed && this.state.recentlyPlayed.items[0]
              }
              handleDeviceTabClick={this.state.handleDeviceTabClick}
              isDeviceTabOn={this.state.deviceTabOn}
              player={this.player}
              deviceId={this.state.deviceID}
              deviceName={this.state.deviceName}
              currentPlayback={this.state.currentPlayback}
            />
          </Suspense>
        </Provider>
      </main>
    );
  }
}
