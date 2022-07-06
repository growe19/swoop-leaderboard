/**
 * individual result record from GET /api/event/{id}/results
 */
export default class RaceAppResult {
    constructor(data) {
        this.Id = data.Id;
        this.Position = data.Position;
        this.PositionInClass = data.PositionInClass;
        this.Tag = data.Tag;
        this.CalculatedPoints = data.CalculatedPoints;
        this.CarName = data.CarName;
        this.Drivers = data.ResultDrivers;
    }
}