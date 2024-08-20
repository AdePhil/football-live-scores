class Venue {
  constructor(
    private name: string,
    private city: string,
    private country: string
  ) {}

  getName(): string {
    return this.name;
  }
  toString() {
    return `${this.name} in ${this.city}, ${this.country}.`;
  }
}

export default Venue;
