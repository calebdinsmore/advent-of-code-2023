import day3 from './index';

const INPUT = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const INPUT2 = INPUT;

describe('On Day 5', () => {
  it(`part1 is correct`, () => {
    expect(day3.solveForPartOne(INPUT)).toBe('4361');
  });

  it(`part2 is correct`, () => {
    expect(day3.solveForPartTwo(INPUT2)).toBe('Solve me');
  });
});
