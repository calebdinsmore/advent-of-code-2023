import day7 from './index';

const INPUT = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const INPUT2 = INPUT;

describe('On Day 5', () => {
  it(`part1 is correct`, () => {
    expect(day7.solveForPartOne(INPUT)).toBe('6440');
  });

  it(`part2 is correct`, () => {
    expect(day7.solveForPartTwo(INPUT2)).toBe('5905');
  });
});
