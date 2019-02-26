import Observer from "fontfaceobserver";

const anodinaLight = new Observer("Anodina-Light");
anodinaLight.load().then(() => {
  console.log("anodina ready");
  document.documentElement.classList.add("anodina-ready");
  console.log(document.documentElement.classList);
});

const anodinaExtraLight = new Observer("Anodina-ExtraLight");
anodinaExtraLight.load().then(() => {
  console.log("anodinaX ready");
  document.documentElement.classList.add("anodinaX-ready");
  console.log(document.documentElement.classList);
});

const SpaceGroteskB = new Observer("SpaceGrotesk-Bold");
SpaceGroteskB.load().then(() => {
  console.log("grotesk ready");
  document.documentElement.classList.add("SpaceGroteskB-ready");
  console.log(document.documentElement.classList);
});
