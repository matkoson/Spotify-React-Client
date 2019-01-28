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
    "playlist-read-private playlist-read-collaborative user-modify-playback-state user-top-read user-read-recently-played user-read-playback-state user-read-currently-playing user-modify-playback-state";
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
