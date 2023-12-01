import { Day } from "../day";

class Day1 extends Day {
  constructor() {
    super(1);
  }

  solveForPartOne(input: string): string {
    const lines = input.split("\n");
    const numbers = lines.map((line) => this.extractNumbers(line));
    const concatenatedNums = numbers
      .map((numArray) => `${numArray[0]}${numArray.slice(-1)}`)
      .map((stringNum) => Number.parseInt(stringNum));
    return concatenatedNums.reduce((a, b) => a + b).toString();
  }

  solveForPartTwo(input: string): string {
    const lines = input.split("\n");
    const numbers = lines.map((line) => this.extractNumbers(line));
    const concatenatedNums = numbers
      .map((numArray) => `${numArray[0]}${numArray.slice(-1)}`)
      .map((stringNum) => Number.parseInt(stringNum));
    return concatenatedNums.reduce((a, b) => a + b).toString();
  }

  private extractNumbers(line: string): number[] {
    const wordDigits = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ];
    const nums = [];
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      const num = Number.parseInt(ch);
      if (!Number.isNaN(num)) {
        nums.push(num);
      } else {
        for (let j = 0; j < wordDigits.length; j++) {
          const digit = wordDigits[j];
          if (line.slice(i, i + digit.length) === digit) {
            nums.push(j + 1);
          }
        }
      }
    }
    return nums;
  }
}

export default new Day1();
