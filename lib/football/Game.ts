import Player from "./Player";
import Team from "./Team";
import Update from "./Update";

export class Game {
  private lineUps: Record<string, Player[]>;
  private updates: Update[] = [];
  private scores: Record<string, number> = {};
  private startTime: string | null = null;
  private endTime: string | null = null;
  private finished: boolean = false;
  private started: boolean = false;
  private halfTime: boolean = false;
  private halfTimeStart: string | null = null;
  private totalGameTime: number = 0;

  constructor(public id: string, public homeTeam: Team, public awayTeam: Team) {
    this.lineUps = {
      [homeTeam.getId()]: [],
      [awayTeam.getId()]: [],
    };

    this.scores[homeTeam.getId()] = 0;
    this.scores[awayTeam.getId()] = 0;
  }

  startGame(): void {
    if (this.started && !this.finished) {
      throw new Error("Can't start a game that has already started");
    }
    if (this.finished) {
      throw new Error("Can't start a game that has already finished");
    }
    this.started = true;
    this.startTime = new Date().toISOString();
  }

  startHalfTime(): void {
    if (!this.started || this.finished || this.halfTime) {
      throw new Error(
        "Game must be in progress and not in halftime to start halftime"
      );
    }
    this.halfTime = true;
    this.halfTimeStart = new Date().toISOString();

    const currentTime = new Date().getTime();
    const elapsedTime =
      (currentTime - new Date(this.startTime!).getTime()) / 1000 / 60; // Convert to minutes
    this.totalGameTime += Math.floor(elapsedTime);
    this.startTime = null; // Stop the game time during halftime
  }

  endHalfTime(): void {
    if (!this.halfTime || this.halfTimeStart === null) {
      throw new Error("Halftime has not started yet");
    }
    this.halfTime = false;
    this.startTime = new Date().toISOString(); // Restart the game time after halftime
  }

  endGame(): void {
    if (!this.started) {
      throw new Error("Cannot end the game that has not started");
    }
    if (this.halfTime) {
      throw new Error("Cannot end the game during halftime");
    }
    if (this.finished) {
      throw new Error("Cannot end the game that has ended");
    }
    this.finished = true;
    this.endTime = new Date().toISOString();

    const currentTime = new Date().getTime();
    const elapsedTime =
      (currentTime - new Date(this.startTime!).getTime()) / 1000 / 60; // Convert to minutes
    this.totalGameTime += Math.floor(elapsedTime);
  }

  getCurrentGameTime(): number {
    if (!this.started) return 0;
    if (this.halfTime || this.finished) return this.totalGameTime;

    const currentTime = new Date().getTime();
    const elapsedTime =
      (currentTime - new Date(this.startTime!).getTime()) / 1000 / 60; // Convert to minutes

    return this.totalGameTime + Math.floor(elapsedTime);
  }

  restartGame(): void {
    this.finished = false;
    this.started = true;
    this.startTime = new Date().toISOString();
    this.endTime = null;
    this.updates = [];
    this.scores[this.homeTeam.getId()] = 0;
    this.scores[this.awayTeam.getId()] = 0;
    this.totalGameTime = 0;
    this.halfTime = false;
    this.halfTimeStart = null;
  }

  addUpdate(update: Update): Update[] {
    if (!this.isGameOn()) {
      throw new Error("Can't add an update to a game that is not on");
    }
    this.updates.push(update);
    return this.updates;
  }

  isGameOn(): boolean {
    return this.started && !this.finished;
  }

  getUpdates(): Update[] {
    return this.updates;
  }

  updateHomeTeamScore(score: number): void {
    this.updateScore(this.homeTeam.getId(), score);
  }

  updateAwayTeamScore(score: number): void {
    this.updateScore(this.awayTeam.getId(), score);
  }

  addLineUp(teamId: string, players: Player[]): boolean {
    if (!this.lineUps[teamId]) {
      return false;
    }
    this.lineUps[teamId] = players;
    return true;
  }

  getLineUp(teamId: string): Player[] {
    return this.lineUps[teamId];
  }

  updateScore(teamId: string, score: number): void {
    if (!this.started) {
      throw new Error("Game has not started yet");
    }
    if (this.finished) {
      throw new Error("Game has already finished");
    }
    if (this.scores[teamId] === undefined) {
      throw new Error(`Team is not part of this game ${teamId}`);
    }

    this.scores[teamId] = score;
  }

  getScore(teamId: string): number {
    return this.scores[teamId];
  }

  getScores(): [number, number] {
    return [
      this.getScore(this.homeTeam.getId()),
      this.getScore(this.awayTeam.getId()),
    ];
  }

  toString(): string {
    const gameTime = this.getCurrentGameTime();
    return `${this.homeTeam.getName()} ${this.getScore(
      this.homeTeam.getId()
    )} vs ${this.getScore(this.awayTeam.getId())} ${this.awayTeam.getName()} ${
      gameTime > 0 ? `${gameTime}'` : ""
    }`;
  }
}

export default Game;
