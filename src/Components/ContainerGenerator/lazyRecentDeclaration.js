export default function recentDataDeclaration(e, data, i, type) {
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
    artistName;
  if (e.track) {
    albumTrack = e.track.album.id;
    albumType = "album";
    name = e.track.name;
    artistName = e.track.artists[0].name;
    image = e.track.album.images;
    image =
      window.innerWidth < 820
        ? (image[1] && image[1].url) || image[0].url
        : image && image[0].url;
    image =
      window.innerWidth < 500
        ? (e.track.album.images[2] && e.track.album.images[2].url) || image
        : image;
    key = e.played_at;
    dataType = e.track.type;
    cx = e.track.uri;
    idS = e.track.album.id;
    cx_pos = e.track.track_number;
    recentTracksPos = i;
  }
  if (!recentTracks) recentTracks = data.map(e => e.track.uri);
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
