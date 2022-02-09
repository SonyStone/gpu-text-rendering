import { webGlStart } from "./webGlStart";


function main() {
  if (window.navigator.userAgent.indexOf("Trident") >= 0 || window.navigator.userAgent.indexOf("Edge") >= 0) {
    console.log("The shader is currently very, very, very, very slow to compile on Microsoft browsers. Hold tight..");
    setTimeout(webGlStart, 200);
  } else {
    webGlStart();
  }
}

window.document.body.onload = main;