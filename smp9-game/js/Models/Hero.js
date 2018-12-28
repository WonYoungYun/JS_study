import Character from "./Character.js";

const Hero = Object.create(Character);

const stat = {
  Hp: 100,
  maxHp: 100,
  Att: 15
};

Hero.setup = function(name) {
  this.init(name, stat.Hp, stat.Att);
  this.maxHp = stat.maxHp;
};
Hero.damagedAttack = function(att) {
  this.Hp -= att;
  return this;
};
Hero.win = function() {
  if (this.Hp + 10 <= 100) this.Hp += 10;

  return this;
};

export default Hero;
