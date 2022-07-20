import RaceAppCar from "./raceAppCar.js";
import Event from "./raceAppEvent.js";
import ScoreTable from "./scoreTable.js";
import SeriesResult from "./seriesResult.js";

export default class Series {
  Competitors = [];
  Events = [];
  Results = [];

  constructor(data, raceAppTag) {
    console.log('new Series instance %s', raceAppTag);
    // this.Penalties = data.Penalties;
    // this.Results = data.Results;
    this.Settings = data.Settings;
    this.raceAppTag = raceAppTag;

    // TODO: store them all as objects
    const scoreTables = data.Settings.ScoreTables;
    const tagScoreTable = scoreTables.filter(table => table.Name === raceAppTag)[0];
    this.ScoreTable = new ScoreTable(tagScoreTable);

    // initialise "Competitors" with each car in the Series
    data.Settings.CarSoloBookings
      // .filter(booking => booking.Tag === raceAppTag)
      .forEach(car => {
        // this.Standings.push(new RaceAppCar(car));
        const raceAppCar = new RaceAppCar(car);
        // console.log(raceAppCar.CarNumber);
        this.addCompetitor(raceAppCar);
      });

    // add new Event (race) from series.Events
    data.Events.forEach(event => {
      this.Events.push(new Event(event));
    });

    // just looking at the races that have been completed ...
    this.filterPastRaces().forEach(event => {
      console.log('get result for %s (%i)', event.Name, event.Id);
      const p = this.getEventResults(event.Id);

      // only get the results if we didn't already have them
      if (event.Results.length === 0) {
        p.then((response) => {
          console.log(response);
          // const positions = [];
          const resultsForTag = response.Driver.filter(result => result.Tag === 'SILVER');
          event.Results = resultsForTag;

          event.Results.forEach((result, i) => {
            console.log('Car %s is placed %i for %i points', result.CarName, i + 1, this.ScoreTable.RaceScore[i].Points);
            // positions.push(result.CarNumber);
          });

          // this.awardPoints(event.Results, this.ScoreTable);
        });
      }
    });

    data.Results.forEach(r => {
      this.Results.push(new SeriesResult(r));
    });

    // console.log(this.Results);
  }

  /**
   *
   * @param {*} driverId
   */
  findCar (driverId) {
    let result = '';
    // console.log('searching for driverId %i in %o', driverId, this.Competitors);
    this.Competitors.forEach(c => {
      // console.log('checking %o', c);
      const found = c.hasDriver(driverId);
      if (found) {
        result = c.CarName;
      }
    });

    console.log(result);

    return result;
  }
  /**
   *
   * @param {raceAppCar} raceAppCar
   */
  addCompetitor (raceAppCar) {
    // console.log('addCompetitor(%o', raceAppCar);
    const index = raceAppCar.carNumber
    this.Competitors[raceAppCar.Id] = raceAppCar;
  }

  /**
   *
   * @param {*} eventClass
   * @param {*} tag
   * @returns
   */
  filterCompetitors(eventClass, tag) {
    return this.Competitors
      .filter(c => {
        c.Class === eventClass && c.Tag === tag;
      })
      .sort((a,b) => a.Pts - b.Pts);
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
  filterResultsByTag(tag) {
    tag = tag ?? this.raceAppTag;
    return this.Results.filter(result => result.Tag === tag);
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

  /**
   * filter Events based on whether they were run already
   * @returns {array}
   */
  filterPastRaces() {
    return this.Events.filter(e => e.isRaceRun);
  }

  /**
   * get results for this given eventId
   */
  async getEventResults (eventId) {

    const response =  await fetch(`raceApp/event.php?eventId=${eventId}`);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.error}`);
    }

    const data = await response.json();
    return data;
  }

  /**
   * update the Standings based on ordered car numbers and corresponding scores table
   * @param {array} pointsWinners
   * @param {ScoreTabe} scoreTable
   */
  awardPoints (pointsWinners, scoreTable) {
    pointsWinners.forEach((car, index) => {
      console.log(car, index);
      const raceAppCar = this.Competitors[car];
      // raceAppCar.addPoints(scoreTable.getPointsForPosition[index]);
    });
  }
}