import { getRaceAppCarWithResults, formatChildRow } from "./modules/getRaceAppCarWithResults.js";
import loadlink from "./modules/loadlink.js";
import makeDataTable from "./modules/makeDataTable.js";

import Series from "./classes/series.js";

// Global var to track shown child rows
var openChildRows = [];
var start = new Date();

const queryString = window.location.search;
console.log('Found the parameters that the User has set: %s', queryString);
const urlParams = new URLSearchParams(queryString);
const colOrderURLParam = urlParams.get('order');
const mode = urlParams.get('mode');
// const showMe = urlParams.get('showme');
const refresh = parseInt(urlParams.get('refresh') ?? 1000);
const raceAppTag = urlParams.get('raceAppTag') ?? 'SILVER';

// hide could be empty, have a single value or a comma separated list
const hide = urlParams.get('hide') ?? '';
const hiddenCols = hide.split(',').map(function(item) {
  if (item) {
    return parseInt(item, 10);
  }
});

const classFiltering = urlParams.get('class');

const leaderboard = {};

$(document).ready(function() {
  console.log('Mode: %s', mode);
  console.log('Column Ordering by Column ID: %s', colOrderURLParam);

  // if mode is not set bounce over to a default configuration with LIVE data source
  if (mode === null) {
    window.open('https://' + location.host + location.pathname + "?mode=live&hide=0&order=1&class=&showme=&refresh=2500","_self")
  }

  let driverURL = '';
  let sessionURL = '';

  // set up the data sources based on the given "mode"
  if ( mode === 'dev') {
    driverURL = 'http://localhost:8000/AccTest/Allcars';
    sessionURL = 'http://localhost:8000/AccTest/GetSessionInfos';
  } else if ( mode === 'ip') {
    var ipAddress = window.prompt("Please enter the IP address of your Host machine running SimHub and the SwoopAPI:");
    driverURL = 'http://'+ ipAddress+':8000/Acc/Allcars';
    sessionURL = 'http://'+ ipAddress+':8000/Acc/GetSessionInfos';
  } else if ( mode === 'static') {
    driverURL = 'AllCarsNew.json';
    sessionURL = 'SessionInfoNew.json';

    console.log('Sourcing static data from GitHub');
  } else {
    driverURL = 'http://localhost:8000/Acc/Allcars';
    sessionURL = 'http://localhost:8000/Acc/GetSessionInfos';
  }

  // get the session data exposed by SimHub
  var sessionDataPromise = getSessionData(sessionURL);
  sessionDataPromise.then((data) => {
    const sessionData = data;
    $('#trackNameLoad').html(sessionData.track);
		$('#sessionRemainLoad').html(sessionData.sessionTimeLeft);

    // Add event listener for opening and closing details in the child row
    $('body').on(
      'click',
      'td.dt-control',
      { 'raceAppSerieId': sessionData.raceAppSerieId },
      dt_control_click_handler
    );

    // get the details of this RaceApp Series
    fetch(`raceApp/series.php?seriesId=${sessionData.raceAppSerieId}`)
    .then(response => {
      // console.log(response);
      if (response.status === 200) {
        return response.json();
      } else {
        // reject?
      }
    })
    .then(data => leaderboard.series = new Series(data, raceAppTag)) // convert to Series object and store in global
    .catch((error) => console.error('Error: ', error)); // unlikely since any response is a success
  });

  /**
   * create the Data Table
   */
  var table = makeDataTable(driverURL, colOrderURLParam);

  // run whenever table is drawn including AJAX reloads
  table.on('draw', function () {
    // fire a click event for each row stored in the openChildRows array
    $.each(openChildRows, function (i, id) {
      $('#' + id + ' td.dt-control').trigger('click');
    });
  });

  // hide any columns that were specified on the URL
  console.log('Hiding Columns: %o', hiddenCols);
  table.columns(hiddenCols).visible(false);

  // classFiltering
  document.getElementById("myText").value = classFiltering;
  table.columns(36).search($('#myText').val()).draw(); // UPDATE TARGET COLUMN

  // set an event handler to add child rows each time the table is drawn
  // table.on('draw', populateShownChildRows);

  // refresh the content periodically
  setInterval(function() {
    table.ajax.reload();

    // inject the circuit name and session clock
    loadlink(sessionURL, mode, start);
  }, refresh ); // reload rate can be set as a URL param

  /**
   * after a short delay see what data we got in leaderboard.series
   */
  setTimeout(function() {
    // console.log('Standings: %o', leaderboard.series.Competitors.sort((a,b) => a.Pts - b.Pts));
    // console.log('SILVER results: %o', leaderboard.series.filterResultsByTag());
    // console.log('Car for driver 8071: %o', leaderboard.series.findCar(8071));

    console.log('Events %o', leaderboard.series.Events);
    console.log(leaderboard);
    leaderboard.series.standings();
  }, 5000)
}); // end of $(document).ready(function () {

/**
 *
 * @param {Event} e
 */
function dt_control_click_handler(e) {
  e.preventDefault();
  // connect to table API
  const table = $('#leaderboard').DataTable();
  // get data passed via bind
  console.log(e.data);
  const raceAppSerieId = e.data.raceAppSerieId;

  // extract the carId from the row
  const $tr = $(this).closest('tr');
  const row = table.row($tr);
  const carId = parseInt(row.data()['id']);

  if (row.child.isShown()) {
    if (mode === 'static') {
      console.log('close child row %i', carId);
    }

    // This row is already open - close it
    row.child.hide();
    $tr.removeClass('shown');
    $('#DescModal').modal('hide'); // not a clue what this is needed for, doesn't seem to do anything

    // remove from the collection of open child rows
    openChildRows = openChildRows.filter(e => e !== carId);
  } else {
    if (mode === 'static') {
      console.log('open child row %i', carId);
    }

    // add to collection of open child rows
    if (!openChildRows.includes(carId)) {
      openChildRows.push(carId);
    }

    // get the extended data for this car, inject into the child row and open
    getRaceAppCarWithResults(raceAppSerieId, carId, mode)
      .then(data => {
        const html = formatChildRow(data, row.data());
        row.child(html).show();
        $tr.addClass('shown');

        // testing out adding modal
        //$('#DescModal').modal('show')
      })
      .catch(error => {
        console.error('Error:', error);
        row.child('No data available').show();
        $tr.addClass('shown');
      });
  }
  console.log(openChildRows);
}

/**
 * return a promise to get the SimHub session data
 * @param {string} sessionURL
 * @returns {Promise}
 */
async function getSessionData (sessionURL) {
  const response = await fetch(sessionURL);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.error}`);
  }

  const data = await response.json();
  return data;
}

export default leaderboard;
