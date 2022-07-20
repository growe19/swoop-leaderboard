import SeriesResultsEvent from "./seriesResultsEvent.js";

export default class SeriesResult {
  Events = [];

  constructor(data) {
    this.Class = data.VehicleClass;

    data.Events.forEach(event => {
      this.Events.push(new SeriesResultsEvent(event));
    });
  }
}
