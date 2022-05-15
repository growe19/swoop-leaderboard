import carbrand from "./modules/carBrand.js";
import colVis from "./modules/colVis.js";
import cup_badge from "./modules/cup.js";
import drawCallback from "./modules/drawCallback.js";
import driverCategory from "./modules/driverCategory.js";
import render_flag from "./modules/flags.js";
import { getRaceAppCarWithResults, formatChildRow } from "./modules/getRaceAppCarWithResults.js";
import highlight from "./modules/highlight.js";
import loadlink from "./modules/loadlink.js";
import movement from "./modules/movement.js";
import sector from "./modules/sector.js";
import serie_badge from "./modules/serie.js";
import render_trophy from "./modules/trophys.js";

// Global var to track shown child rows
var openChildRows = [];
var start = new Date();

const queryString = window.location.search;
console.log('Found the parameters that the User has set: %s', queryString);
const urlParams = new URLSearchParams(queryString);
const colOrderURLParam = urlParams.get('order');
const mode = urlParams.get('mode');
const showMe = urlParams.get('showme');
const refresh = parseInt(urlParams.get('refresh') ?? 1000);

const hiddenCols = urlParams.get('hide').split(',');
const classFiltering = urlParams.get('class');

$(document).ready(function() {
  console.log('Mode: %s', mode);
  console.log('Column Ordering by Column ID: %s', colOrderURLParam);

  // Check to see if there are any parameters set and if there are not then load the default string
  if (mode == null) {
    window.open('https://' + location.host + location.pathname + "?mode=live&hide=0&order=1&class=&showme=&refresh=2500","_self")
  }

  let driverURL = '';
  let sessionURL = '';

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

  // Combine two data sets into one
  //var driverURL =	"http://localhost:8000/Acc/Allcars";
  //var sessionURL = "http://localhost:8000/Acc/GetSessionInfos";
  // URL are set above in the IF

  var driverData = (function () {
    let driverData = {};
    $.ajax({
      'async': false,
      'global': false,
      'url': driverURL,
      'dataType': "json",
      'success': function (data) {
        driverData = data;
      }
    });
    return driverData;
  })();

  // TODO: review this part ... it works but causes page to load slowly
  var sessionData = (function () {
    let sessionData = {};
    $.ajax({
      'async': false,
      'global': false,
      'url': sessionURL,
      'dataType': "json",
      'success': function (data) {
        sessionData = data;
      }
    });

    // simulate a count down for static
    if (mode === 'static') {
      const DURATION = 60 * 60 * 1000;
      const now = new Date();
      const elapsed = now - start;
      const remain = DURATION - elapsed;
      sessionData.sessionTimeLeft = new Date(1995, 1, 1, 0, 0, remain).toTimeString();
    }
    return sessionData;
  })();

  if (mode === 'static') {
    customLogging(driverURL, driverData, sessionURL, sessionData);
  }

  // append the driverData as a property of the sessionData
  sessionData.cars = driverData;


  /* Datatable Configuration
  ================================================== */
  const $dt = $('#leaderboard');
  if ($dt.length !== 1) {
    console.error('Missing table element');
    return false;
  }

  console.log('Data Table definition');
  const table = $dt.DataTable({
    'ajax': {
      'url': driverURL, // Source set from the ?mode= parameter in the URL. Current options are 'live' or 'ip'
      'dataSrc': ''
    },
    'buttons': [
      {
        extend: 'searchBuilder',
        config: {},
      },
      {
        text: 'Clear Conditions',
        action: function ( e, dt, node, config ) {
          $('#example').DataTable().searchBuilder.rebuild();
        }
      },
      {
        'extend': 'colvis',
        /*
        columnText: function ( dt, idx, title ) {
          return (idx)+': '+title;
        },
        */
        'collectionLayout': 'fixed columns', //three-column // fixed columns
        'collectionTitle': '<span class="text-dark"><h3>Column Visibility Control</h3></span>',
        'text': 'Column Visibility',

        // IF NEW COLUMNS ARE ADDED DON'T FORGET TO ADD THE NUMBER HERE
        'columns': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43],
        'columnText': colVis
      },
      {
        extend: 'savedStatesCreate',
        text: 'Saved Layouts',
        collectionLayout: 'fixed columns',
        collectionTitle: '<span class="text-dark"><h3>Manage Saved Table Layouts</h3></span>',
      },
      {
        text: 'Order by Track Pos.',
        action: function (e, dt, node, config) {
          table.order([[1, 'asc']]).draw();
        }
      },
      {
        extend: 'colvisGroup',
        text: 'Show All Columns',
        show: ':hidden'
      },
      {
        extend: 'collection',
        text: 'Export',
        titleAttr: 'Exports all Columns but only visible rows.',
        buttons: [
          'copy',
          'excel',
          {
            extend: 'pdfHtml5',
            text: 'PDF',
            orientation: 'landscape',
            pageSize: 'A2',
            pageMargins: [ 20, 50, 20, 50 ], // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
          },
        ]
      },
    ], // End of buttons
    "colReorder": false, 	// Reordering of Columsn doesn't work when you have spanned headings
    'dom': 'Bfrtip',
    'fixedHeader': {
      'header': false,
      'headerOffset': $('#navbar').outerHeight()
    },
    'info': false,		// Info turned off, I got bored of this
    'language': {
      'searchBuilder': {
        button: 'Conditional Filtering',
        add: 'Add Condition',
        condition: 'Condition',
        clearAll: 'Clear All Conditions',
        delete: 'Delete Condition',
        deleteTitle: 'Delete Title',
        data: 'Column',
        left: 'Remove Nested Condition',
        //leftTitle: 'Left Title',
        logicAnd: 'AND',
        logicOr: 'OR',
        right: 'Add Nested Condition',
        //rightTitle: 'Right Title',
        title: {
            0: 'Conditional Filtering',
            _: 'Filters applied to Drivers Table ( %d )'
        },
        value: 'Option',
        valueJoiner: 'et'
      },
      "zeroRecords": "No Drivers Found",
      "info": "Showing _MAX_ Drivers",
      "infoEmpty": "No Drivers Found",
      "search": "Quick Global Filter",
    },
    'ordering': true,		// Column ordering is allowed
    'paging': false,		// Paging turned off so that all Drivers appear on one page
    'processing': false, 	// Need to test this to see how it works
    'rowId': 'id', // user the 'id' property as the identifier of each <tr>
    'scrollX': true,		// Scrolling allowed as there are so many columns
    'searching': true,		// Searching is allowed
    'searchBuilder': {},
    'select': false,
    'stateSave': true,		// Saving the layout of the table, columns and search etc.
    'order': [colOrderURLParam, 'asc'],
    'columns': [
      {
        // This column is for the child expanding data
        "className": 'dt-control',
        "data": null,
        "defaultContent": '',
        'orderable': false
      },
      { 'data': 'racePosition' },
      { 'data': 'gridPosition' },
      {
        'data': 'movements',
        'render': movement
      },
      { 'data': 'currentDriver_ShortName' },
      {
        // column 5
        'data': 'currentDriver_NationalityNumber',
        'render': render_flag
      },
      {
        'data': 'currentDriver_Nationality',
        'render': function (data, type, row) {
          if (data == "Any" || data == null || data == "" ) {
            return "";
          }

          return data.replace(/[A-Z]/g, ' $&').trim();
        },
      },
      { 'data': 'raceNumber' },
      {
        'data': 'currentDriver_FullName',
        'render': function (data, type, row) {
          return data.toUpperCase();
        }
      },
      { 'data': 'currentDriver_FirstName'	},
      {
        // column 10
        'data': 'currentDriver_LasttName'
      },
      {
        'data': 'driverCategory',
        'render': driverCategory
      },
      { 'data': 'teamName' },
      {
        'data': 'teamNationalityNumber',
        'render': render_flag,
      },
      {
        'data': 'carBrand',
        'render': carbrand
      },
      {
        // column 15
        'data': 'carBrand'
      },
      { 'data': 'carName' },
      {
        'data': 'serie',
        'render': serie_badge
      },
      { "data": "cupCategory" ,
        "render": cup_badge
      },
      { 'data': 'laps' },
      {
        // column 20 - progress bar
        'data': null,
        'defaultContent': ''
      },
      { 'data': null,"defaultContent": '' }, // gap
      { 'data': null,"defaultContent": '' }, // gapToLeader
      { 'data': 'lastLapTime' },
      { 'data': 'lastLapSector1' },
      {
        // column 25
        'data': 'lastLapSector2'
      },
      { 'data': 'lastLapSector3' },
      { 'data': null,"defaultContent": '' }, // this is the bestLapTime column but needs processing on it for IS GLOBAL BEST
      { 'data': 'bestSector1' },
      { 'data': 'bestSector2' },
      { 'data': 'bestSector3' }, // column 30
      { 'data': null,"defaultContent": '' }, // deltaFromBestLap
      { 'data': null,"defaultContent": '' }, // deltaFromAllCarsBestLap
      { 'data': null,"defaultContent": '' }, // Pit Stop Count
      { 'data': null,"defaultContent": '' }, // Laps Ago
      { 'data': 'inPitSince' }, // column 35
      {
        'data': "raceAppTag" ,
        'render': function (data, type, row) {
          if ( row["raceAppTag"] == 'SILVER') {
            return '<span class="badge text-silver badge-outline badge-silver">SILVER</span>';}
          else if ( row["raceAppTag"] == 'BRONZE') {
            return '<span class="badge text-bronze badge-outline badge-bronze">BRONZE</span>';}
          else if ( row["raceAppTag"] == 'GOLD') {
            return '<span class="badge text-gold badge-outline badge-gold">GOLD</span>';}
          else if ( row["raceAppTag"] == 'PLATIN') {
            return '<span class="badge text-platinum badge-outline badge-platinum">PLATINUM</span>';}
          else { return '<span class="badge badge-outline badge-danger">NOT FOUND</span>';}
        }
      },
      { 'data': 'raceAppTagPosition' },
      { 'data': null,"defaultContent": '' }, // Gap within RaceApp Class
      {
        'data': "raceAppByTagChampionshipPosition" ,
        'render': function (data, type, row) {
          if (data === 1) {
            return '1 <i class="fa-solid fa-trophy text-gold"></i>';
          } else if (data === 2) {
            return '2 <i class="fa-solid fa-trophy text-silver"></i>';
          } else if (data === 3) {
            return '3 <i class="fa-solid fa-trophy text-bronze"></i>';
          } else {
            return data;
          }
        }
      },
      { 'data': 'raceAppByTagChampionshipTotalPoints' }, // column 40
      {
        'data': null,
        'render': function (data, type, row) {
          if (type === 'display') {
            const sum1 = row.raceAppByTagChampionshipPosition;
            const sum2 = row.raceAppByTagChampionshipPredictedPosition;
            let positionChange = sum1 - sum2;

            // default = position unchanged
            let championshipChange = "<span class=text-secondary><i class='fa-solid fa-minus'></i></span> 0";

            if (positionChange >= 1) {
              // Position change red, you've dropped places!
              championshipChange = "<span class=text-success><i class='fa-solid fa-chevron-up'></i></span> +" + positionChange;
            } else if (positionChange < 0) {
              // Position change green, you've overtaken cars!
              championshipChange = "<span class=text-danger><i class='fa-solid fa-chevron-down'></i></span> " + positionChange;
            }
            return championshipChange;
          }

          return data;
        }
      },
      {
        // column 42
        'data': 'raceAppByTagChampionshipPredictedPosition',
        'render': render_trophy
      },
      {
        'data': 'raceAppByTagChampionshipPredictedPoints'
      },
    ],
    'columnDefs': [ //  when new columns are added all these need tweaking
      {
        // add a no wrap class to these columns
        'className': 'nowrapping',
        'targets': [ 4,8,9,10,12,13,16,22,24,25,26,28,29,30,31,32,34,38 ]
      },
      {
        'render': sector,
        'targets': 20
      },
      {
        "render": function ( data, type, row ) {
          var timeFormatA = row['gap'];
          var carLocation = row['isPitingLetter'];

	  if (carLocation == "P") {
            return "<span class='text-primary'>IN PIT</span>";
          }
          return timeFormatA;
        },
        "targets": 21 //UPDATE TARGET
      },
      {
        "render": function ( data, type, row ) {
          var timeFormatB = row['gapToLeader'];
          if (timeFormatB == null){
            return timeFormatB;
          }
          return timeFormatB.replace(/'/g, '.');
        },
        "targets": 22 //UPDATE TARGET
      },
      {
        "render": function (data, type, row) {
          const bestTime = row['bestLapTime'];
          const areYouTheBest = row['haveAllBestLapTime'];
          let bestMarker;

          if (type === 'display') {
            if (areYouTheBest >= 1) {
              bestMarker = '<span class="text-purple">' + bestTime + '</span>'; // Global best goes purple!
            } else {
              bestMarker = bestTime;
            }
            return bestMarker;
          }

          return data;
        },
        "targets": 27 //UPDATE TARGET
      },
      {
        "render": function ( data, type, row ) {
          const timeFormatC = row['deltaFromBestLap'];
          if (timeFormatC == null){
            return timeFormatC;
          }
          return timeFormatC.replace(/'/g, '.');
        },
        "targets": 31 //UPDATE TARGET
      },
      {
        "render": function ( data, type, row ) {
          var timeFormatD = row['deltaFromAllCarsBestLap'];
          if (timeFormatD == null){
            return timeFormatD;
          }
          return timeFormatD.replace(/'/g, '.');
        },
        "targets": 32 //UPDATE TARGET
      },
      {
        "render": function ( data, type, row ) {
          const pitStopCountForD = row['pitStopCount'];
          const areTheyPitting = row['isPiting'];
          // const pittingTimer = row['inPitSince'];
          let pitColMsg = '';

          if (type === 'display') {
            if (areTheyPitting >= 1) {
              pitColMsg = pitStopCountForD + 1; // Position change red, you've dropped places!
            } else {
              pitColMsg = pitStopCountForD; // Position change static, you've maintained track position!
            }
            return '' + pitColMsg + '';
          }

          return data;
        },
        "targets": 33 //UPDATE TARGET
      },
      {
        "render": function ( data, type, row ) {
          var lastStopAge = row['lapsFromLastPitStop'];
          return lastStopAge;
        },
        "targets": 34 //UPDATE TARGET
      },
      {
        'searchBuilderTitle': 'RaceApp.eu Driver Tag (Class)',
        'targets': 36
      },
      {
        'searchBuilderTitle': 'RaceApp.eu Position within Driver Tag (Class)',
        'targets': 37
      },
      {
        "render": function ( data, type, row ) {
          return "sum";
          /*
            This is where the code will go to calculate the gap between players in the same RaceApp Class
          */
        },
        "targets": 38
      }
    ],
    'createdRow': highlight,
    /* this is the code for indicating where you'll exit the pits in the leaderboard */
    'drawCallback': drawCallback
  }); // End of DataTable definition

  // run whenever table is drawn including AJAX reloads
  table.on('draw', function () {
    console.log('openChildRows: ', openChildRows);
    $.each(openChildRows, function (i, id) {
      // fire a click event for each row stored in the childRows array
      $('#' + id + ' td.dt-control').trigger('click');
    });
  });

  // console.log(table);

  console.log('Hiding Columns: %s', hiddenCols);
  table.columns(hiddenCols).visible(false);

  // classFiltering
  document.getElementById("myText").value = classFiltering;
  table.columns(36).search($('#myText').val()).draw(); // UPDATE TARGET COLUMN

  // Add event listener for opening and closing details in the child row
  $('body').on(
    'click',
    'td.dt-control',
    { 'raceAppSerieId': sessionData.raceAppSerieId },
    dt_control_click_handler
  );

  // TODO: what is this for? triggers for every button?
  /*
  $('button').on('click', function () {
    // Get shown rows
    childRows = table.rows($('.shown'));
    table.ajax.reload();
  });
  */

  // This adds the bg-dark class to the fixedHeader
  // but fixed header is disabled so don't think this is needed anymore!!!!!!
  const elements = document.getElementsByClassName("sorting");
  for (var i = 0; i < elements.length; i++) {
    elements[i].className += " bg-dark";
  }

  // set an event handler to add child rows each time the table is drawn
  // table.on('draw', populateShownChildRows);

  // refresh the content periodically
  setInterval(function() {
    // make a collection of rows where the child row is open
    const $openRows = $('.shown');
    if ($openRows.length > 0) {
      // populatShownChildRows(table, sessionData.raceAppSerieId);
    }
    // childRows = table.rows(); // Keep column 1 button open/showing if it has been clicked.
    table.ajax.reload();

    // inject the circuit name and session clock
    loadlink(sessionURL, mode, start);
  }, refresh ); // reload rate can be set as a URL param
}); // end of $(document).ready(function () {

/**
 * update content for any open child rows
 */
function populatShownChildRows(table, raceAppSerieId) {
  const childRows = table.rows();
	console.log('populateShownChildRows: %o', childRows);
	// If reloading table then show previously shown rows
	if (childRows) {
		childRows.every(function (rowIdx, tableLoop, rowLoop) {
			// get the table data
			const rowData = this.data();
			// console.log(d);

			format(rowData, raceAppSerieId, table);
		});

		// Reset childRows so loop is not executed each draw
		// childRows = null;
	}
}

/**
 * get previous results for a car
 *
 * @param {object} d car details
 * @param {int} raceAppSerieId
 * @param {DataTable} dataTable
 */
 function format(d, raceAppSerieId, dataTable) {
	let url = 'http://localhost:8000/Acc/GetRaceAppCarWithResults/' + raceAppSerieId + '/' + d.raceNumber;
	if (mode === 'static') {
		url = 'seriesId2666carId63.json';
	}
	const params = {};

	$.get(url, params, null, 'json')
		.done(function (response) {
			console.log(response);
			console.log('carNumber: %i', response.carNumber);
			// assuming "response" has your full JSON you can then dig into the "results" ...
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

			dataTable.child(r);
			// dataTable.nodes().to$().addClass('shown');
		})
		.fail(function (error) {
			console.warn(error);
		});

	// console.log('Results history from:' + url);

	//var my_json_results;

	//	$.getJSON(url, function(json) {
	//	my_json_results = json;
	//	console.log(my_json_results.results);
	//});

	// If this RETURN code isn't here then the page breaks.
	//
	// ERROR: TypeError: Cannot read properties of undefined (reading 'show')
	// This is referring to something on line 1426 ......
	// LINE 1426 : row.child( format(row.data()) ).show();
	//

	//GetResultsData();

	/* Parameters from the Swoop API that are from AllCars

	Historic Results come from /Acc/GetRaceAppCarWithResults/{serieId}/{raceNumber}

	In the string above the {serieId} is actually the raceAppSerieId from /Acc/GetSessionInfos

	"raceAppTag": "string",
	"raceAppTagPosition": 0,
	"raceAppGlobalChampionshipTotalPoints": 0,
	"raceAppGlobalBestResult": 0,
	"raceAppGlobalChampionshipPredictedPoints": 0,
	"raceAppGlobalChampionshipPosition": 0,
	"raceAppGlobalChampionshipPredictedPosition": 0,
	"raceAppByTagChampionshipTotalPoints": 0,
	"raceAppByTagChampionshipPredictedPoints": 0,
	"raceAppByTagChampionshipPosition": 0,
	"raceAppByTagChampionshipPredictedPosition": 0,
	"raceAppByTagBestResult": 0,
	*/
}

/**
 * extra debugging
 * @param {*} driverData
 * @param {*} sessionData
 */
function customLogging(driverURL, driverData, sessionURL, sessionData) {
  console.log('////////// DRIVER DATA //////////');
  console.log(driverData);
  console.log('');
  console.log('////////// DRIVER DATA TYPE //////////');
  console.log(typeof driverData);
  console.log('');
  console.log('');
  console.log('////////// DRIVER URL //////////');
  console.log(driverURL);
  console.log('');
  console.log('////////// DRIVER URL DATA TYPE //////////');
  console.log(typeof driverURL);
  console.log('');
  console.log('');

  console.log('////////// SESSION DATA //////////');
  console.log(sessionData);
  console.log('');
  console.log('////////// SESSION DATA TYPE //////////');
  console.log(typeof sessionData);
  console.log('');
  console.log('');
  console.log('////////// SESSION URL //////////');
  console.log(sessionURL);
  console.log('');
  console.log('////////// SESSION URL DATA TYPE //////////');
  console.log(typeof sessionURL);
  console.log('');

  const appObjects = sessionData;

  console.log('////////// COMBINED DATA //////////');
  console.log(appObjects);
  console.log('');
  console.log('////////// COMBINED DATA TYPE //////////');
  console.log(typeof appObjects);
  console.log('');
  console.log('');
}

/**
 *
 * @param {*} e
 */
function dt_control_click_handler(e) {
  e.preventDefault();
  const table = $('#leaderboard').DataTable();
  console.log(e.data);
  const raceAppSerieId = e.data.raceAppSerieId;

  const $tr = $(this).closest('tr');
  const row = table.row($tr);
  const carId = parseInt(row.data()['id']);

  if (row.child.isShown() ) {
    if (mode === 'static') {
      console.log('close child row %i', carId);
    }

    // This row is already open - close it
    row.child.hide();
    $tr.removeClass('shown');

    // remove from the collection of open child rows
    openChildRows.splice(carId, 0);
  } else {
    if (mode === 'static') {
      console.log('open child row %i', carId);
    }

    // add to collection of open child rows
    if (!openChildRows.includes(carId)) {
      openChildRows.push(carId);
    }

    getRaceAppCarWithResults(raceAppSerieId, carId, mode)
      .then(data => {
        const html = formatChildRow(data, row.data());
        row.child(html).show();
        $tr.addClass('shown');
      })
      .catch(error => {
        console.error('Error:', error);
        row.child('No data available').show();
        $tr.addClass('shown');
      });
  }
  // console.log(openChildRows);
}
