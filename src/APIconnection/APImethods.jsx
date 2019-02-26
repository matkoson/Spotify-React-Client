export const setToken = function(currAd) {
  const regexToken = /access_token=(.*)&token/g;
  const token = regexToken.exec(currAd)[1];
  return this.setState({
    auth: `Bearer ${token}`,
    tokenSDK: token
  });
};
export const getToken = function() {
  const scopes =
    "playlist-read-private playlist-modify-private playlist-modify-public playlist-read-collaborative user-modify-playback-state user-read-currently-playing user-read-playback-state user-top-read user-read-recently-played app-remote-control streaming user-read-birthdate user-read-email user-read-private user-follow-read user-follow-modify user-library-modify user-library-read";
  const currentLocation = window.location.href;
  const regex = RegExp(/^(https?.+(\d+|\.\D+))\//g);
  const accessReq = `https:accounts.spotify.com/authorize?client_id=${
    this.clientID
  }&scope=${encodeURIComponent(scopes)}&response_type=token&redirect_uri=${
    regex.exec(currentLocation)[1]
  }/callback`;
  console.log(accessReq);
  window.location.href = accessReq;
  // http://localhost:3000
};
// export function getToken() {
//   window.location.href =
//     "https://accounts.spotify.com/authorize?client_id=25be93ebc6a047cfbf6ed82187d766b4&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=https://react-spotify-client.firebaseapp.com/";
// }

// export function getToken() {
// window.location.href =
//   "https://accounts.spotify.com/authorize?client_id=25be93ebc6a047cfbf6ed82187d766b4&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=https://matkoson.github.io/React-Spotify-Client/";
// window.location.href =
//   "https://accounts.spotify.com/authorize?client_id=25be93ebc6a047cfbf6ed82187d766b4&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=https://react-spotify-client.firebaseapp.com/";

// window.location.href =
//   "https://accounts.spotify.com/authorize?client_id=25be93ebc6a047cfbf6ed82187d766b4&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:4000/callback";
// }

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
    .catch(e => console.error(e));
}
export const getRecent = function() {
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
};
export const getTopArtist = function() {
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
};
export const getContentFromMultiArtists = function(multiArtists) {
  // console.log("in again", multiArtists);
  // , multiArtists.map(e => e.id));
  multiArtists.artists
    .map(e => e.id)
    .forEach(e => this.playerRequest("getMultipleArtistAlbums", { id: e }));
};

export const playerRequest = function(type, additional) {
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
    getNewReleases: {
      uri: "https://api.spotify.com/v1/browse/new-releases",
      type: "GET"
    },
    getCategories: {
      uri: `https://api.spotify.com/v1/browse/categories`,
      type: "GET"
    },
    getCategory: {
      uri: `https://api.spotify.com/v1/browse/categories/${additional &&
        additional.category}?country=${additional && additional.country}`,
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
    getUserPlaylists: {
      uri: `https://api.spotify.com/v1/me/playlists`,
      type: "GET"
    },
    getUserSavedAlbums: {
      uri: `https://api.spotify.com/v1/me/albums`,
      type: "GET"
    },
    getUserSavedTracks: {
      uri: `https://api.spotify.com/v1/me/tracks`,
      type: "GET"
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
    getAlbum: {
      uri: `https://api.spotify.com/v1/albums/${additional && additional.uri}`,
      type: "GET"
    },
    getPlaylist: {
      uri: `https://api.spotify.com/v1/playlists/${additional &&
        additional.uri}`,
      type: "GET"
    },
    getPlaylistTracks: {
      uri: `https://api.spotify.com/v1/playlists/${additional &&
        additional.uri}/tracks`,
      type: "GET"
    },
    getPlaylistCover: {
      uri: `https://api.spotify.com/v1/playlists/${additional &&
        additional.uri}/images`,
      type: "GET"
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
    },
    getMultipleArtists: {
      uri: `https://api.spotify.com/v1/artists?ids=${additional &&
        additional.ids}`,
      type: "GET"
    },
    getMultipleArtistAlbums: {
      uri: `https://api.spotify.com/v1/artists/${additional &&
        additional.id}/albums`,
      type: "GET"
    },
    searchQuery: {
      uri: `https://api.spotify.com/v1/search?q=${additional &&
        encodeURIComponent(additional.query)}&type=album,artist,playlist,track`,
      type: "GET"
    }
  };
  //
  //
  //
  const chosen = types[type];
  // console.log("chosen", chosen, type, additional);
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
  // console.log(request, chosen.uri);
  return fetch(chosen.uri, request)
    .then(res => {
      // console.log("first", res.body);
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
          // console.log("RESP", type);
          if (type === "getCategoryPlaylists") {
            if (!res.error) {
              // console.log("WARNING resPlaylist", res, this.state[type]);
              if (res.playlists.href.includes("country=PL"))
                return this.setState({ PolandTop: res });
              // console.log("WARNING resPlaylist", res, this.state[type]);
              return this.setState({ [type]: [...this.state[type], res] });
            }
          } else if (type === "getMultipleArtists") {
            // console.log("in");
            this.getContentFromMultiArtists(res);
          } else if (type === "getMultipleArtistAlbums") {
            this.setState(state => {
              return {
                getMultipleArtistAlbums: [...state.getMultipleArtistAlbums, res]
              };
            });
          } else if (type === "currentlyPlaying") {
            this.setState({
              valueContext: {
                ...this.state.valueContext,
                currentlyPlaying: res
              }
            });
          } else {
            // console.log(res);
            if (!res.error) return this.setState({ [type]: res });
          }
        })
        .catch(err => err.reason);
    })
    .catch(err => console.error(err));
};

// fetch("https://api.spotify.com/v1/browse/featured-playlists", {
//   headers: { Authorization: this.state.auth },
//   method: "GET"
// });
