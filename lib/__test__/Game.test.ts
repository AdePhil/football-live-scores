import { it, expect, describe } from "vitest";
import Game from "../football/Game";
import Team from "../football/Team";
import Venue from "../football/Venue";
import FootballUpdate from "../football/Update";
import Player from "../football/Player";
import exp from "constants";
describe("Game", () => {
  it("should be able to create a game", () => {
    const fcb = new Team("fcb", [], "FC Barcelona", "logo.png");
    const bayern = new Team("bayern", [], "FC Barcelona", "logo.png");
    const venue = new Venue("Camp Nou", "Barcelona", "Spain");
    const game = new Game("game1", fcb, bayern, venue);
    expect(game).toBeDefined();
    expect(game.isGameOn()).toBe(false);
  });

  it("should be able to start a game", () => {
    const fcb = new Team("fcb", [], "FC Barcelona", "logo.png");
    const bayern = new Team("bayern", [], "FC Barcelona", "logo.png");
    const venue = new Venue("Camp Nou", "Barcelona", "Spain");
    const game = new Game("game1", fcb, bayern, venue);
    game.startGame();
    expect(game.isGameOn()).toBe(true);
  });

  it("should not start a game if it has already started", () => {
    const fcb = new Team("fcb", [], "FC Barcelona", "logo.png");
    const bayern = new Team("bayern", [], "FC Barcelona", "logo.png");
    const venue = new Venue("Camp Nou", "Barcelona", "Spain");
    const game = new Game("game1", fcb, bayern, venue);
    game.startGame();
    expect(() => game.startGame()).toThrowError(
      "Can't start a game that has already started"
    );
  });

  it("should not start a game if it has already finished", () => {
    const fcb = new Team("fcb", [], "FC Barcelona", "logo.png");
    const bayern = new Team("bayern", [], "FC Barcelona", "logo.png");
    const venue = new Venue("Camp Nou", "Barcelona", "Spain");
    const game = new Game("game1", fcb, bayern, venue);
    game.startGame();
    game.endGame();
    expect(() => game.startGame()).toThrowError(
      "Can't start a game that has already finished"
    );
  });

  it("should be able to restart a game", () => {
    const fcb = new Team("fcb", [], "FC Barcelona", "logo.png");
    const bayern = new Team("bayern", [], "FC Barcelona", "logo.png");
    const venue = new Venue("Camp Nou", "Barcelona", "Spain");
    const game = new Game("game1", fcb, bayern, venue);
    game.startGame();
    game.endGame();
    expect(game.isGameOn()).toBe(false);
    game.restartGame();
    expect(game.isGameOn()).toBe(true);
  });

  it("should be able to end a game", () => {
    const fcb = new Team("fcb", [], "FC Barcelona", "logo.png");
    const bayern = new Team("bayern", [], "FC Barcelona", "logo.png");
    const venue = new Venue("Camp Nou", "Barcelona", "Spain");
    const game = new Game("game1", fcb, bayern, venue);
    game.startGame();
    game.endGame();
    expect(game.isGameOn()).toBe(false);
  });

  it("should be able to add an update", () => {
    const fcb = new Team("fcb", [], "FC Barcelona", "logo.png");
    const bayern = new Team("bayern", [], "FC Barcelona", "logo.png");
    const venue = new Venue("Camp Nou", "Barcelona", "Spain");
    const game = new Game("game1", fcb, bayern, venue);
    game.startGame();
    game.addUpdate(new FootballUpdate("70", "Goal by Lionel Messi."));
    game.addUpdate(new FootballUpdate("89", "Foul by Gerard Pique."));

    expect(game.getUpdates().length).toBe(2);
    expect(`${game.getUpdates()}`).toBe(
      "70: Goal by Lionel Messi.,89: Foul by Gerard Pique."
    );
  });

  it("should return updates in the correct order", () => {
    const fcb = new Team("fcb", [], "FC Barcelona", "logo.png");
    const bayern = new Team("bayern", [], "FC Barcelona", "logo.png");
    const venue = new Venue("Camp Nou", "Barcelona", "Spain");

    const game = new Game("game1", fcb, bayern, venue);

    game.startGame();
    game.addUpdate(new FootballUpdate("70", "Goal by Lionel Messi."));
    game.addUpdate(new FootballUpdate("89", "Foul by Gerard Pique."));
    game.addUpdate(new FootballUpdate("90", "Goal by Gerard Pique."));
    game.addUpdate(new FootballUpdate("90", "Goal by Lionel Messi."));
    const updates = game.getUpdates();
    expect(updates[0].toString()).toBe("70: Goal by Lionel Messi.");
    expect(updates[1].toString()).toBe("89: Foul by Gerard Pique.");
    expect(updates[2].toString()).toBe("90: Goal by Gerard Pique.");
    expect(updates[3].toString()).toBe("90: Goal by Lionel Messi.");
  });

  it("should be able to add a lineup", () => {
    const fcb = new Team("fcb", [], "FC Barcelona", "logo.png");
    const bayern = new Team("bayern", [], "FC Barcelona", "logo.png");
    const venue = new Venue("Camp Nou", "Barcelona", "Spain");
    const game = new Game("game1", fcb, bayern, venue);
    const players = [
      new Player("Lionel Messi", "Forward"),
      new Player("Gerard Pique", "Defender"),
    ];
    game.addLineUp(fcb.getId(), players);
    expect(game.getLineUp(fcb.getId())).toEqual(players);
  });

  it("should not add a lineup if the team is not part of the game", () => {
    const fcb = new Team("fcb", [], "FC Barcelona", "logo.png");
    const bayern = new Team("bayern", [], "FC Barcelona", "logo.png");
    const venue = new Venue("Camp Nou", "Barcelona", "Spain");
    const game = new Game("game1", fcb, bayern, venue);

    const players = [
      new Player("Lionel Messi", "Forward"),
      new Player("Gerard Pique", "Defender"),
    ];

    game.addLineUp("random", players);
    expect(game.getLineUp(fcb.getId())).toEqual([]);
    expect(game.getLineUp(bayern.getId())).toEqual([]);
  });

  it("should return the correct lineup", () => {
    const fcb = new Team("fcb", [], "FC Barcelona", "logo.png");
    const bayern = new Team("bayern", [], "FC Barcelona", "logo.png");
    const venue = new Venue("Camp Nou", "Barcelona", "Spain");
    const game = new Game("game1", fcb, bayern, venue);
    const players = [
      new Player("Thomas Muller", "Forward"),
      new Player("Philip Lamb", "Defender"),
    ];
    game.addLineUp(bayern.getId(), players);
    expect(game.getLineUp(bayern.getId())).toEqual(players);
  });

  it("should be able to update the score", () => {
    const fcb = new Team("fcb", [], "FC Barcelona", "logo.png");
    const bayern = new Team("bayern", [], "FC Barcelona", "logo.png");
    const venue = new Venue("Camp Nou", "Barcelona", "Spain");
    const game = new Game("game1", fcb, bayern, venue);
    game.startGame();
    game.updateScore(fcb.getId(), 1);
    game.updateScore(bayern.getId(), 2);
    expect(game.getScore(fcb.getId())).toBe(1);
    expect(game.getScore(bayern.getId())).toBe(2);
  });

  it("should not update the score if the game has not started", () => {
    const fcb = new Team("fcb", [], "FC Barcelona", "logo.png");
    const bayern = new Team("bayern", [], "FC Barcelona", "logo.png");
    const venue = new Venue("Camp Nou", "Barcelona", "Spain");
    const game = new Game("game1", fcb, bayern, venue);
    expect(() => game.updateScore(fcb.getId(), 1)).toThrowError(
      "Game has not started yet"
    );
  });
});
