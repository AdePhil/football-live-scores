# Football World Cup Scoreboard

A simple library for live football updates.

## Requirements

1. Start a new match, assuming initial score 0 – 0 and adding it the scoreboard.
   This should capture following parameters:
   a. Home team
   b. Away team
2. Update score. This should receive a pair of absolute scores: home team score and away
   team score.
3. Finish match currently in progress. This removes a match from the scoreboard.
4. Get a summary of matches in progress ordered by their total score. The matches with the
   same total score will be returned ordered by the most recently started match in the
   scoreboard.

## Design decisions and improvements

- Scores must be positive numbers.
- Can't start game that has already started.
- Can't start game that has already ended.
- Can't end game that has not started.
- Can't end game that has already ended
- Can't make updates to a game unless the game has started.
- Can't make updates to a game after the game as ended.
- Game is removed from scoreboard after game ends.
- Records minutes played so far.
- Handles half time breaks.
- Handle game restart.
- Sort game scores by total score and reverse order of addition.

## Future improvements

- Add more test cases.
- Add stats about the match and scores for each - e.g Ball Possession. Team A (60%) - Team B (40%)
- Add Match venue.
- Record more properties about players, teams and games.

## Technologies Used

- Typescript.
- Vitest for testing.

## Setup

Install dependencies:

```bash
npm install
```

## Run Tests

```bash
 npm run test
```
