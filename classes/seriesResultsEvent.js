export default class SeriesResultsEvent {
  constructor(data) {
    this.ManagedEventId = data.ManagedEventId;
    this.DriverId = data.DriverId;
    this.DriverName = data.DriverName;
    this.CarName = data.CarName; // can change between races
    this.Position = data.Position;
    this.PositionInClass = data.PositionInClass;
  }
}
