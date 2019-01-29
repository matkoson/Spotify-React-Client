import axios from "axios";

export function setToken(currAd) {
  const regexToken = /access_token=(.*)&token/g;
  const token = regexToken.exec(currAd)[1];
  return this.setState({
    auth: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });
}

export function getToken() {
  const scopes =
    "playlist-read-private playlist-modify-private playlist-modify-public playlist-read-collaborative user-modify-playback-state user-read-currently-playing user-read-playback-state user-top-read user-read-recently-played app-remote-control streaming user-read-birthdate user-read-email user-read-private user-follow-read user-follow-modify user-library-modify user-library-read";
  const accessReq = `https:accounts.spotify.com/authorize?client_id=${
    this.clientID
  }&scope=${encodeURIComponent(
    scopes
  )}&response_type=token&redirect_uri=http://localhost:3000/callback`;
  window.location.href = accessReq;
}

export function getFtrdPlay() {
  axios
    .get(
      "https://api.spotify.com/v1/browse/featured-playlists",
      this.state.auth
    )
    .then(res => this.setState({ featured: res.data }));
}
export function getRecent() {
  axios
    .get(
      "https://api.spotify.com/v1/me/player/recently-played",
      this.state.auth
    )
    .then(res =>
      this.setState({
        recentlyPlayed: res.data,
        lastPlayed: res.data.items[0].track
      })
    );
}
export function getTopArtist() {
  // let name,topID,genres
  return axios
    .get("https://api.spotify.com/v1/me/top/artists", this.state.auth)
    .then(res => {
      var { id, name } = res.data.items[0];
      return axios
        .get(
          `https://api.spotify.com/v1/artists/${id}/related-artists`,
          this.state.auth
        )
        .then(res =>
          this.setState({
            topRelatedArtists: res.data.artists.slice(0, 6),
            topArtist: name
          })
        )
        .catch(err => console.error(err));
    });
}

export function playerRequest(type, additional) {
  console.log("called with type", type);
  const types = {
    currentPlayback: {
      uri: "https://api.spotify.com/v1/me/player",
      type: "get"
    },
    currentlyPlaying: {
      uri: "https://api.spotify.com/v1/me/player/currently-playing",
      type: "get"
    },
    setPosition: {
      // uri: `https://api.spotify.com/v1/me/player/seek?position_ms=${additional &&
      //   additional.ms}`,
      uri: "https://api.spotify.com/v1/me/player/seek?position_ms=25000",
      type: "put"
    },
    skipToNext: {
      uri: "https://api.spotify.com/v1/me/player/next",
      type: "post"
    },
    setVolume: {
      uri: "https://api.spotify.com/v1/me/player/volume",
      type: "put"
    },
    previousTrack: {
      uri: "https://api.spotify.com/v1/me/player/previous",
      type: "post"
    },
    pausePlayback: {
      uri: "https://api.spotify.com/v1/me/player/pause",
      type: "put"
    },
    setRepeat: {
      uri: "https://api.spotify.com/v1/me/player/repeat",
      type: "put"
    },
    startResume: {
      uri: "https://api.spotify.com/v1/me/player/play",
      type: "put"
    },
    getDevices: {
      uri: "https://api.spotify.com/v1/me/player/devices",
      type: "get"
    },
    transferPlayback: {
      uri: "https://api.spotify.com/v1/me/player",
      type: "put"
    },
    toggleShuffle: {
      uri: "https://api.spotify.com/v1/me/player/shuffle",
      type: "put"
    }
  };
  //
  //
  //
  const chosen = types[type];
  console.log("player sent", chosen, "uri", chosen.uri);
  return axios[chosen.type](chosen.uri, this.state.auth)
    .then(res => this.setState({ [type]: res }))
    .catch(err => console.log(err.message));
}
