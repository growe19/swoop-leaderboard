import leaderboard from '../app.js';

/**
 * See https://datatables.net/reference/option/drawCallback
 *
 * @param {Object} settings see https://datatables.net/reference/type/DataTables.Settings
 */
export default function drawCallback(settings) {
  const api = this.api();
  // const tabledata = api.rows({ 'page': 'current' }).data();
  // console.log(tabledata);

  let me = {};

  /**
   * calculate the gap to the car ahead of us in the class leaderboard
   */

  // put all the cars in order under their raceAppTag (PLATIN, GOLD, SILVER, BRONZE)
  const classPositions = [];
  api.rows().every(function (rowIdx, tableLoop, rowLoop) {
    const car = this.data();

    // while we are looping let's save the identity of game player
    if (car.isPlayer) {
      me = car;
    }

    // console.log(classPositions);
    if (car.raceAppTag) {
      let index = classPositions.hasOwnProperty(car.raceAppTag);
      // console.log(index, car.raceAppTag);
      if (!index) {
        classPositions[car.raceAppTag] = [];
      }
      classPositions[car.raceAppTag][car.raceAppTagPosition] = car;
    }
  });
  // console.log('classPositions %o', classPositions);

  /*
  if (Object.keys(classPositions).length > 0) {
    const carsBehind = trackOrder(api.rows(), me, classPositions['PLATIN'][1]);
    console.log('Track position: ', carsBehind);
  } else {
    console.warn('WFT');
  }
  */

  const order = trackOrder(api.rows());

  // loop thru the rows again, now use our classPositions array to calculate the gap to car one place ahead in the class
  api.rows().every(function (rowIdx, tableLoop, rowLoop) {
    // console.log(rowIdx, tableLoop, rowLoop);
    const car = this.data();

    let gap = '-';
    let relTrackPos = '-'
    if (car.raceAppTag) {
      if (car.raceAppTagPosition === 1) {
        // this is the class leader
        gap = 'Class Lead';
        relTrackPos = ''; // this appears if they're Class Lead for Traffic
      } else {
        if (car.gapToLeader) {
          gap = gapAsSeconds(car, classPositions[car.raceAppTag][car.raceAppTagPosition - 1]);
        }
        // The -1 at the end of the Line below works for positive values but not negative ones. Works for the most part but needs addressing.
        relTrackPos = Math.abs(trackPosition(order, car, classPositions[car.raceAppTag][car.raceAppTagPosition - 1]))-1;
      }
    }
    this.data().gapToClassTarget = gap + ' <i class="fa-solid fa-car text-secondary"></i> ' + relTrackPos + '';
    this.invalidate();
  });

  // ===============
  const leaders = [];
  api.rows().every(function (rowIdx, tableLoop, rowLoop) {
    const car = this.data();
    // console.log(car);
    if (car.isPlayer) {
      console.log('I am ' + car.currentDriver_FullName);
    }

    // actually this is always the first row!
    /*
    if (car.racePosition === 1) {
      console.log(`${car.currentDriver_FullName} is the leader`);
    }
    */

    if (car.raceAppTag && car.raceAppTagPosition === 1 && car.gapToLeader) {
      // console.log(car.currentDriver_FullName + ' is the ' + car.raceAppTag + ' leader');
      const g = car.gapToLeader.split(':'); // separate mins and secs
      // leaders[car.raceAppTag] = { 'id': car.id, 'gapToLeader': moment.duration({ m: g[0], s: g[1] }) };
      leaders[car.raceAppTag] = { 'id': car.id, 'gapToLeader': car.gapToLeader };
    }
  });

  // console.log('Class leaders: ', leaders);
  api.rows().every(function (rowIdx, tableLoop, rowLoop) {
    if (leaderboard.series) {
      let s;
      const car = this.data();
      console.log(leaderboard);
      switch (car.driverCategory) {
        case 0:
          s = 'BRONZE';
          break;
        case 1:
          s = 'SILVER';
          break;
        case 2:
          s = 'GOLD';
          break;
        default:
          s = 'PLATIN';
      }
      let pos = leaderboard.series.getPosition(s, car.raceNumber);
      const pts = leaderboard.series.getPoints(car.raceNumber);

      console.log('car position is %i', pos);

      this.data().raceAppByTagChampionshipPosition = pos;
      this.data().raceAppByTagChampionshipTotalPoints = pts;

      let ptsPredicted = 0;
      if (pos) {
        ptsPredicted = leaderboard.series.ScoreTable.RaceScore[pos -1].Points;
      } else {
        pos =  'N/A';
      }
      this.data().raceAppByTagChampionshipPredictedPoints = pts + ptsPredicted;
      this.invalidate();
    }
  });

  /*
  api.rows().every(function (rowIdx, tableLoop, rowLoop) {
    const car = this.data();
    let gap;

    // console.log(car);

    // exclude cars that are not in any class or are missing 'gapToLeader' or are themselves a leader
    if (car.raceAppTag && car.gapToLeader) {
      if (car.raceAppTagPosition !== 1) {
        const myClass = car.raceAppTag;
        const myGapToLeader = moment.duration("00:" + car.gapToLeader).as('milliseconds');
        const classLeaderGap = moment.duration("00:" + leaders[myClass].gapToLeader).as('milliseconds');
        // console.log(classLeaderGap);
        const gapToClassLeader = moment.duration({ 'milliseconds': myGapToLeader - classLeaderGap });
        //console.log(gapToClassLeader);
        console.log(car.raceAppTag + ' leader is ' + gapToClassLeader.as('seconds') + 's ahead of ' + car.currentDriver_FullName);
        gap = gapToClassLeader.as('seconds');
      } else {
        console.log(car.currentDriver_FullName + ' is leading in class ' + car.raceAppTag);
        gap = 0;
      }
    } else {
      gap = '-';
    }

    this.data().gapToClassLeader = gap;
    this.invalidate();
  });
  */

  // lastDriveThroughTime   =   time driving through, stopping and exiting the pit lane
  // gapToLeader
}

/**
 *
 * @param {*} car1
 * @param {*} car2
 * @returns
 */
function gapAsSeconds(car1, car2) {
  if (!car2.hasOwnProperty('gapToLeader')) {
    return '-';
  }
  const car1GapToLeader = moment.duration("00:" + car1.gapToLeader).as('milliseconds');
  const car2GapToLeader = moment.duration("00:" + car2.gapToLeader).as('milliseconds');
  const gapMs = moment.duration({ 'milliseconds': car1GapToLeader - car2GapToLeader });
  // console.log(car1.currentDriver_FullName + ' leads ' + car2.currentDriver_FullName) + ' by ' + gapMs.as('seconds');

  return gapMs.as('seconds');
}

/**
 * put all the cars into their order on the track based on splinePosition property
 * @param {*} dtRows
 * @returns
 */
function trackOrder(dtRows) {
  const order = [];
  dtRows.every(function (rowId, tableLoop, rowLoop) {
    const car = this.data();
    order.push(car);
  });

  order.sort((a, b) => a.splinePosition - b.splinePosition);
  return order;
}

/**
 * calc number of cars on track between two given cars
 * @param {*} trackOrder
 * @param {*} car1
 * @param {*} car2
 * @returns
 */
function trackPosition(trackOrder, car1, car2) {
  const car1trackPosition = trackOrder.findIndex((element) => element.id === car1.id);
  const car2trackPosition = trackOrder.findIndex((element) => element.id === car2.id);

  // console.log(trackOrder);
  return car2trackPosition - car1trackPosition;

}
