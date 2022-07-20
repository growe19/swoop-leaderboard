import SeriesResultsEvent from "./seriesResultsEvent.js";

/**
 *
 */
export default class SeriesResult {
  Events = [];

  constructor(data) {
    this.Class = data.VehicleClass;

    const n = data.CarName.indexOf(' ');
    this.CarNumber = data.CarName.substring(1, n);

    this.CarName = data.CarName.substring(n, data.CarName.length);

    data.Events.forEach(event => {
      this.Events.push(new SeriesResultsEvent(event));
    });
  }
}
