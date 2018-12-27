import Game from "./Game.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("start-screen").onsubmit = e => {
    const name = document.getElementById("name-input").value;
    e.preventDefault();
    if (name && name.trim() && confirm(name + "으로 하시겠습니까?")) {
      Game.getInstance(name)
        .showXp()
        .toggleMenu();
    } else {
      alert("이름을 입력해주세요.");
    }
  };
  document.getElementById("game-menu").onsubmit = e => {
    const gameInput = document.getElementById("menu-input");
    const gameOption = gameInput.value;

    e.preventDefault();
    gameInput.value = "";
    Game.getInstance().menuInput(gameOption);
  };
  document.getElementById("battle-menu").onsubmit = e => {
    const battleInput = document.getElementById("battle-input");
    const battleOption = battleInput.value;
    e.preventDefault();
    battleInput.value = "";
    Game.getInstance().battleInput(battleOption);
  };
});
