import { it, expect, describe, beforeEach, vi, afterEach } from "vitest";

import Game from "../football/Game";
import Team from "../football/Team";
import Venue from "../football/Venue";
import ScoreBoard from "../football/ScoreBoard";

describe("ScoreBoard", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should should the scores of all games", () => {
    const scoreBoard = new ScoreBoard();
    const fcb = new Team("fcb", [], "FC Barcelona", "logo.png");
    const bayern = new Team("bayern", [], "FC Bayern", "logo.png");

    const liverpool = new Team("liverpool", [], "Liverpool", "logo.png");
    const arsenal = new Team("arsenal", [], "Arsenal", "logo.png");

    const game1 = new Game(
      "game1",
      fcb,
      bayern,
      new Venue("Camp Nou", "Barcelona", "Spain")
    );
    const game2 = new Game(
      "game2",
      liverpool,
      arsenal,
      new Venue("Anfield", "Liverpool", "England")
    );

    scoreBoard.addGame(game1);
    scoreBoard.addGame(game2);

    const startTime = new Date(2020, 12, 1, 12, 30, 0);
    vi.setSystemTime(new Date(2020, 12, 1, 12, 30, 0));
    game1.startGame();
    game2.startGame();

    game1.updateScore(fcb.getId(), 1);
    game2.updateScore(liverpool.getId(), 1);
    game2.updateScore(arsenal.getId(), 1);

    vi.setSystemTime(new Date(2020, 12, 1, 12, 40, 0));
    expect(scoreBoard.getScores()).toBe(
      "FC Barcelona 1 vs 0 FC Bayern 10'\nLiverpool 1 vs 1 Arsenal 10'"
    );

    vi.setSystemTime(new Date(2020, 12, 1, 13, 20, 0));

    expect(scoreBoard.getScores()).toBe(
      "FC Barcelona 1 vs 0 FC Bayern 50'\nLiverpool 1 vs 1 Arsenal 50'"
    );
  });
});
