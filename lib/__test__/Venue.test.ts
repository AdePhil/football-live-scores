import { it, expect, describe } from "vitest";
import Venue from "../football/Venue";
describe("Venue", () => {
  it("should be able to create a venue", () => {
    const venue = new Venue("Allianz arena", "Munich", "Germany");
    expect(venue).toBeDefined();
    expect(`${venue}`).toBe("Allianz arena in Munich, Germany.");
  });
});
