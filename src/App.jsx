import React, { Component } from "react";
import "./Styles/Styles.scss";
import LeftTab from "./Components/LeftTab/LeftTab";
import RightTab from "./Components/RightTab/RightTab";
import "./assets/fonts/Rubik-Light.woff";
import RecentlyPlayed from "./Components/RecentlyPlayed/RecentlyPlayed";
import HomeScreen from "./Components/HomeScreen/HomeScreen";
import PlayerBar from "./Components/PlayerBar/PlayerBar";
import Charts from "./Components/Charts/Charts";
import Genres from "./Components/Genres/Genres";
import NewReleases from "./Components/NewReleases/NewReleases";
import Discover from "./Components/Discover/Discover";
import Search from "./Components/Search/Search";
import Library from "./Components/Library/Library";
import Album from "./Components/Album/Album";
import CatInnerView from "./Components/CatInnerView/CatInnerView";
// import "./globalStyles.scss";
import cdnLoader from "./loadScript";
import initSDK from "./APIconnection/initSDK";
import { countryCodes } from "./assets/countries";
import {
  makeApropriateFetch,
  handleNavClick,
  handleDeviceTabClick,
  handleResize,
  gradientCarousel,
  handleMainRightViewChange,
  handleMainRightChange,
  handleAlbumRightOverride
} from "./AppMethods/AppMethods";
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

class App extends Component {
  constructor(props) {
    super(props);
    //
    //
    //
    this.clientID = "25be93ebc6a047cfbf6ed82187d766b4";
    this.initSDK = initSDK.bind(this);
    this.setToken = setToken.bind(this);
    this.getToken = getToken.bind(this);
    this.getRecent = getRecent.bind(this);
    this.getFtrdPlay = getFtrdPlay.bind(this);
    this.getTopArtist = getTopArtist.bind(this);
    this.handleResize = handleResize.bind(this);
    this.getMinsSecs = this.getMinsSecs.bind(this);
    this.playerRequest = playerRequest.bind(this);
    this.handleNavClick = handleNavClick.bind(this);
    this.gradientCarousel = gradientCarousel.bind(this);
    this.handleAlbumRightOverride = handleAlbumRightOverride.bind(this);
    this.handleMainRightChange = handleMainRightChange.bind(this);
    this.makeApropriateFetch = makeApropriateFetch.bind(this);
    this.handleDeviceTabClick = handleDeviceTabClick.bind(this);
    this.getContentFromMultiArtists = getContentFromMultiArtists.bind(this);
    this.handleMainRightViewChange = handleMainRightViewChange.bind(this);
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
    this.countryCodes = countryCodes;
    this.state = {
      alreadyViewed: [],
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
        handleAlbumRightOverride: this.handleAlbumRightOverride,
        currentlyPlaying: "",
        getMinsSecs: this.getMinsSecs,
        handleMainRightViewChange: this.handleMainRightViewChange
      }
    };
    this.homeRef = React.createRef();
  }
  componentDidMount() {
    if (this.state.mainRightView === "Home")
      this.homeRef.current.scrollIntoView();
    // this.gradientCarousel();
    window.addEventListener("resize", this.handleResize);
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
    //
    //
    const currAd = window.location.href;
    if (/callback/.test(currAd)) {
      this.setToken(currAd);
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
    // console.log(ms);
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
    let rightTabView;
    let rightOverride;
    switch (this.state.rightTabView) {
      case "Charts":
        rightTabView = (
          <Charts //refactored
            getCategories={this.state.getCategories}
            getCategoryPlaylists={this.state.getCategoryPlaylists}
            PolandTop={this.state.PolandTop}
            //
            handleAlbumRightOverride={this.handleAlbumRightOverride}
          />
        );
        break;
      case "Genres":
        rightTabView = (
          <Genres //refactored
            makeApropriateFetch={this.makeApropriateFetch}
            getCategories={this.state.getCategories}
            //
          />
        );
        break;
      case "New Releases":
        rightTabView = (
          <NewReleases //refactored
            getNewReleases={this.state.getNewReleases}
            PolandTop={this.state.PolandTop}
            getCategory={this.state.getCategory}
            //
            playerState={this.state.playerState}
            APIrequest={this.playerRequest}
            currentlyPlaying={this.state.currentlyPlaying}
            handleAlbumRightOverride={this.handleAlbumRightOverride}
          />
        );
        break;
      case "Discover":
        rightTabView = (
          <Discover //refactored
            getMultipleArtistAlbums={this.state.getMultipleArtistAlbums}
            //
          />
        );
        break;
      default:
        rightTabView = (
          <HomeScreen //refactored
            featured={this.state.featured}
            recent={this.state.recentlyPlayed}
            relatedTop={this.state.topRelatedArtists}
            topArtist={this.state.topArtist}
            player={this.player}
            //
          />
        );
    }

    switch (this.state.mainRightView) {
      case "Search":
        rightOverride = (
          <Search
            searchQuery={this.state.searchQuery}
            //
          />
        );

        break;
      case "Library":
        rightOverride = (
          <Library //refactored
            getUserPlaylists={this.state.getUserPlaylists}
            getUserSavedAlbums={this.state.getUserSavedAlbums}
            getUserSavedTracks={this.state.getUserSavedTracks}
            //
          />
        );
        break;
      case "Album":
        rightOverride = (
          <Album
            ref={this.albumRef}
            getAlbum={this.state.getAlbum}
            getPlaylist={this.state.getPlaylist}
            getPlaylistCover={this.state.getPlaylistCover}
            getPlaylistTracks={this.state.getPlaylistTracks}
            albumViewOption={this.state.albumViewOption}
            //
            // APIrequest={this.playerRequest}
            // playerState={this.state.playerState}
          />
        );
        break;
      default:
        rightOverride = (
          <CatInnerView
            PolandTop={this.state.PolandTop}
            getCategory={this.state.getCategory}
            getCategoryPlaylists={this.state.getCategoryPlaylists}
            //
            currentlyPlaying={this.state.currentlyPlaying}
            playerState={this.state.playerState}
            APIrequest={this.playerRequest}
          />
        );
    }
    // console.log(rightOverride, "OVERRIDE");
    return (
      <main
        ref={this.homeRef}
        className="app"
        style={{
          backgroundImage: this.state.currGrad,
          transitionDuration: "1.5s"
        }}
        onClick={() =>
          this.state.deviceTabOn ? this.setState({ deviceTabOn: false }) : null
        }
        //click anywhere in the app to make deviceTab disappear
      >
        <Provider value={this.state.valueContext}>
          <div className="mobile" style={{ cursor: "pointer" }}>
            <i class="fab fa-react mobile__logo" />
          </div>
          <LeftTab
            handleNavClick={this.handleNavClick}
            handleMainRightChange={this.handleMainRightChange}
          >
            <RecentlyPlayed
              handleNavClick={this.handleNavClick}
              rawRecPlayed={this.state.recentlyPlayed}
              player={this.player}
              //
              APIrequest={this.playerRequest}
            />
          </LeftTab>
          {this.state.mainRightView === "Home" ? (
            <RightTab handleNavClick={this.handleNavClick}>
              {rightTabView}
            </RightTab>
          ) : (
            <React.Fragment> {rightOverride}</React.Fragment>
          )}
          <PlayerBar //refactored
            recent={
              this.state.recentlyPlayed && this.state.recentlyPlayed.items[0]
            }
            handleDeviceTabClick={this.handleDeviceTabClick}
            isDeviceTabOn={this.state.deviceTabOn}
            player={this.player}
            deviceId={this.state.deviceID}
            deviceName={this.state.deviceName}
            currentPlayback={this.state.currentPlayback}
            // + context
          />
        </Provider>
      </main>
    );
  }
}

export default App;
