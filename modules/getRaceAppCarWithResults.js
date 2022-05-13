/**
 *
 * @param {*} raceAppSerieId
 * @param {*} carNumber
 * @param {*} mode
 * @returns {Promise}
 */
export default async function getRaceAppCarWithResults(raceAppSerieId, carId, mode) {
  let url = `http://localhost:8000/Acc/GetRaceAppCarWithResults/${raceAppSerieId}/${carId}`;
	if (mode === 'static') {
		url = `seriesId${raceAppSerieId}carId${carId}.json`;
	}
	const params = {};

	//const prom = $.get(url, params, null, 'json')
  const response = await fetch(url);

  return response.json();
}