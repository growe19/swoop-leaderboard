import RaceAppCar from "./raceAppCar.js";
import SeriesEvent from "./seriesEvent.js";
import ScoreTable from "./scoreTable.js";
import SeriesResult from "./seriesResult.js";
import EventResult from "./eventResult.js";

export default class Series {
  Competitors = [];
  Events = [];
  Results = [];

  /**
   * constructor function for Series -
   *    -- get all the Competitors as RaceAppCarr from Settings.CarSoloBookings
   *    -- get all the Events as SeriesEvent from Events
   * @param {*} data
   * @param {*} raceAppTag
   */
  constructor(data, raceAppTag) {
    console.log('new Series instance %s', raceAppTag);
    // this.Penalties = data.Penalties;
    // this.Results = data.Results;
    this.Settings = data.Settings;
    this.raceAppTag = raceAppTag;

    // TODO: store them all as objects -- although they are currently all the same!
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
      this.Events.push(new SeriesEvent(event));
    });

    // just looking at the races that have been completed ...
    this.filterPastRaces().forEach(event => {
      console.log('get result for %s (%i)', event.Name, event.Id);

      // get the detailed data for each race that has been run
      const p = this.getEventResults(event.Id);
      p.then((response) => {
        console.log('car order for %i is %o', event.Id, response);

        response.Driver.forEach(car => {
          event.addResult(new EventResult(car));
        });

        // const positions = [];
        // const resultsForTag = response.Driver.filter(result => result.Tag === 'SILVER');
        // event.Results = resultsForTag; // store the result under series.Events[].Results

        // console.log(JSON.parse(JSON.stringify(this.Events)));

        e = this.Events.filter((e) => e.Id === event.Id)[0];
        for (const carClass in e.Results) {
          for (const carTag in e.Results[carClass]) {
            e.Results[carClass][carTag].forEach((car, position) => {
              // console.log('Car %o is placed %i for %i points', car, position + 1, this.ScoreTable.RaceScore[position].Points);

              // find this car in Competitors and add the appropriate number of points
              const competitor = this.Competitors.find(c => c.CarNumber === car.CarNumber);
              if (competitor) {
                // console.log('competitor %o', competitor);
                competitor.addPoints(this.ScoreTable.RaceScore[position].Points);
              }
            })
          }
        }
      });
    });

    data.Results.forEach(r => {
      this.Results.push(new SeriesResult(r));
    });

    // console.log(this.Results);
  }

  /**
   * get the car associated with the given driver
   * @param {*} driverId
   * @return {string} car name
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

    // console.log(result);

    return result;
  }
  /**
   * adds a car to the collection of Competitors
   * @param {raceAppCar} raceAppCar
   */
  addCompetitor (raceAppCar) {
    // console.log('addCompetitor(%o', raceAppCar);
    const index = raceAppCar.carNumber
    //this.Competitors[raceAppCar.Id] = raceAppCar;
    this.Competitors.push(raceAppCar);
  }

  /**
   * filter Competitors by given Class and Tag sorted by their Pts property
   * @param {*} eventClass
   * @param {*} tag
   * @returns {array}
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
   * @param {number} eventId
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
   * @param {ScoreTable} scoreTable
   */
  awardPoints (pointsWinners, scoreTable) {
    console.log(pointsWinners);
    pointsWinners.forEach((car, index) => {
      const pts = scoreTable.getPointsForPosition[index];
      console.log('awarding %i points to car %o', pts, car);
      const raceAppCar = this.Competitors[car];
      raceAppCar.addPoints(pts);
    });
  }

  /**
   *
   */
  standings () {
    const s = [];
    // group the cars by Tag
    this.Competitors.forEach(car => {
      if (!s[car.Tag]) {
        s[car.Tag] = [];
      }
      s[car.Tag].push(car);
    });

    console.log('standings: %o', s);

    // sort by pts
    for (const carTag in s) {
      const x = s[carTag].sort((a, b) => b.pts - a.pts);
    }

    return s;
  }

  getPosition (carTag, carNumber) {
    const s = this.standings();
    console.log(s, carTag, carNumber);
    const car = s[carTag].findIndex(car => car.CarNumber === carNumber) + 1;

    return car;
  }

  getPoints (carNumber) {
    const car = this.Competitors.find(car => car.CarNumber === parseInt(carNumber));

    if (car) {
      return car.pts;
    } else {
      return 0;
    }
  }
}