import Player from "./Player";

class Team {
  constructor(
    private id: string,
    private players: Player[],
    private name: string,
    private logo: string
  ) {}

  getId() {
    return this.id;
  }

  getLogo() {
    return this.logo;
  }

  getName() {
    return this.name;
  }

  addPlayer(player: Player) {
    this.players.push(player);
  }

  removePlayer(player: Player) {
    this.players = this.players.filter((p) => p !== player);
  }

  getPlayers() {
    return this.players;
  }
}

export default Team;
