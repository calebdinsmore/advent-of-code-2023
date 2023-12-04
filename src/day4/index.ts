import { Day } from '../day';
import _ from 'lodash';

const CARD_RE = /Card[ ]+(?<cardNum>\d+): (?<winningNums>[\d\s]+)\|(?<cardNums>[\d ]+)/gm;

class Card {
  constructor(
    public cardNum: string,
    public points: number,
    public winningNums: string[],
    public cardNums: string[],
    public numMatches: number
  ) {}
  static fromRegex(match: RegExpMatchArray) {
    const { cardNum, winningNums, cardNums } = match.groups!;
    const winningNumsSplit = winningNums.split(' ').filter((x) => x !== '');
    const cardNumsSplit = cardNums.split(' ').filter((x) => x !== '');
    let numMatches = 0;
    for (const num of cardNumsSplit) {
      if (winningNumsSplit.includes(num)) {
        numMatches++;
      }
    }
    const points = numMatches === 0 ? 0 : 2 ** (numMatches - 1);
    return new Card(cardNum, points, winningNumsSplit, cardNumsSplit, numMatches);
  }
}

class Day4 extends Day {
  constructor() {
    super(4);
  }

  solveForPartOne(input: string): string {
    const matches = input.matchAll(CARD_RE);
    const cards = [];
    for (const match of matches) {
      cards.push(Card.fromRegex(match));
    }
    return cards
      .map((c) => c.points)
      .reduce((a, b) => a + b)
      .toString();
  }

  solveForPartTwo(input: string): string {
    const matches = input.matchAll(CARD_RE);
    const cards = [];
    for (const match of matches) {
      cards.push(Card.fromRegex(match));
    }
    let totalCards = 0;
    for (let i = 0; i < cards.length; i++) {
      totalCards += this.processCard(cards, i);
    }
    return totalCards.toString();
  }

  private processCard(allCards: Card[], currentIndex: number) {
    const card = allCards[currentIndex];

    if (!card) return 0;

    if (card.points === 0) {
      return 1;
    }

    const nextIndex = currentIndex + 1;
    const cardsToCopy = this.range(nextIndex, nextIndex + card.numMatches);
    let sum = 0;
    for (const cardIndex of cardsToCopy) {
      sum += this.processCard(allCards, cardIndex);
    }
    return sum + 1;
  }

  private range(start: number, stop: number) {
    const range = [];
    for (let i = start; i < stop; i++) {
      range.push(i);
    }
    return range;
  }
}

export default new Day4();
