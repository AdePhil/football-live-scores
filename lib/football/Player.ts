class Player {
  constructor(private firstName: string, private lastName: string) {}
  toString() {
    return `${this.firstName} ${this.lastName}`;
  }
}

export default Player;
