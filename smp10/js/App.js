import Clock from "./Clock.js";

document.addEventListener("DOMContentLoaded", () => {
  Clock.init(document.getElementById("canvas"));
  Clock.render();
});
