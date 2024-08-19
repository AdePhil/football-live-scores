class Venue {
  constructor(
    private name: string,
    private city: string,
    private country: string
  ) {}

  toString() {
    return `${this.name} in ${this.city}, ${this.country}.`;
  }
}

export default Venue;
