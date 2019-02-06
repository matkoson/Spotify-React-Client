export function setToken(currAd) {
  const regexToken = /access_token=(.*)&token/g;
  const token = regexToken.exec(currAd)[1];
  return this.setState({
    auth: `Bearer ${token}`,
    tokenSDK: token
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
    headers: { Authorization: this.state.auth },
    method: "GET"
  })
    .then(res => res.json())
    .then(res => {
      if (!res.error) {
        return this.setState({ featured: res });
      }
    })
    .catch(e => console.log(e));
}
export function getRecent() {
  fetch("https://api.spotify.com/v1/me/player/recently-played", {
    headers: { Authorization: this.state.auth },
    method: "GET"
  })
    .then(res => res.json())
    .then(res => {
      if (!res.error)
        this.setState({
          recentlyPlayed: res,
          lastPlayed: res.items[0].track
        });
    })
    .catch(e => console.error(e));
}
export function getTopArtist() {
  // let name,topID,genres
  return fetch("https://api.spotify.com/v1/me/top/artists", {
    headers: { Authorization: this.state.auth },
    method: "GET"
  })
    .then(res => res.json())
    .then(res => {
      if (!res.error && res.items) {
        var { id, name } = res.items[0];
        return fetch(
          `https://api.spotify.com/v1/artists/${id}/related-artists`,
          {
            headers: { Authorization: this.state.auth },
            method: "GET"
          }
        )
          .then(res => res.json())
          .then(res => {
            if (!res.error) {
              return this.setState({
                topRelatedArtists: res.artists.slice(0, 6),
                topArtist: name
              });
            }
          })
          .catch(err => console.error(err));
      }
    })
    .catch(err => console.error(err));
}

export function playerRequest(type, additional) {
  // console.log("called with type", type);
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
    getCategories: {
      uri: `https://api.spotify.com/v1/browse/categories`,
      type: "GET"
    },
    getCategoryPlaylists: {
      uri: `https://api.spotify.com/v1/browse/categories/${additional &&
        additional.category}/playlists?country=${additional &&
        (additional.country || null)}`,
      type: "GET"
    },
    setVolume: {
      uri: `https://api.spotify.com/v1/me/player/volume?volume_percent=${additional &&
        additional.vol}`,
      type: "PUT"
    },
    playPlayback: {
      uri: `https://api.spotify.com/v1/me/player/play?device_id=${
        this.state.deviceID
      }`,
      type: "PUT"
    },
    playSpecificPlayback: {
      uri: `https://api.spotify.com/v1/me/player/play?=device_id=${
        this.state.deviceID
      }`,
      type: "PUT",
      body: {
        context_uri: additional && additional.cx,
        offset: { position: additional && (additional.cx_pos || 0) }
      }
    },
    playRecentTracks: {
      uri: `https://api.spotify.com/v1/me/player/play?device_id=${
        this.state.deviceID
      }`,
      type: "PUT",
      body: {
        uris: Array.isArray(additional && additional.cx)
          ? additional && additional.cx
          : additional && [additional.cx],
        offset: { position: (additional && additional.cx_pos) || 0 }
      }
    },
    playArtist: {
      uri: `https://api.spotify.com/v1/me/player/play?device_id=${
        this.state.deviceID
      }`,
      type: "PUT",
      body: { context_uri: additional && additional.cx }
    },
    pausePlayback: {
      uri: `https://api.spotify.com/v1/me/player/pausedevice_id=${
        this.state.deviceID
      }`,
      type: "PUT"
    },
    setRepeat: {
      uri: `https://api.spotify.com/v1/me/player/repeat?state=${additional &&
        additional.mode}`,
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
      uri: `https://api.spotify.com/v1/me/player/shuffle?state=${additional &&
        additional.shuffle}`,
      type: "PUT"
    }
  };
  //
  //
  //
  const chosen = types[type];
  console.log("chosen", chosen, type, additional);
  let request = {
    GET: {
      headers: { Authorization: this.state.auth },
      method: "GET"
    },
    PUT: {
      headers: {
        Authorization: this.state.auth
      },
      method: "PUT",
      body: JSON.stringify(chosen.body)
    }
  };
  request = request[chosen.type];
  if (type === "playSpecificPlayback" || type === "playRecentTracks")
    console.log(request, chosen.uri);
  return fetch(chosen.uri, request)
    .then(res => {
      // console.log(res.body);
      const reader = res.body.getReader();
      //refactor for handling readableStream in order to avoid JSON's 'unexpected end of input' error
      const stream = new ReadableStream({
        start(controller) {
          function push() {
            reader.read().then(({ done, value }) => {
              if (done) {
                controller.close();
                return;
              }
              controller.enqueue(value);
              push();
            });
          }
          push();
        }
      });
      new Response(stream, {
        headers: {
          "Content-Type": "application/json"
        }
      })
        .json()
        .then(res => {
          console.log(type);
          if (type === "getCategoryPlaylists") {
            if (!res.error) {
              console.log("resPlaylist", res, this.state[type]);
              if (res.playlists.href.includes("country=PL"))
                return this.setState({ PolandTop: res });
              return this.setState({ [type]: [...this.state[type], res] });
            }
          }
          if (!res.error) return this.setState({ [type]: res });
          const firstRes = res;
          // console.log("FIRST", firstRes);
          fetch(res.item.href, request)
            .then(res => {
              if (!res.error)
                return this.setState({ [type]: firstRes, audio: res.url });
            })
            .catch(err => err.reason);
        })
        .catch(err => err.reason);
    })
    .catch(err => console.log(err));
}

// fetch("https://api.spotify.com/v1/browse/featured-playlists", {
//   headers: { Authorization: this.state.auth },
//   method: "GET"
// });
