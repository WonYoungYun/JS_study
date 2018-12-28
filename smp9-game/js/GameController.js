import Monster from "./Models/Monster.js";
import Hero from "./Models/Hero.js";

let counter = 0;
let userName;

const user = document.getElementById("user");
const input = user.querySelector("input");
const button = user.querySelector("button");

const gamePlay = document.getElementById("game_play");
const battleMenu = document.getElementById("battle_menu");

const gameMenu = document.getElementById("game_menu");
const start = gameMenu.querySelector(".start_button");
const continueMenu = document.getElementById("continue_menu");
const countMessage = continueMenu.querySelector(".count_message");
const restart = continueMenu.querySelector(".restart_button");

const action = document.getElementById("hero_action");

const heroStatus = document.getElementById("hero");
const monsterStatus = document.getElementById("monster");

const message = document.getElementById("message");
export default {
  init() {
    this.gameSetup();
  },

  gameSetup() {
    button.addEventListener("click", e => {
      e.preventDefault();
      userName = input.value;
      input.value ? this.setUserName(userName) : alert("이름을 입력해주세요.");
    });
  },
  setUserName(value) {
    Hero.setup(value);
    user.style.display = "none";
    setTimeout(() => {
      this.setStart();
    }, 500);
  },
  setStart() {
    gameMenu.style.display = "flex";
    start.addEventListener("click", e => {
      gameMenu.style.display = "none";
      setTimeout(() => {
        this.gameStart();
      }, 500);
    });
  },
  gameStart() {
    this.summonMonster();
    gamePlay.style.display = "flex";
    setTimeout(() => {
      battleMenu.style.display = "block";
    }, 500);
    this.onBattle();
  },
  onBattle() {
    this.onClickButton();
  },
  onClickButton() {
    Array.from(action.getElementsByTagName("li")).forEach(li => {
      li.addEventListener("click", e => {
        this.attack(e.target.className);
      });
    });
  },
  attack(number) {
    const win = Math.abs(number - Monster.Action);
    const monsterAction = Monster.doAction(Monster.Action);
    battleMenu.style.display = "none";
    setTimeout(() => {
      this.setMessage(`적은 ${monsterAction}을(를) 했다!`);
      setTimeout(() => {
        if (win === 0) {
          console.log("비김");
          Monster.damagedAttack(Hero.Att);
          Hero.damagedAttack(Monster.Att);
          this.setMessage(`서로에게 데미지를 입혔다!`);
        } else if (win === 1) {
          Monster.damagedAttack(Hero.Att);
          this.setMessage(`공격성공! ${Hero.Att}의 데미지를 입혔다!`);
          console.log("이김");
        } else if (win === 2) {
          Hero.damagedAttack(Monster.Att);
          this.setMessage(`공격실패.. ${Monster.Att}의 데미지를 입었다..`);
          console.log("짐");
        }
        setTimeout(() => {
          battleMenu.style.display = "block";
        }, 500);

        this.renderGame();

        if (Hero.Hp <= 0) {
          console.log("사망");
          countMessage.innerHTML = `당신이 잡은 몬스터의 수: ${counter}`;
          setTimeout(() => {
            gamePlay.style.display = "none";
            battleMenu.style.display = "none";
            continueMenu.style.display = "flex";
          }, 1000);
          restart.addEventListener("click", () => {
            continueMenu.style.display = "none";
            counter = 0;
            setTimeout(() => {
              Hero.setup(userName);
              this.summonMonster();
              gamePlay.style.display = "flex";
              battleMenu.style.display = "block";
            }, 500);
          });
        } else if (Monster.Hp <= 0) {
          counter++;
          Hero.win();
          this.setMessage(`${Monster.name}을(를) 잡았다!`);
          console.log("몬스터잡읍");
          monsterStatus.innerHTML = ``;
          setTimeout(() => {
            this.summonMonster();
          }, 1000);
        }
      }, 500);
    }, 500);
  },
  summonMonster() {
    Monster.setup();
    this.renderGame();
    this.setMessage(`${Monster.name} 이(가) 나타났다!`);
  },
  renderGame() {
    this.setHero();
    this.setMonster();
  },
  setHero() {
    heroStatus.innerHTML = `ID: ${Hero.name}  Hp: ${Hero.Hp}/${
      Hero.maxHp
    }  Att: ${Hero.Att}`;
  },
  setMonster() {
    monsterStatus.innerHTML = `${Monster.name}  Hp: ${Monster.Hp}  Att: ${
      Monster.Att
    }`;
  },

  setMessage(msg) {
    message.innerHTML = msg;
  }
};
