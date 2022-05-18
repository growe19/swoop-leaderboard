/**
 * See https://datatables.net/reference/option/drawCallback
 *
 * @param {Object} settings see https://datatables.net/reference/type/DataTables.Settings
 */
export default function drawCallback(settings) {
  const api = this.api();
  const tabledata = api.rows({ 'page': 'current' }).data();
  console.log(tabledata);

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
    console.log(car);
    if (car.isPlayer) {
      console.log("hello me");
    }

    // actually this is always the first row!
    if (car.racePosition === 1) {
      console.log(`${car.currentDriver_FullName} is the leader`);
    }

    if (car.raceAppTag && car.raceAppTagPosition === 1) {
      // console.log(car.currentDriver_FullName + ' is the ' + car.raceAppTag + ' leader');
      leaders[car.raceAppTag] = car.id;
    }
  });

  console.log('Class leaders: ', leaders);
  // lastDriveThroughTime   =   time driving through, stopping and exiting the pit lane
  // gapToLeader
}
