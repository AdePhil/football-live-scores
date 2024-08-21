import { it, expect, describe } from "vitest";
import Game from "../football/Game";
import Team from "../football/Team";
import FootballUpdate from "../football/Update";
import Player from "../football/Player";
describe("Game", () => {
  it("should be able to create a game", () => {
    const mexico = new Team("mexico", [], "Mexico", "logo.png");
    const canada = new Team("canada", [], "Canada", "logo.png");
    const game = new Game("game1", mexico, canada);
    expect(game).toBeDefined();
    expect(game.isGameOn()).toBe(false);
  });

  it("should be able to start a game", () => {
    const spain = new Team("spain", [], "Spain", "logo.png");
    const brazil = new Team("brazil", [], "Brazil", "logo.png");
    const game = new Game("game1", spain, brazil);
    game.startGame();
    expect(game.isGameOn()).toBe(true);
  });

  it("should not start a game if it has already started", () => {
    const spain = new Team("spain", [], "Spain", "logo.png");
    const brazil = new Team("brazil", [], "Brazil", "logo.png");

    const game = new Game("game1", spain, brazil);
    game.startGame();
    expect(() => game.startGame()).toThrowError(
      "Can't start a game that has already started"
    );
  });

  it("should not start a game if it has already finished", () => {
    const mexico = new Team("mexico", [], "Mexico", "logo.png");
    const canada = new Team("canada", [], "Canada", "logo.png");

    const game = new Game("game1", mexico, canada);
    game.startGame();
    game.endGame();
    expect(() => game.startGame()).toThrowError(
      "Can't start a game that has already finished"
    );
  });

  it("should be able to restart a game", () => {
    const mexico = new Team("mexico", [], "Mexico", "logo.png");
    const canada = new Team("canada", [], "Canada", "logo.png");

    const game = new Game("game1", mexico, canada);
    game.startGame();
    game.endGame();
    expect(game.isGameOn()).toBe(false);
    game.restartGame();
    expect(game.isGameOn()).toBe(true);
  });

  it("should be able to end a game", () => {
    const spain = new Team("spain", [], "Spain", "logo.png");
    const brazil = new Team("brazil", [], "Brazil", "logo.png");

    const game = new Game("game1", spain, brazil);
    game.startGame();
    game.endGame();
    expect(game.isGameOn()).toBe(false);
  });

  it("should be able to add an update", () => {
    const spain = new Team("spain", [], "Spain", "logo.png");
    const brazil = new Team("brazil", [], "Brazil", "logo.png");

    const game = new Game("game1", spain, brazil);
    game.startGame();
    game.addUpdate(new FootballUpdate("70", "Goal by Pablo Gavi."));
    game.addUpdate(new FootballUpdate("89", "Foul by Vini Jr."));

    expect(game.getUpdates().length).toBe(2);
    expect(`${game.getUpdates()}`).toBe(
      "70: Goal by Pablo Gavi.,89: Foul by Vini Jr."
    );
  });

  it("should return updates in the correct order", () => {
    const fcb = new Team("fcb", [], "FC Barcelona", "logo.png");
    const bayern = new Team("bayern", [], "FC Barcelona", "logo.png");

    const game = new Game("game1", fcb, bayern);

    game.startGame();
    game.addUpdate(new FootballUpdate("70", "Goal by Pablo Gavi."));
    game.addUpdate(new FootballUpdate("89", "Foul by Vini Jr."));
    const updates = game.getUpdates();
    expect(updates[0].toString()).toBe("70: Goal by Pablo Gavi.");
    expect(updates[1].toString()).toBe("89: Foul by Vini Jr.");
  });

  it("should be able to add a lineup", () => {
    const mexico = new Team("mexico", [], "Mexico", "logo.png");
    const canada = new Team("canada", [], "Canada", "logo.png");

    const game = new Game("game1", mexico, canada);

    const players = [
      new Player("Alphonso", "Davies"),
      new Player("Jonathan", "David"),
    ];
    game.addLineUp(canada.getId(), players);
    expect(game.getLineUp(canada.getId())).toEqual(players);
  });

  it("should not add a lineup if the team is not part of the game", () => {
    const mexico = new Team("mexico", [], "Mexico", "logo.png");
    const canada = new Team("canada", [], "Canada", "logo.png");

    const game = new Game("game1", mexico, canada);

    const players = [
      new Player("Lionel Messi", "Forward"),
      new Player("Gerard Pique", "Defender"),
    ];

    game.addLineUp("random", players);
    expect(game.getLineUp(mexico.getId())).toEqual([]);
    expect(game.getLineUp(canada.getId())).toEqual([]);
  });

  it("should return the correct lineup", () => {
    const mexico = new Team("mexico", [], "Mexico", "logo.png");
    const canada = new Team("canada", [], "Canada", "logo.png");

    const game = new Game("game1", mexico, canada);

    const players = [
      new Player("Alphonso", "Davies"),
      new Player("Jonathan", "David"),
    ];
    game.addLineUp(canada.getId(), players);
    expect(game.getLineUp(canada.getId())).toEqual(players);
  });

  it("should be able to update the score", () => {
    const mexico = new Team("mexico", [], "Mexico", "logo.png");
    const canada = new Team("canada", [], "Canada", "logo.png");

    const game = new Game("game1", mexico, canada);
    game.startGame();
    game.updateScore(mexico.getId(), 1);
    game.updateScore(canada.getId(), 2);
    expect(game.getScore(mexico.getId())).toBe(1);
    expect(game.getScore(canada.getId())).toBe(2);
  });

  it("should not update the score if the game has not started", () => {
    const mexico = new Team("mexico", [], "Mexico", "logo.png");
    const canada = new Team("canada", [], "Canada", "logo.png");

    const game = new Game("game1", mexico, canada);
    expect(() => game.updateScore(mexico.getId(), 1)).toThrowError(
      "Game has not started yet"
    );
  });
});
