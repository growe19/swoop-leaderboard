/**
 *
 * @param {*} row
 * @param {*} data
 */
export default function highlight(row, data) {
  /*
    The URL '&showme' parameter is comma separated Race Numbers of Drivers you want to see inverted in the table
  */
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const showMe = urlParams.get('showme');

  console.log('showMe: ', showMe);

  const match = showMe.split(',');
  raceNumbers.forEach(raceNum => {
    if (raceNum === data.raceNumber) {
      $(row).addClass('bg-light text-dark');
    }
  });
  /*
  for (var a in match) {
    const variable = match[a]
    if (data.raceNumber === variable) {
      $(row).addClass('bg-light text-dark');
    }
  }
  */
}
