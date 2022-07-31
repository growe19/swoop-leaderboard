import carbrand from "./carBrand.js";
import colVis from "./colVis.js";
import cup_badge from "./cup.js";
import drawCallback from "./drawCallback.js";
import driverCategory from "./driverCategory.js";
import render_flag from "./flags.js";
import highlight from "./highlight.js";
import movement from "./movement.js";
import pgsbBadge from "./pgsb-badges.js";
import sector from "./sector.js";
import serie_badge from "./serie.js";
import stripZero from "./stripZero.js";
import render_trophy from "./trophys.js";

/**
 *
 * @returns
 */
export default function makeDataTable (driverURL, colOrderURLParam) {
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
        // League Standings section
        'data': 'raceAppByTagChampionshipPosition',
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
        'searchBuilderTitle': 'RaceApp.eu Driver Tag (Class)',
        'targets': 36
    },
    {
        'searchBuilderTitle': 'RaceApp.eu Position within Driver Tag (Class)',
        'targets': 37
    }
    ],
    'createdRow': highlight,
    /* this is the code for indicating where you'll exit the pits in the leaderboard */
    'drawCallback': drawCallback
}); // End of DataTable definition

return table;
}
