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
	const params = {};

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
      <td>${val.positionInClass}</td>
      <td>${val.points}</td>
      <td>- ${val.penaltyPoints}pts / ${val.penaltySeconds}sec</td>
    </tr>`;

    resultsRA.push(html);

    // append onto the driver row
    // document.getElementById('resultsDriver' + d.raceNumber) === resultsRA.join();
  });

  const results = resultsRA.join();

  // use Moment.js "ordinal" method to add language specific "st / nd / th"
  const champPos = carInfo.raceAppByTagChampionshipPosition ?? '';
  const cpos = moment.localeData().ordinal(champPos);

  const bestResult = carInfo.raceAppByTagBestResult ?? 'n/a';
  const best = moment.localeData().ordinal(bestResult);

  const pts = carInfo.raceAppByTagChampionshipTotalPoints ?? '0';
  const race = carInfo.raceAppTag ?? '';

  const r = `<p>${carInfo.raceNumber} ${carInfo.currentDriver_FullName}</p>
    <p>Currently ${cpos} in ${race} with ${pts} points</p>
    <p>Best Finish: ${best}</p>
    <table id="resultsDriver${carInfo.raceNumber}" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;width=500px">
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

  return r;
}