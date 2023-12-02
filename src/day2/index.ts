import { Day } from '../day';

const GAME_LINE_RE = /Game (?<gameNum>\d+): (?<resultString>.+)/gm;
const COLOR_RE = /(?<count>\d+) (?<color>.*)/;

const PROPOSED_AMOUNTS = [12, 13, 14];

class Game {
  constructor(
    public id: number,
    public redResults: number[] = [],
    public blueResults: number[] = [],
    public greenResults: number[] = []
  ) {}

  static fromRegex(match: RegExpMatchArray): Game {
    const { gameNum, resultString } = match.groups!;
    const game = new Game(Number.parseInt(gameNum));
    const pullsStrings = resultString.split(';');
    for (const pulls of pullsStrings) {
      // e.g. "4 red, 2 blue"
      for (const colorString of pulls.split(',').map((x) => x.trim())) {
        const matches = colorString.match(COLOR_RE);
        const { count, color } = matches!.groups!;
        const colorCountInt = Number.parseInt(count);
        switch (color) {
          case 'red':
            game.redResults.push(colorCountInt);
            break;
          case 'green':
            game.greenResults.push(colorCountInt);
            break;
          case 'blue':
            game.blueResults.push(colorCountInt);
            break;
        }
      }
    }
    return game;
  }
}

class Day2 extends Day {
  constructor() {
    super(2);
  }

  solveForPartOne(input: string): string {
    const matches = input.matchAll(GAME_LINE_RE);
    const games = [];
    for (const match of matches) {
      games.push(Game.fromRegex(match));
    }
    const possibles = this.possibleGames(games);
    // sum game IDs
    return possibles
      .map((game) => game.id)
      .reduce((a, b) => a + b)
      .toString();
  }

  solveForPartTwo(input: string): string {
    return 'Solve me';
  }

  private possibleGames(games: Game[]) {
    const possibles = [];
    for (const game of games) {
      if (Math.max(...game.redResults) > PROPOSED_AMOUNTS[0]) {
        continue;
      }
      if (Math.max(...game.greenResults) > PROPOSED_AMOUNTS[1]) {
        continue;
      }
      if (Math.max(...game.blueResults) > PROPOSED_AMOUNTS[2]) {
        continue;
      }
      possibles.push(game);
    }
    return possibles;
  }
}

export default new Day2();
