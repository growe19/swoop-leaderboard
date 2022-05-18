/**
 * See https://datatables.net/reference/option/drawCallback
 *
 * @param {Object} settings see https://datatables.net/reference/type/DataTables.Settings
 */
export default function drawCallback(settings) {
  const api = this.api();
  // const tabledata = api.rows({ 'page': 'current' }).data();
  // console.log(tabledata);

  /**
   * calculate the gap to the class leader
   *    establish the leader in each class and their time gap to the overall leader
   *    for each driver we can now use gapToLeader - classLeaderGapToLeader
   */
  /*
  tabledata.forEach((tableRow) => {
    if (tableRow.isPlayer) {
      console.log("hello me");
    }

    if (tableRow.racePosition === 1) {
      console.log(`${tableRow.currentDriver_FullName} is the leader`);
    }

    console.log(tableRow.class);
  });
  */
  const leaders = [];
  api.rows().every(function (rowIdx, tableLoop, rowLoop) {
    const car = this.data();
    // console.log(car);
    if (car.isPlayer) {
      console.log('I am ' + car.currentDriver_FullName);
    }

    // actually this is always the first row!
    if (car.racePosition === 1) {
      console.log(`${car.currentDriver_FullName} is the leader`);
    }

    if (car.raceAppTag && car.raceAppTagPosition === 1 && car.gapToLeader) {
      // console.log(car.currentDriver_FullName + ' is the ' + car.raceAppTag + ' leader');
      const g = car.gapToLeader.split(':'); // separate mins and secs
      // leaders[car.raceAppTag] = { 'id': car.id, 'gapToLeader': moment.duration({ m: g[0], s: g[1] }) };
      leaders[car.raceAppTag] = { 'id': car.id, 'gapToLeader': car.gapToLeader };
    }
  });

  console.log('Class leaders: ', leaders);

  api.rows().every(function (rowIdx, tableLoop, rowLoop) {
    const car = this.data();
    let gap;

    // api.cells({ 'row': rowIdx, 'column': 38 }).data('simon');
    console.log(car);

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
  // lastDriveThroughTime   =   time driving through, stopping and exiting the pit lane
  // gapToLeader
}
