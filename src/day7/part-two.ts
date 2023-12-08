const STRENGTHS = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

const HANDS = {
  FiveOfAKind: 7,
  FourOfAKind: 6,
  FullHouse: 5,
  ThreeOfAKind: 4,
  TwoPair: 3,
  OnePair: 2,
  HighCard: 1,
};

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
      this.handStrength = HANDS.FiveOfAKind;
    } else if (handValues.includes(4)) {
      if (this.handMap.J) {
        // can be 5 of a kind
        this.handStrength = HANDS.FiveOfAKind;
        return;
      }
      // 4 of a kind
      this.handStrength = HANDS.FourOfAKind;
    } else if (handValues.length === 2) {
      if (this.handMap.J) {
        // can be 5 of a kind
        this.handStrength = HANDS.FiveOfAKind;
        return;
      }
      // full house
      this.handStrength = HANDS.FullHouse;
    } else if (handValues.includes(3)) {
      if (this.handMap.J) {
        // can be 4 of a kind
        this.handStrength = HANDS.FourOfAKind;
        return;
      }
      // 3 of a kind
      this.handStrength = HANDS.ThreeOfAKind;
    } else if (handValues.filter((v) => v === 2).length === 2) {
      if (this.handMap.J === 2) {
        // can be 4 of a kind
        this.handStrength = HANDS.FourOfAKind;
        return;
      } else if (this.handMap.J === 1) {
        // can be full house
        this.handStrength = HANDS.FullHouse;
        return;
      }
      // 2 pair
      this.handStrength = HANDS.TwoPair;
    } else if (handValues.includes(2)) {
      if (this.handMap.J) {
        // can be 3 of a kind
        this.handStrength = HANDS.ThreeOfAKind;
        return;
      }
      // 1 pair
      this.handStrength = HANDS.OnePair;
    } else {
      if (this.handMap.J) {
        this.handStrength = HANDS.OnePair;
        return;
      }
      this.handStrength = HANDS.HighCard;
    }
  }
}
