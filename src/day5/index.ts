import { Day } from '../day';
import { range } from '../utils/range';

class FoodProductionMap {
  mapEntries: number[][] = [];
  max = Number.MIN_SAFE_INTEGER;
  min = Number.MAX_SAFE_INTEGER;

  setMapEntries(entries: number[][]) {
    this.mapEntries = entries;
  }

  getValue(key: number): number {
    for (const entry of this.mapEntries) {
      if (key >= entry[1] && key < entry[1] + entry[2]) {
        return entry[0] + (key - entry[1]);
      }
    }
    return key;
  }
}

class Almanac {
  seedToSoil: FoodProductionMap = new FoodProductionMap();
  soilToFertilizer: FoodProductionMap = new FoodProductionMap();
  fertilizerToWater: FoodProductionMap = new FoodProductionMap();
  waterToLight: FoodProductionMap = new FoodProductionMap();
  lightToTemperature: FoodProductionMap = new FoodProductionMap();
  temperatureToHumidity: FoodProductionMap = new FoodProductionMap();
  humidityToLocation: FoodProductionMap = new FoodProductionMap();

  getLocationForSeed(seed: number): number {
    const soil = this.seedToSoil.getValue(seed);
    const fertilizer = this.soilToFertilizer.getValue(soil);
    const water = this.fertilizerToWater.getValue(fertilizer);
    const light = this.waterToLight.getValue(water);
    const temp = this.lightToTemperature.getValue(light);
    const humidity = this.temperatureToHumidity.getValue(temp);
    return this.humidityToLocation.getValue(humidity);
  }

  validate() {
    if (
      this.seedToSoil.mapEntries.length === 0 ||
      this.soilToFertilizer.mapEntries.length === 0 ||
      this.fertilizerToWater.mapEntries.length === 0 ||
      this.waterToLight.mapEntries.length === 0 ||
      this.lightToTemperature.mapEntries.length === 0 ||
      this.temperatureToHumidity.mapEntries.length === 0 ||
      this.humidityToLocation.mapEntries.length === 0
    ) {
      throw new Error('One or more maps was not populated.');
    }
  }
}

class Day5 extends Day {
  constructor() {
    super(5);
  }

  solveForPartOne(input: string): string {
    const { seeds, almanac } = this.generateSeedsAndAlmanac(input);
    const locations = seeds.map((s) => almanac.getLocationForSeed(s));
    return Math.min(...locations).toString();
  }

  solveForPartTwo(input: string): string {
    const { seeds, almanac } = this.generateSeedsAndAlmanac(input);
    let lowestLoc = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < seeds.length; i += 2) {
      const seedStart = seeds[i];
      const seedEnd = seeds[i] + seeds[i + 1];
      for (let j = seedStart; j < seedEnd; j++) {
        const location = almanac.getLocationForSeed(j);
        if (location < lowestLoc) {
          lowestLoc = location;
        }
      }
    }
    return lowestLoc.toString();
  }

  private generateSeedsAndAlmanac(input: string) {
    const sections = input.split('\n\n');
    const { seedLine } = sections[0].match(/seeds: (?<seedLine>[\d ]+)/)?.groups!;
    const seeds = seedLine.split(' ').map((n) => Number.parseInt(n));
    const almanac = new Almanac();
    for (const section of sections.slice(1)) {
      const mapLines = section.split('\n').slice(1);
      if (section.startsWith('seed-to-soil')) {
        this.populateMap(almanac.seedToSoil, mapLines);
      } else if (section.startsWith('soil-to-fertilizer')) {
        this.populateMap(almanac.soilToFertilizer, mapLines);
      } else if (section.startsWith('fertilizer-to-water')) {
        this.populateMap(almanac.fertilizerToWater, mapLines);
      } else if (section.startsWith('water-to-light')) {
        this.populateMap(almanac.waterToLight, mapLines);
      } else if (section.startsWith('light-to-temperature')) {
        this.populateMap(almanac.lightToTemperature, mapLines);
      } else if (section.startsWith('temperature-to-humidity')) {
        this.populateMap(almanac.temperatureToHumidity, mapLines);
      } else if (section.startsWith('humidity-to-location')) {
        this.populateMap(almanac.humidityToLocation, mapLines);
      }
    }
    almanac.validate();
    return {
      seeds,
      almanac,
    };
  }

  private populateMap(map: FoodProductionMap, mapLines: string[]) {
    const parsed = mapLines.map((line) => line.split(' ').map((n) => Number.parseInt(n)));
    map.mapEntries = parsed;
  }
}

export default new Day5();
