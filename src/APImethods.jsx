export function setToken(currAd) {
  const regexToken = /access_token=(.*)&token/g;
  const token = regexToken.exec(currAd)[1];
  return this.setState({
    auth: {
      Authorization: `Bearer ${token}`
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
  fetch("https://api.spotify.com/v1/browse/featured-playlists", {
    headers: this.state.auth,
    method: "GET"
  })
    .then(res => res.json())
    .then(res => this.setState({ featured: res }));
}
export function getRecent() {
  fetch("https://api.spotify.com/v1/me/player/recently-played", {
    headers: this.state.auth,
    method: "GET"
  })
    .then(res => res.json())
    .then(res => {
      this.setState({
        recentlyPlayed: res,
        lastPlayed: res.items[0].track
      });
    });
}
export function getTopArtist() {
  // let name,topID,genres
  return fetch("https://api.spotify.com/v1/me/top/artists", {
    headers: this.state.auth,
    method: "GET"
  })
    .then(res => res.json())
    .then(res => {
      var { id, name } = res.items[0];
      return fetch(`https://api.spotify.com/v1/artists/${id}/related-artists`, {
        headers: this.state.auth,
        method: "GET"
      })
        .then(res => res.json())
        .then(res =>
          this.setState({
            topRelatedArtists: res.artists.slice(0, 6),
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
      type: "GET"
    },
    currentlyPlaying: {
      uri: "https://api.spotify.com/v1/me/player/currently-playing",
      type: "GET"
    },
    setPosition: {
      uri: `https://api.spotify.com/v1/me/player/seek?position_ms=${additional &&
        additional.ms}`,
      type: "PUT"
    },
    nextTrack: {
      uri: "https://api.spotify.com/v1/me/player/next",
      type: "POST"
    },
    previousTrack: {
      uri: "https://api.spotify.com/v1/me/player/previous",
      type: "POST"
    },
    setVolume: {
      uri: "https://api.spotify.com/v1/me/player/volume",
      type: "PUT"
    },
    playPlayback: {
      uri: "https://api.spotify.com/v1/me/player/play",
      type: "PUT"
    },
    pausePlayback: {
      uri: "https://api.spotify.com/v1/me/player/pause",
      type: "PUT"
    },
    setRepeat: {
      uri: "https://api.spotify.com/v1/me/player/repeat",
      type: "PUT"
    },
    getDevices: {
      uri: "https://api.spotify.com/v1/me/player/devices",
      type: "GET"
    },
    transferPlayback: {
      uri: "https://api.spotify.com/v1/me/player",
      type: "PUT"
    },
    toggleShuffle: {
      uri: "https://api.spotify.com/v1/me/player/shuffle",
      type: "PUT"
    }
  };
  //
  //
  //
  const chosen = types[type];
  console.log("player sent", chosen, "uri", chosen.uri);
  return fetch(chosen.uri, { headers: this.state.auth, method: [chosen.type] })
    .then(res => res.json())
    .then(res => this.setState({ [type]: res }))
    .catch(err => console.log(err));
}
