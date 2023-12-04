import { Day } from '../day';

class GridNumber {
  constructor(
    public number: number,
    public left: string,
    public right: string,
    public topRow: string[],
    public bottomRow: string[],
    public gearCoords?: string
  ) {}

  get isPartNumber() {
    return (
      this.topRow.some((v) => v !== '.') ||
      this.right !== '.' ||
      this.left !== '.' ||
      this.bottomRow.some((v) => v !== '.')
    );
  }

  static fromGridAndNumberAndCoords(numberString: string, grid: string[][], currentRow: number, currentCol: number) {
    const minX = Math.max(0, currentCol - numberString.length);
    const maxX = Math.min(grid[0].length - 1, currentCol + 1);
    const minY = Math.max(0, currentRow - 1);
    const maxY = Math.min(grid.length - 1, currentRow + 1);
    const topRow = minY !== 0 ? grid[minY].slice(minX, maxX + 1) : [];
    const left = minX !== 0 ? grid[currentRow][minX] : '.';
    const right = maxX !== grid[0].length - 1 ? grid[currentRow][maxX] : '.';
    const bottomRow = maxY !== grid.length - 1 ? grid[maxY].slice(minX, maxX + 1) : [];

    let gearX: number | undefined = undefined;
    let gearY: number | undefined = undefined;
    if (topRow.includes('*')) {
      gearX = topRow.indexOf('*') + minX;
      gearY = minY;
    } else if (left === '*') {
      gearX = minX;
      gearY = currentRow;
    } else if (right === '*') {
      gearX = maxX;
      gearY = currentRow;
    } else if (bottomRow.includes('*')) {
      gearX = bottomRow.indexOf('*') + minX;
      gearY = maxY;
    }

    let gearCoords: string | undefined;
    if (gearX !== undefined) {
      gearCoords = `${gearX},${gearY}`;
    }

    return new GridNumber(Number.parseInt(numberString), left, right, topRow, bottomRow, gearCoords);
  }
}

class Day3 extends Day {
  constructor() {
    super(3);
  }

  solveForPartOne(input: string): string {
    const grid = input.split('\n').map((line) => line.split(''));
    const gridNumbers = [];
    let currentNum = '';
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const current = grid[row][col];
        if (!Number.isNaN(Number.parseInt(current))) {
          currentNum += current;
          const next = grid[row].at(col + 1) ?? '';
          if (Number.isNaN(Number.parseInt(next))) {
            gridNumbers.push(GridNumber.fromGridAndNumberAndCoords(currentNum, grid, row, col));
            currentNum = '';
          }
        }
      }
    }
    return gridNumbers
      .filter((gn) => gn.isPartNumber)
      .map((pn) => pn.number)
      .reduce((a, b) => a + b)
      .toString();
  }

  solveForPartTwo(input: string): string {
    const grid = input.split('\n').map((line) => line.split(''));
    const gridNumbers = [];
    let currentNum = '';
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const current = grid[row][col];
        if (!Number.isNaN(Number.parseInt(current))) {
          currentNum += current;
          const next = grid[row].at(col + 1) ?? '';
          if (Number.isNaN(Number.parseInt(next))) {
            gridNumbers.push(GridNumber.fromGridAndNumberAndCoords(currentNum, grid, row, col));
            currentNum = '';
          }
        }
      }
    }
    const gearCoordMap: { [key: string]: GridNumber[] } = {};
    for (const gn of gridNumbers) {
      if (gn.gearCoords) {
        if (gearCoordMap[gn.gearCoords]) {
          gearCoordMap[gn.gearCoords].push(gn);
        } else {
          gearCoordMap[gn.gearCoords] = [gn];
        }
      }
    }
    let sum = 0;
    for (const gearNumberArray of Object.values(gearCoordMap)) {
      if (gearNumberArray.length === 2) {
        sum += gearNumberArray.map((gn) => gn.number).reduce((a, b) => a * b);
      }
    }
    return sum.toString();
  }
}

export default new Day3();
