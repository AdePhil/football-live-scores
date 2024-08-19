import { it, expect, describe } from "vitest";
import Player from "../football/Player";

describe("Player", () => {
  it("should be able to create a player", () => {
    const player = new Player("Lionel", "Messi");
    expect(player).toBeDefined();
    expect(`${player}`).toBe("Lionel Messi");
  });
});
