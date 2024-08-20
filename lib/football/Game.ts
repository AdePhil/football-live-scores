import { getTime } from "../utils";
import Player from "./Player";
import Team from "./Team";
import Update from "./Update";
import Venue from "./Venue";

export class Game {
  private lineUps: Record<string, Player[]>;
  private updates: Update[] = [];
  private scores: Record<string, number> = {};
  private startTime: string | null = null;
  private endTime: string | null = null;
  private finished: boolean = false;
  private started: boolean = false;

  constructor(
    public id: string,
    public teamOne: Team,
    public teamTwo: Team,
    public venue: Venue
  ) {
    this.lineUps = {
      [teamOne.getId()]: [],
      [teamTwo.getId()]: [],
    };

    this.scores[teamOne.getId()] = 0;
    this.scores[teamTwo.getId()] = 0;
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

  endGame(): void {
    this.finished = true;
    this.endTime = new Date().toISOString();
  }

  restartGame(): void {
    this.finished = false;
    this.started = true;
    this.startTime = new Date().toISOString();
    this.endTime = null;
    this.updates = [];
    this.scores[this.teamOne.getId()] = 0;
    this.scores[this.teamTwo.getId()] = 0;
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

  toString(): string {
    return `${this.teamOne.getName()} ${this.getScore(
      this.teamOne.getId()
    )} vs ${this.getScore(this.teamTwo.getId())} ${this.teamTwo.getName()} ${
      !!this.startTime ? getTime(this.startTime) + "'" : ""
    }`;
  }
}

export default Game;
