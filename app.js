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
import pgsbBadge from "./modules/pgsb-badges.js";
import sector from "./modules/sector.js";
import serie_badge from "./modules/serie.js";
import stripZero from "./modules/stripZero.js";
import render_trophy from "./modules/trophys.js";

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

// hide could be empty, have a single value or a comma separated list
const hide = urlParams.get('hide') ?? '';
const hiddenCols = hide.split(',').map(function(item) {
  if (item) {
    return parseInt(item, 10);
  }
});

const classFiltering = urlParams.get('class');

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
      'dataType': 'json',
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

    $('#trackNameLoad').html(sessionData.track);
		$('#sessionRemainLoad').html(sessionData.sessionTimeLeft);

    return sessionData;
  })();

  if (mode === 'static') {
    customLogging(driverURL, driverData, sessionURL, sessionData);
  }

  // append the driverData as a property of the sessionData
  // sessionData.cars = driverData;


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
        'columns': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
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
    'ordering': true, // Column ordering is allowed
    'paging': false, // Paging turned off so that all Drivers appear on one page
    'processing': false, // Need to test this to see how it works
    'rowId': 'id', // use the 'id' property as the identifier of each <tr>
    'scrollX': true, // Scrolling allowed as there are so many columns
    'searching': true, // Searching is allowed
    'searchBuilder': {},
    'select': false,
    'stateSave': true, // Saving the layout of the table, columns and search etc.
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
      
       { // This is the FIX for currentDriver_ShortName 
        'data': 'currentDriver_LasttName',
        'render': function (data, type, row) {
          // return data.slice(0, 3);
		return data.slice(0, 3).toUpperCase();
        }
      // .slice(0, 3);
      },
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
      { 'data': 'currentDriver_FirstName',
        'render': function (data, type, row) {
          return data[0].toUpperCase();
        }
      },
      {
        // column 10
        'data': 'currentDriver_LasttName'
     ,
        'render': function (data, type, row) {
          return data[0].toUpperCase();
        }
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
        // column 20 - progress bar based on spline
        'data': 'splinePosition',
        'defaultContent': '',
        'render': sector
      },
      {
        // gap to car ahead
        'data': 'gap',
        'defaultContent': '',
        'render': function ( data, type, row ) {
          var timeFormatA = data;
          var carLocation = row['isPitingLetter'];

          if (carLocation === "P") {
            return "<span class='text-primary'>IN PIT</span>";
          }
          return timeFormatA;
        }
      },
      {
        // gapToLeader
        'data': 'gapToLeader',
        'defaultContent': '',
        "render": function ( data, type, row ) {
          const timeFormatB = data;
          if (timeFormatB === null) {
            return timeFormatB;
          }
          // TODO: I have no idea what this is supposed to achieve!
          return timeFormatB.replace(/'/g, '.');
        },
       },
      { 'data': 'lastLapTime' },
      { 'data': 'lastLapSector1' },
      {
        // column 25
        'data': 'lastLapSector2'
      },
      { 'data': 'lastLapSector3' },
      {
        // this is the bestLapTime column but needs processing on it for IS GLOBAL BEST
        'data': null,
        'defaultContent': '',
        'render': function (data, type, row) {
          const bestTime = row['bestLapTime'];
          const areYouTheBest = row['haveAllBestLapTime'];
          let bestMarker;

          // highlight if you are the best overall
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
       },
      { 'data': 'bestSector1' },
      { 'data': 'bestSector2' },
      { 'data': 'bestSector3' }, // column 30
      {
        'data': 'deltaFromBestLap',
      },
      { 'data': 'deltaFromAllCarsBestLap' },
      {
        // Pit Stop Count
        'data': 'pitStopCount',
        'defaultContent': '',
        'render': function ( data, type, row ) {
          const areTheyPitting = row['isPiting'];
          let pitColMsg = '';

          if (type === 'display') {
            if (areTheyPitting) {
              pitColMsg = data + 1;
            } else {
              pitColMsg = data;
            }
            return pitColMsg;
          } else {
            return data;
          }
        }
      },
      {
        // when did we achieve our best lap?
        'data': 'lapsFromLastPitStop',
      },
      {
        // column 35 - time in pit lane
        'data': 'inPitSince'
      },
	    {
        'data': 'positionIfPiting.racePosition'
	//	'data': 'racePosition',
       //  return data;
      },
      {
        'data': "raceAppTag" ,
        'render': pgsbBadge
      },
      {
        // position in class
        'data': 'raceAppTagPosition',
        'render': stripZero
      },
      {
        // Gap to car ahear within RaceApp Class -- we calculate this in drawCallback once all data is available
        'data': 'gapToClassTarget',
        'defaultContent': ''
      },
      {
        'data': 'raceAppByTagChampionshipPosition',
        'render': render_trophy
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
        'targets': [ 4,6,8,9,10,12,13,16,22,24,25,26,28,29,30,31,32,34,40 ]
      },
      {
        'searchBuilderTitle': 'RaceApp.eu Driver Tag (Class)',
        'targets': 37
      },
      {
        'searchBuilderTitle': 'RaceApp.eu Position within Driver Tag (Class)',
        'targets': 38
      }
    ],
    'createdRow': highlight,
    /* this is the code for indicating where you'll exit the pits in the leaderboard */
    'drawCallback': drawCallback
  }); // End of DataTable definition

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
  table.columns(37).search($('#myText').val()).draw(); // UPDATE TARGET COLUMN

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

  // set an event handler to add child rows each time the table is drawn
  // table.on('draw', populateShownChildRows);

  // refresh the content periodically
  setInterval(function() {
    table.ajax.reload();

    // inject the circuit name and session clock
    loadlink(sessionURL, mode, start);
  }, refresh ); // reload rate can be set as a URL param
}); // end of $(document).ready(function () {

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
