const tag = "[Game]";

let instance;

export default {
  initiate(heroName) {
    const hero = {
      name: heroName,
      lev: 1,
      maxHp: 100,
      hp: 100,
      xp: 0,
      att: 10
    };
    const monsters = [
      {
        name: "슬라임",
        hp: 25 + hero.lev * 3,
        att: 10 + hero.lev,
        xp: 10 + hero.lev
      },
      {
        name: "웨어울프",
        hp: 50 + hero.lev * 5,
        att: 15 + hero.lev * 2,
        xp: 20 + hero.lev * 2
      },
      {
        name: "그리폰",
        hp: 100 + hero.lev * 10,
        att: 25 + hero.lev * 5,
        xp: 50 + hero.lev * 5
      }
    ];
    let monster = null;
    let turn = true;
    return {
      showLevel() {
        document.getElementById("hero-level").innerHTML = "Lv: " + hero.lev;
        return this;
      },
      showXp() {
        const self = this;
        if (hero.xp > 15 * hero.lev) {
          hero.xp -= 15 * hero.lev;
          hero.maxHp += 10;
          hero.hp = hero.maxHp;
          hero.att += hero.lev;
          hero.lev++;
          window.setTimeout(() => {
            self.setMessage("레벨 업!");
          }, 1000);
        }
        document.getElementById("hero-xp").innerHTML =
          "XP: " + hero.xp + "/" + 15 * hero.lev;
        document.getElementById("hero-att").innerHTML = "ATT: " + hero.att;
        return self.showLevel().showHp();
      },
      showHp() {
        if (hero.hp < 0) {
          return this.gameOver();
        }
        document.getElementById("hero-hp").innerHTML =
          "HP: " + hero.hp + "/" + hero.maxHp;
        return this;
      },
      toggleMenu() {
        document.getElementById("hero-name").innerHTML = "이름: " + hero.name;
        document.getElementById("start-screen").style.display = "none";
        if (document.getElementById("game-menu").style.display === "block") {
          document.getElementById("game-menu").style.display = "none";
          document.getElementById("battle-menu").style.display = "block";
          document.getElementById("battle-input").focus();
        } else {
          document.getElementById("game-menu").style.display = "block";
          document.getElementById("battle-menu").style.display = "none";
          document.getElementById("menu-input").focus();
        }
        return this;
      },
      setMessage(msg) {
        document.getElementById("message").innerHTML = msg;
        return this;
      },
      generateMonster() {
        monster = JSON.parse(
          JSON.stringify(monsters[Math.floor(Math.random() * monsters.length)])
        );
        document.getElementById("monster-name").innerHTML = monster.name;
        document.getElementById("monster-hp").innerHTML = "HP: " + monster.hp;
        document.getElementById("monster-att").innerHTML =
          "ATT: " + monster.att;
        this.setMessage(monster.name + "이(가) 나타났다!");
        return this.toggleMenu();
      },
      menuInput(input) {
        if (input === "1") {
          return this.generateMonster();
        } else if (input === "2") {
          hero.hp = hero.maxHp;
          return this.showHp().setMessage("체력을 회복했습니다.");
        } else if (input === "3") {
          return this.exit();
        } else {
          alert("잘못된 입력입니다!");
        }
      },
      //구현필요
      battleInput(input) {
        if (input === "1") {
          return this.attackMonster();
        } else if (input === "2") {
          if (hero.hp + hero.lev * 20 < hero.maxHp) {
            hero.hp += hero.lev * 20;
          } else {
            hero.hp = hero.maxHp;
          }
          return this.showHp()
            .setMessage("체력을 회복했습니다.")
            .nextTurn();
        } else if (input === "3") {
          return this.clearMonster().setMessage("무사히 도망쳤습니다.");
        } else {
          alert("잘못된 입력");
        }
      },
      attackMonster() {
        monster.hp -= hero.att;
        document.getElementById("monster-hp").innerHTML = "HP: " + monster.hp;
        if (monster.hp > 0) {
          return this.setMessage(hero.att + "의 데미지를 입혔다!").nextTurn();
        }
        return this.win();
      },
      attackHero() {
        hero.hp -= monster.att;
        return this.showHp();
      },
      nextTurn() {
        const self = this;
        turn = !turn;
        document.getElementById("battle-button").disabled = true;
        if (!turn) {
          window.setTimeout(() => {
            self.setMessage(monster.name + "의 턴");
            window.setTimeout(() => {
              document.getElementById("battle-button").disabled = false;
              if (self.attackHero()) {
                self.setMessage(monster.att + "의 데미지!");
                window.setTimeout(() => {
                  self.setMessage(hero.name + "의 턴.");
                }, 1000);
              }
            }, 1000);
          }, 1000);
          return this.nextTurn();
        }
        return this;
      },
      win() {
        this.setMessage(
          monster.name +
            " 사냥에 성공! 경험치 " +
            monster.xp +
            "를 획득했습니다."
        );
        hero.xp += monster.xp;
        return this.clearMonster().showXp();
      },
      clearMonster() {
        monster = null;
        document.getElementById("monster-name").innerHTML = "";
        document.getElementById("monster-hp").innerHTML = "";
        document.getElementById("monster-att").innerHTML = "";
        return this.toggleMenu();
      },
      gameOver() {
        document.getElementById("screen").innerHTML =
          hero.name + "은(는) 레벨 " + hero.lev + "에서 사망했습니다!";
        return false;
      },
      exit(input) {
        document.getElementById("screen").innerHTML =
          "새로 시작하려면 F5나 새로고침을 눌러주세요.";
      }
    };
  },
  getInstance(name) {
    if (!instance) {
      instance = this.initiate(name);
    }
    return instance;
  }
};
