import { it, expect, describe, beforeEach, vi, afterEach } from "vitest";

import Game from "../football/Game";
import Team from "../football/Team";
import ScoreBoard from "../football/ScoreBoard";

describe("ScoreBoard", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    // vi.useRealTimers();
  });

  it("should show the scores of all games", () => {
    const scoreBoard = new ScoreBoard();
    const mexico = new Team("mexico", [], "Mexico", "logo.png");
    const canada = new Team("canada", [], "Canada", "logo.png");

    const spain = new Team("spain", [], "Spain", "logo.png");
    const brazil = new Team("brazil", [], "Brazil", "logo.png");

    const game1 = new Game("game1", mexico, canada);
    const game2 = new Game("game2", spain, brazil);

    scoreBoard.addGame(game1);
    scoreBoard.addGame(game2);

    vi.setSystemTime(new Date(2020, 12, 1, 12, 30, 0));
    game1.startGame();
    vi.setSystemTime(new Date(2020, 12, 1, 13, 0, 0));
    game2.startGame();

    scoreBoard.updateScore("game1", [1, 0]);
    scoreBoard.updateScore("game2", [1, 1]);

    vi.setSystemTime(new Date(2020, 12, 1, 13, 10, 0));
    expect(scoreBoard.getScores()).toBe(
      "Spain 1 vs 1 Brazil 10'\nMexico 1 vs 0 Canada 40'"
    );

    vi.setSystemTime(new Date(2020, 12, 1, 13, 20, 0));

    expect(scoreBoard.getScores()).toBe(
      "Spain 1 vs 1 Brazil 20'\nMexico 1 vs 0 Canada 50'"
    );
  });

  it("should show the scores of all games by scores in sorted order", () => {
    const scoreBoard = new ScoreBoard();
    const mexico = new Team("mexico", [], "Mexico", "logo.png");
    const canada = new Team("canada", [], "Canada", "logo.png");

    const spain = new Team("spain", [], "Spain", "logo.png");
    const brazil = new Team("brazil", [], "Brazil", "logo.png");

    const germany = new Team("germany", [], "Germany", "logo.png");
    const france = new Team("france", [], "France", "logo.png");

    const uruguay = new Team("uruguay", [], "Uruguay", "logo.png");
    const Italy = new Team("italy", [], "Italy", "logo.png");

    const argentina = new Team("argentina", [], "Argentina", "logo.png");
    const Australia = new Team("australia", [], "Australia", "logo.png");

    const game1 = new Game("game1", mexico, canada);
    const game2 = new Game("game2", spain, brazil);
    const game3 = new Game("game3", germany, france);
    const game4 = new Game("game4", uruguay, Italy);
    const game5 = new Game("game5", argentina, Australia);

    scoreBoard.addGame(game1);
    scoreBoard.addGame(game2);
    scoreBoard.addGame(game3);
    scoreBoard.addGame(game4);
    scoreBoard.addGame(game5);

    vi.setSystemTime(new Date(2020, 12, 1, 20, 0, 0));
    game1.startGame();
    game2.startGame();
    game3.startGame();
    game4.startGame();
    game5.startGame();
    vi.setSystemTime(new Date(2020, 12, 1, 20, 30, 0));

    scoreBoard.updateScore("game1", [0, 5]);
    scoreBoard.updateScore("game2", [10, 2]);
    scoreBoard.updateScore("game3", [2, 2]);
    scoreBoard.updateScore("game4", [6, 6]);
    scoreBoard.updateScore("game5", [3, 1]);

    expect(scoreBoard.getScores()).toBe(
      // "Mexico 1 vs 0 Canada 50'\nSpain 1 vs 1 Brazil 20'",
      "Uruguay 6 vs 6 Italy 30'\nSpain 10 vs 2 Brazil 30'\nMexico 0 vs 5 Canada 30'\nArgentina 3 vs 1 Australia 30'\nGermany 2 vs 2 France 30'"
    );
  });

  it("should handle half time break", () => {
    const scoreBoard = new ScoreBoard();
    const spain = new Team("spain", [], "Spain", "logo.png");
    const brazil = new Team("brazil", [], "Brazil", "logo.png");

    const game1 = new Game("game1", spain, brazil);

    scoreBoard.addGame(game1);
    vi.setSystemTime(new Date(2020, 12, 1, 14, 0, 0));
    game1.startGame();
    vi.setSystemTime(new Date(2020, 12, 1, 14, 45, 0));

    expect(scoreBoard.getScores()).toBe("Spain 0 vs 0 Brazil 45'");

    game1.startHalfTime();
    vi.setSystemTime(new Date(2020, 12, 1, 15, 0, 0));
    game1.endHalfTime();
    vi.setSystemTime(new Date(2020, 12, 1, 15, 20, 0));
    expect(scoreBoard.getScores()).toBe("Spain 0 vs 0 Brazil 65'");
  });

  it("should not update score if it is negative", () => {
    const scoreBoard = new ScoreBoard();
    const spain = new Team("spain", [], "Spain", "logo.png");
    const brazil = new Team("brazil", [], "Brazil", "logo.png");

    const game1 = new Game("game1", spain, brazil);

    scoreBoard.addGame(game1);
    vi.setSystemTime(new Date(2020, 12, 1, 14, 0, 0));
    game1.startGame();
    vi.setSystemTime(new Date(2020, 12, 1, 14, 45, 0));

    expect(scoreBoard.getScores()).toBe("Spain 0 vs 0 Brazil 45'");

    expect(() => scoreBoard.updateScore("game1", [-1, -1])).toThrow(
      "Score must be a positive number"
    );
  });

  it("should handle end game", () => {
    const scoreBoard = new ScoreBoard();
    const spain = new Team("spain", [], "Spain", "logo.png");
    const brazil = new Team("brazil", [], "Brazil", "logo.png");

    const game1 = new Game("game1", spain, brazil);

    scoreBoard.addGame(game1);
    vi.setSystemTime(new Date(2020, 12, 1, 14, 0, 0));
    game1.startGame();
    vi.setSystemTime(new Date(2020, 12, 1, 14, 45, 0));

    expect(scoreBoard.getScores()).toBe("Spain 0 vs 0 Brazil 45'");

    scoreBoard.endGame(game1.id);
    expect(scoreBoard.getScores()).toBe("");
  });
});
