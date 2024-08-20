import Game from "./Game";

class ScoreBoard {
  private games: Record<string, Game> = {};

  addGame(game: Game): void {
    this.games[game.id] = game;
  }

  startGame(id: string): void {
    const game = this.games[id];
    if (game) {
      game.startGame();
    }
  }

  endGame(id: string): Game | undefined {
    const game = this.games[id];
    if (game) {
      game.endGame();
    }
    return game;
  }

  updateScore(id: string, teamId: string, score: number): Game | undefined {
    const game = this.games[id];
    if (game && game.getScore(teamId) !== undefined) {
      game.updateScore(teamId, score);
    }
    return game;
  }

  getScores(): string {
    return Object.values(this.games)
      .map((game) => `${game}`)
      .join("\n");
  }
}

export default ScoreBoard;
