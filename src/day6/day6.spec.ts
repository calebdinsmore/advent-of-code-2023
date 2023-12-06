import day6 from './index';

const INPUT = `Time:      7  15   30
Distance:  9  40  200`;

const INPUT2 = INPUT;

describe('On Day 5', () => {
  it(`part1 is correct`, () => {
    expect(day6.solveForPartOne(INPUT)).toBe('288');
  });

  it(`part2 is correct`, () => {
    expect(day6.solveForPartTwo(INPUT2)).toBe('71503');
  });
});
