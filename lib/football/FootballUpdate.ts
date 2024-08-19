class FootballUpdate {
  constructor(private time: string, private update: string) {}
  toString() {
    return `${this.time}: ${this.update}`;
  }
}

export default FootballUpdate;
