export default function handleAlbumRightOverride(e) {
  window.scrollY = 0;
  let albumType = e.target.dataset.identi;
  // console.log("HANDLING ALBUM OVERRIDE", albumType, e.target.dataset);
  let that = this;
  // console.log(this.albumRef);
  // that.refs.albumRef.scrollTop = 0;
  let renderOption = albumType === "album" ? true : false;
  return new Promise(resolve => {
    return that.setState(
      {
        mainRightView: "Album",
        albumViewOption: renderOption,
        currGrad:
          "linear-gradient(to right bottom, #000000, #000000,  #202020, #282828, #282828)",
        mobile: false
      },
      resolve(makeAPIcall(), console.log(that.state))
    );
  });
  function makeAPIcall() {
    if (!albumType) {
      that.playerRequest("getPlaylistTracks", {
        uri: e.target.dataset.album
      });
      that.playerRequest("getPlaylistCover", { uri: e.target.dataset.album });
      that.playerRequest("getPlaylist", { uri: e.target.dataset.album });
    } else if (albumType === "album") {
      that.playerRequest("getAlbum", { uri: e.target.dataset.album });
    }
  }
}
