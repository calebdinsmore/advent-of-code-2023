import { Day } from '../day';

const INPUT_RE = /Time:\s+(?<times>[\d ]+)\nDistance:\s+(?<distances>[\d ]+)/;

function computeDistance(heldMs: number, totalMs: number) {
  return (totalMs - heldMs) * heldMs;
}

class Day6 extends Day {
  constructor() {
    super(6);
  }

  solveForPartOne(input: string): string {
    const { times, distances } = input.match(INPUT_RE)?.groups!;
    const timesParsed = times
      .split(' ')
      .filter((x) => x !== '')
      .map((n) => Number.parseInt(n));
    const distancesParsed = distances
      .split(' ')
      .filter((x) => x !== '')
      .map((d) => Number.parseInt(d));
    const races: { time: number; distance: number }[] = [];
    timesParsed.forEach((time, index) => {
      races.push({ time, distance: distancesParsed[index] });
    });
    const winningHoldCounts = [];
    for (const race of races) {
      const distances = [];
      for (let holdMs = 1; holdMs < race.time; holdMs++) {
        distances.push(computeDistance(holdMs, race.time));
      }
      winningHoldCounts.push(distances.filter((d) => d > race.distance).length);
    }
    return winningHoldCounts.reduce((a, b) => a * b).toString();
  }

  solveForPartTwo(input: string): string {
    const { times, distances } = input.match(INPUT_RE)?.groups!;
    const time = Number.parseInt(
      times
        .split(' ')
        .filter((x) => x !== '')
        .join('')
    );
    const distance = Number.parseInt(
      distances
        .split(' ')
        .filter((x) => x !== '')
        .join('')
    );
    const raceFinishes = [];
    for (let holdMs = 1; holdMs < time; holdMs++) {
      raceFinishes.push(computeDistance(holdMs, time));
    }
    return raceFinishes.filter((f) => f > distance).length.toString();
  }
}

export default new Day6();
