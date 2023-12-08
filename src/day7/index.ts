import { Day } from '../day';
import { Hand as HandP1 } from './part-one';
import { Hand as HandP2 } from './part-two';

class Day7 extends Day {
  constructor() {
    super(7);
  }

  solveForPartOne(input: string): string {
    const hands = input.split('\n').map((line) => HandP1.fromInputLine(line));
    hands.sort((a, b) => a.compareTo(b)).reverse();
    for (let i = 0; i < hands.length; i++) {
      hands[i].setRankAmongHands(hands.length - i);
    }
    return hands
      .map((h) => h.winnings!)
      .reduce((a, b) => a + b)
      .toString();
  }

  solveForPartTwo(input: string): string {
    const hands = input.split('\n').map((line) => HandP2.fromInputLine(line));
    hands.sort((a, b) => a.compareTo(b)).reverse();
    for (let i = 0; i < hands.length; i++) {
      hands[i].setRankAmongHands(hands.length - i);
    }
    return hands
      .map((h) => h.winnings!)
      .reduce((a, b) => a + b)
      .toString();
  }
}

export default new Day7();
