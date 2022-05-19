/**
 *
 * @param {int} raceAppSerieId
 * @param {int} carNumber
 * @param {String} mode
 * @returns {Object} -- could make this a class
 */
export async function getRaceAppCarWithResults(raceAppSerieId, carId, mode) {
  let url = `http://localhost:8000/Acc/GetRaceAppCarWithResults/${raceAppSerieId}/${carId}`;
	if (mode === 'static') {
		url = `seriesId${raceAppSerieId}carId${carId}.json`;
	}

  const response = await fetch(url);

  if (response.ok) {
    return response.json();
  } else {
    const err = new Error("Not 2xx response");
    err.response = response;
    throw err;
  }
}

/**
 *
 * @param {Object} response
 * @param {Object} carInfo
 * @returns HTML string
 */
export function formatChildRow(response, carInfo) {
  if (!response || !response.hasOwnProperty('results')) {
    return '';
  }

  // console.log(response.results, carInfo);
  let resultsRA = [];
  $.each(response.results, function (i, val) {
    const html = `<tr>
      <td>${val.track}</td>
      <td>${val.position}/${val.driverCount}</td>
      <td>${val.positionInClass} </td>  
      <td>${val.points}</td>
      <td>- ${val.penaltyPoints}pts / +${val.penaltySeconds} sec</td>
    </tr>`;

    resultsRA.push(html);

    // append onto the driver row
    // document.getElementById('resultsDriver' + d.raceNumber) === resultsRA.join();
  });

  const results = resultsRA.join();

  // use Moment.js "ordinal" method to add language specific "st / nd / th"
  const cpos = 'unplaced';
  if (carInfo.raceAppByTagChampionshipPosition) {
    cpos = moment.localeData().ordinal(carInfo.raceAppByTagChampionshipPosition);
  }

  const pts = carInfo.raceAppByTagChampionshipTotalPoints ?? '0';
  const race = carInfo.raceAppTag ?? 'any championship';

  const best = '';
  if (carInfo.raceAppByTagBestResult) {
    best = '<p>Best Finish: ' + moment.localeData().ordinal(bestResult) + '</p>';
  }

  const r = `
    <p>Currently ${cpos} in ${race} with ${pts} points</p>
    ${best}
    <table class="table table-sm" id="resultsDriver${carInfo.raceNumber}" style="width=800px">
      <thead>
        <tr>
          <th>Event</th>
          <th>Overall Position</th>
          <th>Class Position</th>
          <th>Points</th>
          <th>Penalties</th>
        </tr>
      </thead>
      <tbody id="tblbody${carInfo.raceNumber}">
        ${results}
      </tbody>
    </table>`;

    $('#modalResultsTable').html(r);
    $('#modalDriver').html(carInfo.currentDriver_FullName);
    $('#modalCarNo').html(carInfo.raceNumber);
  return r;
}