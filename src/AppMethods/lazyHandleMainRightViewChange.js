export default function handleMainRightViewChange(e) {
  const category = e.currentTarget.dataset.category_type;
  this.playerRequest("getCategoryPlaylists", { category, country: "PL" });
  this.playerRequest("getCategory", { category, country: "PL" });
  this.setState({
    mainRightView: category,
    currGrad:
      "linear-gradient(to right bottom, #000000, #000000,  #202020, #282828, #282828)"
  });
}
