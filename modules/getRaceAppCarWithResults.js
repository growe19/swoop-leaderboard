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

	//const prom = $.get(url, params, null, 'json')
  const response = await fetch(url);

  return response.json();
}

/**
 *
 * @param {Object} response
 * @param {Object} d
 * @returns HTML string
 */
export function formatChildRow(response, d) {
  if (response && response.hasOwnProperty('results')) {
    console.log(response.results);
    // const tableBody = $('#tblBody'+ d.raceNumber);
    var resultsRA = [];
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
  }

  const cpos = moment.localeData().ordinal(d.raceAppByTagChampionshipPosition);
  const best = moment.localeData().ordinal(d.raceAppByTagBestResult);
  const results = resultsRA.join();

  const r = `<p>${d.raceNumber} ${d.currentDriver_FullName}</p>
    <p>Currently ${cpos} in ${d.raceAppTag} with ${d.raceAppByTagChampionshipTotalPoints} points</p>
    <p>Best Finish: ${best}</p>
    <table id="resultsDriver${d.raceNumber}" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;width=500px">
      <thead>
        <tr>
          <th>Event</th>
          <th>Overall Position</th>
          <th>Class Position</th>
          <th>Points</th>
          <th>Penalties</th>
        </tr>
      </thead>
      <tbody id="tblbody${d.raceNumber}">
        ${results}
      </tbody>
    </table>`;

  return r;
}