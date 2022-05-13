export class CarInfo {
  constructor(data) {
      this.id = data.Id;
      this.RaceNumber = data.RaceNumber;
      this.RaceNumberWithSharp = data.RaceNumberWithSharp;
      this.CurrentDriver_FullName = data.CurrentDriver_FullName;
      this.CarName = data.CarName;
      this.Gap = data.Gap;
      this.LastLap = data.LastLap;
      this.BestLap = data.BestLap;
      this.Laps = data.Laps;
      this.PitStopCount = data.PitStopCount;
      this.InPitSince = data.InPitSince;
      this.TeamName = data.TeamName;
      this.CupCategory = data.CupCategory;
      this.CupCategoryPicture = data.CupCategoryPicture;

      // there are more properties available
      this.nationality = data.currentDriver_NationalityNumber;
      this.serie = data.serie;
      this.driverCategory = data.driverCategory;
      this.carBrand = data.carBrand;
      this.gapToLeader = data.gapToLeader;
  }

  static flags = [
    '',
    '<i class="fi fi-it"></i>',
    '<i class="fi fi-de"></i>',
    '<i class="fi fi-fr"></i>',
    '<i class="fi fi-es"></i>',
    '<i class="fi fi-gb"></i>',
    '<i class="fi fi-hu"></i>',
    '<i class="fi fi-be"></i>',
    '<i class="fi fi-ch"></i>',
    '<i class="fi fi-at"></i>',
    '<i class="fi fi-ru"></i>' // 10

    // ...
  ];

  /*
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
  */

  static logos = [];
  static series = ['GT3', 'GT4'];
  static category = ['Bronze', 'Silver', 'Gold', 'Platinum'];

  /**
   *
   * @returns html string with flag for driver
   */
  flag () {
    const flag = CarInfo.flags[this.nationality]; // calculate based on this.nationality
    return `<i class="fa fa-${flag}"></i>`;
  }

  /**
   *
   * @returns html string with logo for car
   */
  carlogo () {
    const logo = CarInfo.logos[this.carBrand]; // calculate based on this.carBrand
    return `<i class="fa fa-${logo}></i>`;
  }

  /*
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
  */


  /**
   *
   * @returns
   */
  serie () {
    return CarInfo.series[this.serie];
  }

  category () {
    return CarInfo.category[this.category];
  }

  /**
   * calculate gap between any two cars by using their respective gap to leader
   *
   * @param {CarInfo} car
   * @returns {int} gap between me and given car (positive means I'm leading)
   */
  leadOver (car) {
    // convert gapToLeader from mm:ss.s to micro seconds
    const myGapToLeader = this.gapInMs(this.gapToLeader);

    return this.gapInMs(car.gapToLeader) - myGapToLeader;
  }

  /**
   * convert a gap string into a useful integer value
   *
   * @param {string} gap
   * @returns {int} number of micro-seconds (1/10th of second)
   */
  gapInMs (gap) {
    const t = String.prototype.split(':');
    const mins = parseInt(t[0]);
    const secs = parseFloat(t[1]);

    return (mins * 60 + secs) * 10;
  }
}
