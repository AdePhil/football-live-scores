import { it, expect, describe } from "vitest";
import Team from "../football/Team";
import Player from "../football/Player";

describe("Team", () => {
  it("should be able to create a team", () => {
    const team = new Team("1", [], "Brazil", "logo.png");
    expect(team).toBeDefined();
    expect(team.getName()).toBe("Brazil");
  });

  it("should be able to add a player", () => {
    const team = new Team("1", [], "Argentina", "logo.png");
    const player = new Player("Lionel", "Messi");
    team.addPlayer(player);
    expect(team.getPlayers()).toContain(player);
  });
  it("should be able to remove a player", () => {
    const team = new Team("1", [], "Brazil", "logo.png");
    const player = new Player("Vini", "Junior");
    team.addPlayer(player);
    team.removePlayer(player);
    expect(team.getPlayers()).not.toContain(player);
  });

  it("should be able to return all players", () => {
    const team = new Team("1", [], "Brazil", "logo.png");
    expect(team.getPlayers()).toEqual([]);
    const player = new Player("Rodrigo", "Goes");
    team.addPlayer(player);
    expect(team.getPlayers()).toEqual([player]);
  });
});
