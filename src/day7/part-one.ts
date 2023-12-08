const STRENGTHS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

export class Hand {
  handStrength!: number;
  winnings?: number;
  constructor(public hand: string, public bet: number, public handMap: { [key: string]: number }) {
    this.computeHandStrength();
  }

  static fromInputLine(line: string) {
    const [hand, betStr] = line.split(' ');

    const map: { [key: string]: number } = {};
    for (const char of hand) {
      if (!map[char]) {
        map[char] = 1;
      } else {
        map[char] += 1;
      }
    }
    return new Hand(hand, Number.parseInt(betStr), map);
  }

  compareTo(hand: Hand) {
    if (this.handStrength > hand.handStrength) {
      return 1;
    }
    if (this.handStrength < hand.handStrength) {
      return -1;
    }
    // equal strength
    for (let i = 0; i < hand.hand.length; i++) {
      const thisCard = this.hand[i];
      const otherCard = hand.hand[i];
      const thisStrength = STRENGTHS.indexOf(thisCard);
      const otherStrength = STRENGTHS.indexOf(otherCard);
      if (thisStrength > otherStrength) {
        return 1;
      }
      if (thisStrength < otherStrength) {
        return -1;
      }
    }
    // hands are identical
    return 0;
  }

  setRankAmongHands(rank: number) {
    this.winnings = this.bet * rank;
  }

  private computeHandStrength() {
    const handKeys = Object.keys(this.handMap);
    const handValues = Object.values(this.handMap);
    if (handKeys.length === 1) {
      // 5 of a kind
      this.handStrength = 7;
    } else if (handValues.includes(4)) {
      // 4 of a kind
      this.handStrength = 6;
    } else if (handValues.length === 2) {
      // full house
      this.handStrength = 5;
    } else if (handValues.includes(3)) {
      // 3 of a kind
      this.handStrength = 4;
    } else if (handValues.filter((v) => v === 2).length === 2) {
      // 2 pair
      this.handStrength = 3;
    } else if (handValues.includes(2)) {
      // 1 pair
      this.handStrength = 2;
    } else {
      this.handStrength = 1;
    }
  }
}
