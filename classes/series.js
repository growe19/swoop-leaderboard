import RaceAppCar from "./raceAppCar.js";
import Event from "./raceAppEvent.js";
import ScoreTable from "./scoreTable.js";

export default class Series {
  Standings = [];
  Events = [];

  constructor(data, raceAppTag) {
    console.log('new Series instance %s', raceAppTag);
    // this.Penalties = data.Penalties;
    this.Results = data.Results;
    this.Settings = data.Settings;

    const scoreTables = data.Settings.ScoreTables;
    const tagScoreTable = scoreTables.filter(table => table.Name === raceAppTag)[0];
    this.ScoreTable = new ScoreTable(tagScoreTable);

    data.Settings.CarSoloBookings
      .filter(booking => booking.Tag === raceAppTag)
      .forEach(car => {
        this.Standings.push(new RaceAppCar(car));
      }
      );

    data.Events.forEach(event => {
      this.Events.push(new Event(event));
    });
  }

  /**
   *
   * @param {*} className
   * @returns
   */
  filterResultsByClass(className) {
    return this.Results.filter(result => result.VehicleClass === className);
  }

  /**
   *
   * @param {*} tagName
   * @returns
   */
  filterResultsByTag(tagName) {
    return this.Results.filter(result => result.Tag === tagName);
  }

  /**
   * Get all the cars that are involved in this Series
   *
   * @param {string} tagName
   * @returns {array}
   */
  filterBookingsByTag(tagName) {
    return this.Settings.CarSoloBookings.filter(car => car.Tag === tagName);
  }

  filterPastRaces() {
    return this.Events.filter(e => e.isRaceRun);
  }
}