import Character from "./Character.js";

//짝수로 건들것,
const Monsters = [
  {
    name: "오크",
    Hp: 28,
    Att: 10,
    Action: ""
  },
  {
    name: "오거",
    Hp: 30,
    Att: 14,
    Action: ""
  },
  {
    name: "고블린",
    Hp: 24,
    Att: 8,
    Action: ""
  }
];

const Monster = Object.create(Character);

Monster.setup = function() {
  const enemy = this.createMonster();
  this.init(enemy.name, enemy.Hp, enemy.Att);
  this.Action = Math.floor(Math.random() * 3) + 1;
  this.upgrade();
  return this;
};
Monster.upgrade = function() {
  const monster_info = this;
  switch (this.randomStatus()) {
    case 3:
      monster_info.name = `단단한 ${monster_info.name}`;
      monster_info.Hp *= 2;
      break;
    case 4:
      monster_info.name = `강력한 ${monster_info.name}`;
      monster_info.Att *= 2;
      break;
    case 5:
      monster_info.name = `환상의 ${monster_info.name}`;
      monster_info.Hp *= 1.5;
      monster_info.Att *= 1.5;
  }
};

Monster.doAction = function(number) {
  if (number === 1) {
    return "공격";
  } else if (number === 2) {
    return "전투기술";
  } else {
    return "발차기";
  }
};
Monster.createMonster = function() {
  return Monsters[Math.floor(Math.random() * Monsters.length)];
};
Monster.randomStatus = function() {
  const number = Math.floor(Math.random() * 5);
  return number;
};
Monster.damagedAttack = function(att) {
  this.Hp -= att;
  this.Action = Math.floor(Math.random() * 3) + 1;
  return this;
};

export default Monster;
