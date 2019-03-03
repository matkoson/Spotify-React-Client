export default function playlistDataDeclaration(e, data, type) {
  let name,
    image,
    key,
    dataType,
    cx,
    cx_pos,
    recentTracks,
    recentTracksPos,
    id,
    idS,
    albumType = "",
    albumTrack,
    artistName,
    hash = {};

  name = e.name;
  key = e.id;
  if (hash[key]) {
    console.log("CORRUPTED DATA", data);
    console.log(name, key);
    return null;
  }
  hash[key] = true;
  if ((e.images && e.images[0]) || e.icons || e.album) {
    if (e.icons) {
      image = e.icons[0].url;
    } else if (type === "playlists") {
      if (e.album) {
        image = e.album.images[0].url;
      } else {
        if (window.innerWidth < 820 && e.images && e.images[1]) {
          image = e.images[1].url;
        } else {
          image = e.images && e.images[0].url;
        }
      }
    }
  }
  dataType = e.type === "artist" ? e.type : type;
  cx = e.uri;
  idS = e.id;
  if (e.type === "track") {
    cx = e.album.uri;
    cx_pos = e.track_number;
  }
  id = e.id;
  if (
    e.album_type === "single" ||
    e.album_type === "album" ||
    e.type === "track"
  ) {
    artistName = e.artists[0].name;
    if (e.album_type) albumType = e.album_type || e.track.album.album_type;
  }

  return {
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
    albumTrack,
    artistName
  };
}
