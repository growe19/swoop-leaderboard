/**
 *
 * @param {*} data
 * @param {*} type
 * @param {*} row
 * @returns {string} HTML
 */
export default function sector(data, type, row) {
    var splinePercent = row['splinePosition'] * 100 ;
    /*
    var notMoving = row['isPiting'];
    var isItMe = row['isPlayer'];
    var sectOne = row['currentSector1Status'];
    var sectTwo = row['currentSector2Status'];
    var sectThree = row['currentSector3Status'];
    */

    var sectOneCol = "";
    var sectTwoCol = "";
    var sectThreeCol = "";

    // TODO: this is ugly
    if ( row['currentSector1Status'] == '0') { sectOneCol = '292b2c';}
    else if ( row['currentSector1Status'] == '1') { sectOneCol = 'd9534f';}
    else if ( row['currentSector1Status'] == '2') { sectOneCol = 'f0ad4e';}
    else if ( row['currentSector1Status'] == '3') { sectOneCol = '5cb85c';}
    else { sectOneCol = '7951a8';} //4

    if ( row['currentSector2Status'] == '0') { sectTwoCol = '292b2c';}
    else if ( row['currentSector2Status'] == '1') { sectTwoCol = 'd9534f';}
    else if ( row['currentSector2Status'] == '2') { sectTwoCol = 'f0ad4e';}
    else if ( row['currentSector2Status'] == '3') { sectTwoCol = '5cb85c';}
    else { sectOneCol = '7951a8';} //4

    if ( row['currentSector3Status'] == '0') { sectThreeCol = '292b2c';}
    else if ( row['currentSector3Status'] == '1') { sectThreeCol = 'd9534f';}
    else if ( row['currentSector3Status'] == '2') { sectThreeCol = 'f0ad4e';}
    else if ( row['currentSector3Status'] == '3') { sectThreeCol = '5cb85c';}
    else { sectOneCol = '7951a8';} //4

    /*
    None = 0,
    Invalid = 1,
    Slower = 2,
    Best = 3,
    OverallBest = 4
    */

    if (type === 'display') {
        if (row['isPiting']) {
          return `<div class="progress_bar" style="width: 300px;">
              <div class="pro-bar">
                <span class="progress-bar-inner" style="background-color: #d9534f; width: ${Math.trunc(splinePercent)}%;" data-value="${Math.trunc(splinePercent)}" data-percentage-value="${Math.trunc(splinePercent)}">
                </span>
              </div>
            </div>`;
        } else {
          return `<div class="progress_bar" style="width: 300px;">
              <div class="pro-bar">
                <span class="progress-bar-inner" style="background-color: #5cb85c; width: ${Math.trunc(splinePercent)}%;" data-value="${Math.trunc(splinePercent)}" data-percentage-value="${Math.trunc(splinePercent)}">
                </span>
              </div>
            </div>`;
        }
    } else {
      // for sorting
      return row['splinePosition'];
    }
  }