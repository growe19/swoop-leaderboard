export default class SeriesResultsEvent {
  constructor(data) {
    this.ManagedEventId = data.ManagedEventId;
    this.DriverId = data.DriverId;
    this.DriverName = data.DriverName;
    this.CarName = data.CarName; // in this context this is the CarNumber + CarName from elsewhere
    this.Position = data.Position;
    this.PositionInClass = data.PositionInClass;
  }

  /**
   * extract the carNumber from the combined carName
   */
  get carNumber () {
    return this.CarName.substring(0, this.CarName.indexOf(' '));
  }
}
