import day1 from "./index";

const INPUT = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const INPUT2 = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

describe("On Day 1", () => {
  it(`part1 is identity function`, () => {
    expect(day1.solveForPartOne(INPUT)).toBe("142");
  });

  it(`part2 is correct`, () => {
    expect(day1.solveForPartTwo(INPUT2)).toBe("281");
  });
});
