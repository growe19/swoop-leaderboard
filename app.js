import loadlink from "./loadlink";

// Global var to track shown child rows
var childRows = null;
var start = new Date();

const queryString = window.location.search;
console.log('Found the parameters that the User has set: %s', queryString);
const urlParams = new URLSearchParams(queryString);
const colOrderURLParam = urlParams.get('order');
const mode = urlParams.get('mode');
const showMe = urlParams.get('showme');
const refresh = parseInt(urlParams.get('refresh') ?? 1000);

const hiddenCols = urlParams.get('hide');
const classFiltering = urlParams.get('class');

$(document).ready(function() {
  console.log('Mode: %s', mode);
  console.log('Column Ordering by Column ID: %s', colOrderURLParam);

  // Check to see if there are any parameters set and if there are not then load the default string
  if (mode == null) {
    window.open('https://' + location.host + location.pathname + "?mode=live&hide=0&order=1&class=&showme=","_self")
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
    driverURL = 'AllCars.json';
    sessionURL = 'SessionInfo.json';

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

//var appObjects = $.extend({}, sessionData, driverData);
//var appObjects = sessionData.concat(driverData);

sessionData.cars = driverData;
var appObjects = sessionData;

console.log('////////// COMBINED DATA //////////');
console.log(appObjects);
console.log('');
console.log('////////// COMBINED DATA TYPE //////////');
console.log(typeof appObjects);
console.log('');
console.log('');

// console.log(appObjects);
// Combine two data sets into one

// console.log(typeof appObjects);

// var appObjectsCleaned = JSON.parse(JSON.stringify(appObjects)); // ERR: still an object
// var appObjectsCleaned = JSON.parse(appObjects); // ERR doesn't work
var appObjectsCleaned = JSON.stringify(appObjects); // converts it all to a string but 404 when loading into table

//sessionData.cars = driverData

console.log(appObjectsCleaned);
// Combine two data sets into one

console.log(typeof appObjectsCleaned);

var appObjectsCleanedAgain = $.parseJSON(appObjectsCleaned);

console.log(appObjectsCleanedAgain);
console.log(typeof appObjectsCleanedAgain);


/* Datatable Configuration
================================================== */
table = $('#example').DataTable({
  dom: 'Bfrtip',
  searchBuilder: {},
  buttons: [
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
      extend: 'colvis',
      columnText: function ( dt, idx, title ) {
        return (idx)+': '+title;
      },
      collectionLayout: 'fixed columns', //three-column // fixed columns
      collectionTitle: '<span class="text-dark"><h3>Column Visibility Control</h3></span>',
      text: 'Column Visibility',

      // IF NEW COLUMNS ARE ADDED DON'T FORGET TO ADD THE NUMBER HERE
      columns : [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43 ],
      columnText: function ( dt, idx, title ) {
        if(idx==0){ return '<small>'+(idx)+': Additional Data +</small>';}
        if(idx==1){ return '<small>'+(idx)+': Track Position</small>';}
        if(idx==2){ return '<small>'+(idx)+': Starting Grid Position</small>';}
        if(idx==3){ return '<small>'+(idx)+': Grid to Track Pos Change</small>';}
        if(idx==4){ return '<small>'+(idx)+': Driver: Short Name</small>';}
        if(idx==5){ return '<small>'+(idx)+': Driver: Nationality Flag</small>';}
        if(idx==6){ return '<small>'+(idx)+': Driver: Nationality Word</small>';}
        if(idx==7){ return '<small>'+(idx)+': Driver: Race Number</small>';}
        if(idx==8){ return '<small>'+(idx)+': Driver: Full Name</small>';}
        if(idx==9){ return '<small>'+(idx)+': Driver: First Name</small>';}
        if(idx==10){ return '<small>'+(idx)+': Driver: Last Name</small>';}
        if(idx==11){ return '<small>'+(idx)+': Driver: Category</small>';}
        if(idx==12){ return '<small>'+(idx)+': Team: Name</small>';}
        if(idx==13){ return '<small>'+(idx)+': Team: Nationality Flag</small>';}
        if(idx==14){ return '<small>'+(idx)+': Car: Logo</small>';}
        if(idx==15){ return '<small>'+(idx)+': Car: Manufacturer</small>';}
        if(idx==16){ return '<small>'+(idx)+': Car: Model</small>';}
        if(idx==17){ return '<small>'+(idx)+': Car: Series</small>';}
        if(idx==18){ return '<small>'+(idx)+': Car: Cup </small>';}
        if(idx==19){ return '<small>'+(idx)+': Lap: Total Count</small>';}
        if(idx==20){ return '<small>'+(idx)+': Lap: Track Progress Bar</small>';}
        if(idx==21){ return '<small>'+(idx)+': Gap: To Driver Ahead</small>';}
        if(idx==22){ return '<small>'+(idx)+': Gap: To Leader</small>';}
        if(idx==23){ return '<small>'+(idx)+': Last Lap: Time</small>';}
        if(idx==24){ return '<small>'+(idx)+': Last Lap: Sector 1</small>';}
        if(idx==25){ return '<small>'+(idx)+': Last Lap: Sector 2</small>';}
        if(idx==26){ return '<small>'+(idx)+': Last Lap: Sector 3</small>';}
        if(idx==27){ return '<small>'+(idx)+': Best Lap: Time</small>';}
        if(idx==28){ return '<small>'+(idx)+': Best Lap: Sector 1</small>';}
        if(idx==29){ return '<small>'+(idx)+': Best Lap: Sector 2</small>';}
        if(idx==30){ return '<small>'+(idx)+': Best Lap: Sector 3</small>';}
        if(idx==31){ return '<small>'+(idx)+': Delta: Driver Best Lap</small>';}
        if(idx==32){ return '<small>'+(idx)+': Delta: All Cars Best Lap</small>';}
        if(idx==33){ return '<small>'+(idx)+': Pit Stop: Count</small>';}
        if(idx==34){ return '<small>'+(idx)+': Pit Stop: Age</small>';}
        if(idx==35){ return '<small>'+(idx)+': Pit Stop: Delta</small>';}
        if(idx==36){ return '<small>'+(idx)+': RaceApp.eu: Tag</small>';}
        if(idx==37){ return '<small>'+(idx)+': RA.eu: Tag Pos #</small>';}
        if(idx==38){ return '<small>'+(idx)+': RA.eu: Tag Gap in Class</small>';}
        if(idx==39){ return '<small>'+(idx)+': RA.eu: Tag Current Champ Pos</small>';}
        if(idx==40){ return '<small>'+(idx)+': RA.eu: Tag Current Champ Pts</small>';}
        if(idx==41){ return '<small>'+(idx)+': RaceApp.eu: Championship Pred Change</small>';}
        if(idx==42){ return '<small>'+(idx)+': RaceApp.eu: Tag Predicted Champ Pos</small>';}
        if(idx==43){ return '<small>'+(idx)+': RaceApp.eu: Tag Predicted Champ Pts</small>';}

                  return (idx)+': ERROR';
              }
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

  "processing": false, 	// Need to test this to see how it works
  "select": false,
  "colReorder": false, 	// Reordering of Columsn doesn't work when you have spanned headings
  "paging": false,		// Paging turned off so that all Drivers appear on one page
  "ordering": true,		// Column ordering is allowed
  "info": false,		// Info turned off, I got bored of this
  "stateSave": true,		// Saving the layout of the table, columns and search etc.
  "searching": true,		// Searching is allowed
  "scrollX": true,		// Scrolling allowed as there are so many columns
  "fixedHeader": {
    header: false,
    headerOffset: $('#navbar').outerHeight()
  },
  "language": {
    searchBuilder: {
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
  "ajax": {
    "url": driverURL, // Source set from the ?mode= parameter in the URL. Current options are 'live' or 'ip'
    "dataSrc": ""
  },
  "columns": [
    {
      "className": 'dt-control',
      "data": null, // This column is for the child expanding data
      "defaultContent": '',
      'orderable': false
    },
    { 'data': 'racePosition' },
    { 'data': 'gridPosition' },
    { "data": "movements" ,
      render: function(data, type) {
        if (type === 'display') {
          let directionMove = "";
            if (data[0] >= '+1' ) {
              directionMove = "<span class=text-danger>&#9660;</span>"; // Position change red, you've dropped places!
            }
            else if (data[0] < '0' ) {
              directionMove = "<span class=text-success>&#9650;</span>"; // Position change green, you've overtaken cars!
            }
            else {
              directionMove = "<span class=text-secondary>&#9655;</span> 0"; // Position change static, you've maintained track position!
            }
          return '' + directionMove + ' ' + data + '';
        }
      return data;
      }
    },
  { 'data': 'currentDriver_ShortName' },
  { "data": "currentDriver_NationalityNumber" ,
        "render": function (data, type, row) {
          if ( row['currentDriver_NationalityNumber'] == '0') { return '';}
          else if ( row['currentDriver_NationalityNumber'] == '1') { return '<span class="fi fi-it"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '2') { return '<span class="fi fi-de"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '3') { return '<span class="fi fi-fr"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '4') { return '<span class="fi fi-es"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '5') { return '<span class="fi fi-gb"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '6') { return '<span class="fi fi-hu"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '7') { return '<span class="fi fi-be"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '8') { return '<span class="fi fi-ch"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '9') { return '<span class="fi fi-at"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '10') { return '<span class="fi fi-ru"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '11') { return '<span class="fi fi-th"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '12') { return '<span class="fi fi-nl"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '13') { return '<span class="fi fi-pl"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '14') { return '<span class="fi fi-ar"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '15') { return '<span class="fi fi-mc"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '16') { return '<span class="fi fi-ie"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '17') { return '<span class="fi fi-br"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '18') { return '<span class="fi fi-za"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '19') { return '<span class="fi fi-pr"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '20') { return '<span class="fi fi-sk"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '21') { return '<span class="fi fi-om"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '22') { return '<span class="fi fi-gr"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '23') { return '<span class="fi fi-sa"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '24') { return '<span class="fi fi-no"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '25') { return '<span class="fi fi-tr"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '26') { return '<span class="fi fi-kr"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '27') { return '<span class="fi fi-lb"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '28') { return '<span class="fi fi-am"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '29') { return '<span class="fi fi-mx"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '30') { return '<span class="fi fi-se"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '31') { return '<span class="fi fi-fi"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '32') { return '<span class="fi fi-dk"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '33') { return '<span class="fi fi-hr"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '34') { return '<span class="fi fi-ca"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '35') { return '<span class="fi fi-cn"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '36') { return '<span class="fi fi-pt"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '37') { return '<span class="fi fi-sg"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '38') { return '<span class="fi fi-id"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '39') { return '<span class="fi fi-us"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '40') { return '<span class="fi fi-nz"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '41') { return '<span class="fi fi-au"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '42') { return '<span class="fi fi-sm"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '43') { return '<span class="fi fi-ae"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '44') { return '<span class="fi fi-lu"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '45') { return '<span class="fi fi-kw"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '46') { return '<span class="fi fi-hk"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '47') { return '<span class="fi fi-co"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '48') { return '<span class="fi fi-jp"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '49') { return '<span class="fi fi-ad"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '50') { return '<span class="fi fi-az"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '51') { return '<span class="fi fi-bg"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '52') { return '<span class="fi fi-cu"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '53') { return '<span class="fi fi-cz"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '54') { return '<span class="fi fi-ee"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '55') { return '<span class="fi fi-ge"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '56') { return '<span class="fi fi-in"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '57') { return '<span class="fi fi-il"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '58') { return '<span class="fi fi-jm"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '59') { return '<span class="fi fi-lv"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '60') { return '<span class="fi fi-lt"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '61') { return '<span class="fi fi-mo"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '62') { return '<span class="fi fi-my"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '63') { return '<span class="fi fi-np"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '64') { return '<span class="fi fi-nc"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '65') { return '<span class="fi fi-ne"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '66') { return '<span class="fi fi-gb-nir"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '67') { return '<span class="fi fi-pg"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '68') { return '<span class="fi fi-ph"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '69') { return '<span class="fi fi-qa"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '70') { return '<span class="fi fi-ro"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '71') { return '<span class="fi fi-gb-sct"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '72') { return '<span class="fi fi-rs"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '73') { return '<span class="fi fi-si"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '74') { return '<span class="fi fi-tw"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '75') { return '<span class="fi fi-ua"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '76') { return '<span class="fi fi-ve"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '77') { return '<span class="fi fi-gb-wls"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '78') { return '<span class="fi fi-ir"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '79') { return '<span class="fi fi-bh"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '80') { return '<span class="fi fi-zw"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '81') { return '<span class="fi fi-xx"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '82') { return '<span class="fi fi-cl"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '83') { return '<span class="fi fi-uy"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '84') { return '<span class="fi fi-mg"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '85') { return '<span class="fi fi-mt"></span>';}
          else if ( row['currentDriver_NationalityNumber'] == '86') { return '<span class="fi fi-gb-eng"></span>';}
          else { return '';}
        }
  },
  { 'data': null,"defaultContent": '' }, // currentDriver_Nationality
  { 'data': 'raceNumber' },
  { 'data': null,"defaultContent": '' }, // currentDriver_FullName
  { 'data': 'currentDriver_FirstName'	},
  { 'data': 'currentDriver_LasttName' },
  { 'data': 'driverCategory' ,
    "render": function (data, type, row) {
      if ( row['driverCategory'] == '0') { return '<span class="badge text-bronze badge-outline badge-bronze">BRONZE</span>';}
      else if ( row['driverCategory'] == '1') { return '<span class="badge text-silver badge-outline badge-silver">SILVER</span>';}
      else if ( row['driverCategory'] == '2') { return '<span class="badge text-gold badge-outline badge-gold">GOLD</span>';}
      else if ( row['driverCategory'] == '3') { return '<span class="badge text-platinum badge-outline badge-platinum">PLATINUM</span>';}
      else { return 'Error';}
    }
  },
  { 'data': 'teamName' },
  { 'data': null,"defaultContent": '' }, // teamNationality
  { "data": "carBrand" ,
        "render": function (data, type, row) {
          if ( row['carBrand'] == 'Mercedes-AMG') { return '<span class="car-mercedes-benz"></span>';}
          else if ( row['carBrand'] == 'Honda') { return '<span class="car-honda"></span>';}
          else if ( row['carBrand'] == 'McLaren') { return '<span class="car-mclaren"></span>';}
          else if ( row['carBrand'] == 'Audi') { return '<span class="car-audi"></span>';}
          else if ( row['carBrand'] == 'Porsche') { return '<span class="car-porsche"></span>';}
          else if ( row['carBrand'] == 'Lamborghini') { return '<span class="car-lamborghini"></span>';}
          else if ( row['carBrand'] == 'Mercedes') { return '<span class="car-mercedes-benz"></span>';}
          else if ( row['carBrand'] == 'Aston') { return '<span class="car-aston-martin"></span>';}
          else if ( row['carBrand'] == 'Lexus') { return '<span class="car-lexus"></span>';}
          else if ( row['carBrand'] == 'BMW') { return '<span class="car-bmw"></span>';}
          else if ( row['carBrand'] == 'Ginetta') { return '';}
          else if ( row['carBrand'] == 'KTM') { return '';}
          else if ( row['carBrand'] == 'Chevrolet') { return '<span class="car-chevrolet"></span>';}
          else if ( row['carBrand'] == 'Alpine') { return '';}
          else if ( row['carBrand'] == 'Maserati') { return '<span class="car-maserati"></span>';}
          else if ( row['carBrand'] == 'Ferrari') { return '<span class="car-ferrari"></span>';}
          else if ( row['carBrand'] == 'Nissan') { return '<span class="car-nissan"></span>';}
          else if ( row['carBrand'] == 'Ferrari') { return '<span class="car-ferrari"></span>';}
          else if ( row['carBrand'] == 'Bentley') { return '<span class="car-bentley"></span>';}
          else if ( row['carBrand'] == 'Jaguar') { return '<span class="car-jaguar"></span>';}
          else if ( row['carBrand'] == 'Reiter') { return '';}
          else { return '';}
        }
      //https://garyrowe.co.uk/acc/car-makes-icons-1.1.1/dist/demo.html
  },
  { 'data': 'carBrand' },
  { 'data': 'carName' },
  { "data": "serie" ,
    "render": function (data, type, row) {
      if ( row['serie'] == '0') { return '<span class="badge badge-dark">GT3</span>';} //GT3
      else if ( row['serie'] == '1') { return '<span class="badge badge-purple">GT4</span>';} //GT4
      else if ( row['serie'] == '2') { return '<span class="badge badge-danger">CHL</span>';} //CHL
      else if ( row['serie'] == '3') { return '<span class="badge badge-warning">ST</span>';} //ST
      else if ( row['serie'] == '4') { return '<span class="badge badge-success">CUP</span>';} //CUP
      else if ( row['serie'] == '5') { return '<span class="badge badge-primary">TCX</span>';} //TCX
      else if ( row['serie'] == '299') { return '?';} //NONE
      else { return 'Error';}
    }
  },
  { "data": "cupCategory" ,
    "render": function (data, type, row) {
      if ( row['cupCategory'] == '0') { return '<span class="badge badge-light">PRO</span>';} //Pro
      else if ( row['cupCategory'] == '1') { return '<span class="badge badge-dark">PRO-AM</span>';} //ProAm
      else if ( row['cupCategory'] == '2') { return '<span class="badge badge-danger">AM</span>';} //Am
      else if ( row['cupCategory'] == '3') { return '<span class="badge text-dark badge-light">SILVER</span>';} //Silver
      else if ( row['cupCategory'] == '4') { return '<span class="badge text-dark badge-light">NATIONAL</span>';} //National
      else { return 'Error';}
    }
  },
  { 'data': 'laps' },
  { 'data': null,"defaultContent": '' }, // Progress bar
  { 'data': null,"defaultContent": '' }, // gap
  { 'data': null,"defaultContent": '' }, // gapToLeader
  { 'data': 'lastLapTime' },
  { 'data': 'lastLapSector1' },
  { 'data': 'lastLapSector2' },
  { 'data': 'lastLapSector3' },
  { 'data': null,"defaultContent": '' }, // this is the bestLapTime column but needs processing on it for IS GLOBAL BEST
  { 'data': 'bestSector1' },
  { 'data': 'bestSector2' },
  { 'data': 'bestSector3' },
  { 'data': null,"defaultContent": '' }, // deltaFromBestLap
  { 'data': null,"defaultContent": '' }, // deltaFromAllCarsBestLap
  { 'data': null,"defaultContent": '' }, // Pit Stop Count
  { 'data': null,"defaultContent": '' }, // Laps Ago
  { 'data': 'inPitSince' },
  { "data": "raceAppTag" ,
    "render": function (data, type, row) {
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
  { "data": "raceAppByTagChampionshipPosition" ,
    "render": function (data, type, row) {
      if ( row["raceAppByTagChampionshipPosition"] == '1') {
        return '1 <i class="fa-solid fa-trophy text-gold"></i>';}
      else if ( row["raceAppByTagChampionshipPosition"] == '2') {
        return '2 <i class="fa-solid fa-trophy text-silver"></i>';}
      else if ( row["raceAppByTagChampionshipPosition"] == '3') {
        return '3 <i class="fa-solid fa-trophy text-bronze"></i>';}
      else { return row["raceAppByTagChampionshipPosition"];}
    }
  },
  { 'data': 'raceAppByTagChampionshipTotalPoints' },
  { 'data': null,"defaultContent": '' }, // this is the change
  {
    "data": "raceAppByTagChampionshipPredictedPosition" ,
    "render": function (data, type, row) {
      if ( row["raceAppByTagChampionshipPredictedPosition"] == '1') {
        return '1 <i class="fa-solid fa-trophy text-gold"></i>';
      }	else if ( row["raceAppByTagChampionshipPredictedPosition"] == '2') {
        return '2 <i class="fa-solid fa-trophy text-silver"></i>';
      }	else if ( row["raceAppByTagChampionshipPredictedPosition"] == '3') {
        return '3 <i class="fa-solid fa-trophy text-bronze"></i>';
      }	else {
        return row["raceAppByTagChampionshipPredictedPosition"];
      }
    }
  },
  { 'data': 'raceAppByTagChampionshipPredictedPoints' },
],
"order": [colOrderURLParam, 'asc'],
"columnDefs": [ //  when new columns are added all these need tweaking
  {
    // add a no wrap class to these columns
    'className': 'nowrapping',
    'targets': [ 4,8,9,10,12,13,16,22,24,25,26,28,29,30,31,32,34,38 ]
  }, //UPDATE TARGET

  /*  Keep all this so I can update them all please
    {
      searchBuilderTitle: '',
      targets: [] //UPDATE TARGET
    },
    {
      searchBuilderTitle: '',
      targets: [] //UPDATE TARGET
    },
    {
      searchBuilderTitle: '',
      targets: [] //UPDATE TARGET
    },
    {
      searchBuilderTitle: '',
      targets: [] //UPDATE TARGET
    },
    {
      searchBuilderTitle: '',
      targets: [] //UPDATE TARGET
    },
    {
      searchBuilderTitle: '',
      targets: [] //UPDATE TARGET
    }, */
    {
      searchBuilderTitle: 'RaceApp.eu Driver Tag (Class)',
      targets: [36] //UPDATE TARGET
    },
    {
      searchBuilderTitle: 'RaceApp.eu Position within Driver Tag (Class)',
      targets: [37] //UPDATE TARGET
    },
    {
      "orderable": false,
      "targets": [0]
    },
    {"render": function ( data, type, row ) {
      var sum1 = row['raceAppByTagChampionshipPosition'];
      var sum2 = row['raceAppByTagChampionshipPredictedPosition'];
      var theAnswer = sum1 - sum2;

      if (type === 'display') {
        if (theAnswer >= '+1' ) {
          championshipChange = "<span class=text-success>&#9650;</span> +" + theAnswer; // Position change red, you've dropped places!
        }
        else if (theAnswer < '0' ) {
          championshipChange = "<span class=text-danger>&#9660;</span> " + theAnswer; // Position change gree, you've overtaken cars!
        }
        else {
          championshipChange = "<span class=text-primary>&#9655;</span> " + theAnswer; // Position change static, you've maintained track position!
        }
        return '' + championshipChange + '';
      }
      return data;
    },
    "targets": 41 //UPDATE TARGET
    },
    {"render": function ( data, type, row ) {
      var bestTime = row['bestLapTime'];
      var areYouTheBest = row['haveAllBestLapTime'];

      if (type === 'display') {
        if (areYouTheBest >= '1' ) {
          bestMarker = "<span class='text-purple'>" + bestTime + "</span>"; // Global best goes purple!
        }
        else {
          bestMarker = bestTime; // Position change static, you've maintained track position!
        }
        return '' + bestMarker + '';
      }
      return data;
    },
    "targets": 27 //UPDATE TARGET
    },
    {"render": function ( data, type, row ) {
      var pitStopCountForD = row['pitStopCount'];
      var areTheyPitting = row['isPiting'];
      var pittingTimer = row['inPitSince'];

      if (type === 'display') {
        if (areTheyPitting >= '1' ) {
          let number = parseInt(pitStopCountForD, 10)
          pitColMsg = number + 1; // Position change red, you've dropped places!
        }
        else {
          pitColMsg = pitStopCountForD; // Position change static, you've maintained track position!
        }
        return '' + pitColMsg + '';
      }
      return data;
    },
    "targets": 33 //UPDATE TARGET
    },

    {"render": function ( data, type, row ) {

      var splinePercent = row['splinePosition'] * 100 ;
      var notMoving = row['isPiting'];
      var isItMe = row['isPlayer'];
      var sectOne = row['currentSector1Status'];
      var sectTwo = row['currentSector2Status'];
      var sectThree = row['currentSector3Status'];

      var sectOneCol = "";
      var sectTwoCol = "";
      var sectThreeCol = "";

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
          if (notMoving >= '1' ) {
            return '<div class="progress_bar" style="width: 300px;"><div class="pro-bar"><span class="progress-bar-inner" style="background-color: #d9534f; width: ' + Math.trunc(splinePercent) + '%;" data-value="' + Math.trunc(splinePercent) + '" data-percentage-value="' + Math.trunc(splinePercent) + '"></span></div></div>'
          }
          else {
            return '<div class="progress_bar" style="width: 300px;"><div class="pro-bar"><span class="progress-bar-inner" style="background-color: #5cb85c; width: ' + Math.trunc(splinePercent) + '%;" data-value="' + Math.trunc(splinePercent) + '" data-percentage-value="' + Math.trunc(splinePercent) + '"></span></div></div>'
          }
        //}
        return 'error'
      }
      return data;
    },
    "targets": 20 //UPDATE TARGET
    },

    {"render": function ( data, type, row ) {
      var lastStopAge = row['lapsFromLastPitStop'];
      return lastStopAge;
    },
    "targets": 34 //UPDATE TARGET
    },
    {"render": function ( data, type, row ) {
      var capFullname = row['currentDriver_FullName'];
      return capFullname.toUpperCase();
    },
    "targets": 8 //UPDATE TARGET
    },
    {
      "render": function ( data, type, row ) {
        var nationSpace = row['currentDriver_Nationality'];
        if (nationSpace == "Any" || nationSpace == null || nationSpace == "" ) {
          return "";
        }
        return nationSpace.replace(/[A-Z]/g, ' $&').trim();

      },
    "targets": 6 //UPDATE TARGET
    },
    {
      "render": function ( data, type, row ) {
        var teamSpace = row['teamNationality'];

        if (teamSpace = "Any") {
          return "";
        }	else if (teamSpace = ""){
          return "";
        }

        return teamSpace.replace(/[A-Z]/g, ' $&').trim();

      },
      "targets": 13 //UPDATE TARGET
    },
    {
      "render": function ( data, type, row ) {
        var timeFormatA = row['gap'];
        if (timeFormatA == null){
          return timeFormatA;
        }
        return timeFormatA.replace(/'/g, '.');
      },
      "targets": 21 //UPDATE TARGET
    },

    {"render": function ( data, type, row ) {
    var timeFormatB = row['gapToLeader'];
    if (timeFormatB == null){
      return timeFormatB;
    }
      return timeFormatB.replace(/'/g, '.');
    },
    "targets": 22 //UPDATE TARGET
    },

    {"render": function ( data, type, row ) {
    var timeFormatC = row['deltaFromBestLap'];
    if (timeFormatC == null){
      return timeFormatC;
    }
      return timeFormatC.replace(/'/g, '.');
    },
    "targets": 31 //UPDATE TARGET
    },
    {"render": function ( data, type, row ) {
    var timeFormatD = row['deltaFromAllCarsBestLap'];
    if (timeFormatD == null){
      return timeFormatD;
    }
      return timeFormatD.replace(/'/g, '.');
    },
    "targets": 32 //UPDATE TARGET
    },
    {"render": function ( data, type, row ) {
      return "sum";
      /*
        This is where the code will go to calculate the gap between players in the same RaceApp Class
      */
    },
    "targets": 38 //UPDATE TARGET
    }
],

"createdRow": function( row, data ) {
  /*
    The URL '&showme' parameter is comma separated Race Numbers of Drivers you want to see inverted in the table
  */
  const showMe = urlParams.get('showme');
  $(function() {
    var match = showMe.split(',')
    for (var a in match) {
      var variable = match[a]
      if ( data['raceNumber'] == variable ) {
        $(row).addClass('bg-light text-dark');
      }
    }
  });
},

/*

This is the code for indicating where you'll exit the pits in the leaderboard.

"drawCallback": function( settings ) {
  // isPlayer
// lastDriveThroughTime   =   time driving through, stopping and exiting the pit lane
// gapToLeader

var api = this.api();

  console.log( api.rows( {page:'current'} ).data() );

var tabledata = api.rows( {page:'current'} ).data();
console.log(tabledata);
tabledata.forEach((row) => {
  if ( row.isPlayer ) {
    console.log("hello");
  }
});

  }*/


}); // End of DataTable $('#example').DataTable({

console.log('Hiding Columns: %s', hiddenCols);

table.columns(['' + hiddenCols + '']).visible(false);

// classFiltering
document.getElementById("myText").value = classFiltering;
table.columns(36).search( $('#myText').val() ).draw(); // UPDATE TARGET COLUMN

// Add event listener for opening and closing details in the child row
$('#example tbody').on('click', 'td.dt-control', function () {
  var tr = $(this).closest('tr');
  var row = table.row(tr);

  if ( row.child.isShown() ) {
    // This row is already open - close it
    row.child.hide();
    tr.removeClass('shown');
  } else {
    // Open this row
    row.child( format(row.data()) ).show();
    tr.addClass('shown');
  }
});

// TODO: what is this for? triggers for every button?
$('button').on('click', function () {
  // Get shown rows
  childRows = table.rows($('.shown'));
  table.ajax.reload();
});

// This adds the bg-dark class to the fixedHeader
// but fixed header is disabled so don't think this is needed anymore!!!!!!
//
var elements = document.getElementsByClassName("sorting");
for (var i = 0; i < elements.length; i++) {
  elements[i].className += " bg-dark";
}

// set an event handler to add child rows each time the table is drawn
table.on('draw', formatChildRows);

// refresh the content periodically
setInterval(function() {
  // make a collection of rows where the child row is open
  childRows = table.rows($('.shown')); // Keep column 1 button open/showing if it has been clicked.
  table.ajax.reload();

  loadlink(sessionURL); // This function adds the Title and Clock countdown
}, refresh ); // reload rate can be set as a URL param
}); // end of $(document).ready(function () {

/**
 * update content for any open child rows
 */
function formatChildRows() {
	console.log('formatChildRows: %o', childRows);
	// If reloading table then show previously shown rows
	if (childRows) {
		childRows.every(function (rowIdx, tableLoop, rowLoop) {
			// get the table data (this)
			const d = this.data();
			console.log(d);

			format(d.raceNumber, sessionData.raceAppSerieId, this);
		});

		// Reset childRows so loop is not executed each draw
		childRows = null;
	}
}

/**
 * get previous results for a car
 *
 * @param {int} raceAppSerieId
 * @param {int} raceNumber
 * @param {DataTable} dataTable
 */
 function format(raceNumber, raceAppSerieId, dataTable) {
	let url = 'http://localhost:8000/Acc/GetRaceAppCarWithResults/' + raceAppSerieId + '/' + raceNumber;
	if (mode === 'static') {
		url = 'seriesId266carId63.json';
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

			dataTable.child(r).show();
			dataTable.nodes().to$().addClass('shown');
		})
		.error(function (error) {
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
