import Observer from "fontfaceobserver";
// import "./assets/fonts/Anodina-Light.woff";

const anodina = new Observer("Anodina-Light");
anodina
  .load()
  .then(() => {
    console.log("LOADED anodina");
    document.documentElement.classList.add("anodina-ready");
  })
  .catch(err => console.error(err));

const horizonRegular = new Observer("Horizon - Regular");
horizonRegular
  .load()
  .then(() => {
    console.log("LOADED horizonRegular");
  })
  .catch(err => console.error(err));

const anodinaXLight = new Observer("Anodina-ExtraLight");
anodinaXLight
  .load()
  .then(() => console.log("LOADED anodinaXLight"))
  .catch(err => console.error(err));

const spaceGroteskSBold = new Observer("SpaceGrotesk-SemiBold");
spaceGroteskSBold
  .load()
  .then(() => console.log("LOADED spaceGroteskSBold"))
  .catch(err => console.error(err));

const spaceGroteskBold = new Observer("SpaceGrotesk-Bold");
spaceGroteskBold
  .load()
  .then(() => console.log("LOADED spaceGroteskBold"))
  .catch(err => console.error(err));
