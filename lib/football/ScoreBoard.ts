import Game from "./Game";

class ScoreBoard {
  private games: Map<string, Game> = new Map();

  addGame(game: Game): void {
    this.games.set(game.id, game);
  }

  startGame(id: string): void {
    const game = this.games.get(id);
    if (game) {
      game.startGame();
    }
  }

  endGame(id: string): Game | undefined {
    const game = this.games.get(id);
    if (game) {
      game.endGame();
      this.games.delete(id);
    }
    return game;
  }

  updateScore(id: string, score: [number, number]): Game | undefined {
    const game = this.games.get(id);
    const [homeScore, awayScore] = score;

    if (homeScore < 0 || awayScore < 0) {
      throw new Error("Score must be a positive number");
    }

    if (game) {
      game.updateHomeTeamScore(homeScore);
      game.updateAwayTeamScore(awayScore);
    }
    return game;
  }

  getScores(): string {
    return Array.from(this.games.values())
      .sort((game1, game2) => {
        const score1 = game1.getScores().reduce((acc, score) => acc + score, 0);
        const score2 = game2.getScores().reduce((acc, score) => acc + score, 0);
        if (score1 === score2) {
          return -1;
        }
        return score2 - score1;
      })
      .map((game) => `${game}`)
      .join("\n");
  }

  startHalfTime(id: string): void {
    const game = this.games.get(id);
    if (game) {
      game.startHalfTime();
    }
  }

  endHalfTime(id: string): void {
    const game = this.games.get(id);
    if (game) {
      game.endHalfTime();
    }
  }
}

export default ScoreBoard;
