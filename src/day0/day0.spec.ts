import day0 from './index';

const INPUT = `INPUT`;

const INPUT2 = INPUT;

describe('On Day 5', () => {
  it(`part1 is correct`, () => {
    expect(day0.solveForPartOne(INPUT)).toBe('Solve me');
  });

  it(`part2 is correct`, () => {
    expect(day0.solveForPartTwo(INPUT2)).toBe('Solve me');
  });
});
