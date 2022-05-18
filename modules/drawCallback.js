/**
 * See https://datatables.net/reference/option/drawCallback
 *
 * @param {Object} settings see https://datatables.net/reference/type/DataTables.Settings
 */
export default function drawCallback(settings) {
  const api = this.api();
  const tabledata = api.rows({ 'page': 'current' }).data();
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
      console.log("hello me");
    }

    // actually this is always the first row!
    if (car.racePosition === 1) {
      console.log(`${car.currentDriver_FullName} is the leader`);
    }

    if (car.raceAppTag && car.raceAppTagPosition === 1 && car.gapToLeader) {
      // console.log(car.currentDriver_FullName + ' is the ' + car.raceAppTag + ' leader');
      const g = car.gapToLeader.split(':'); // separate mins and secs
      leaders[car.raceAppTag] = { 'id': car.id, 'gapToLeader': moment.duration({ m: g[0], s: g[1] }) };
    }
  });

  console.log('Class leaders: ', leaders);

  api.rows().every(function () {
    const car = this.data();

    if (car.raceAppTag && car.gapToLeader) {
      const myClass = car.raceAppTag;
      const myGapToLeader = moment.duration({ m: car.gapToLeader.split(':')[0], s: car.gapToLeader.split(':')[1] });
      const gapToClassLeader = myGapToLeader - leaders[myClass].gapToLeader;
      console.log('Class leader is: ' + gapToClassLeader + ' ahead of ' + car.currentDriver_FullName);
    }
  });
  // lastDriveThroughTime   =   time driving through, stopping and exiting the pit lane
  // gapToLeader
}
