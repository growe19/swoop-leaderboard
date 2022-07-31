/**
 * from GET /api/event/{id}/results
 * give us the result of a single race ... with cars in finishing order
 */
export default class EventResult {
    constructor(data) {
        this.CarName = data.CarName; // here we see the usual CarNumber + CarName property
        this.Position = data.Position;
        this.Tag = data.Tag; // 'PLATIN' | 'GOLD' | 'SILVER' | 'BRONZE'
        this.Class = data.VehicleClass; // 'GT3' | 'GT4'
    }

    get CarNumber () {
        return parseInt(this.CarName.substring(1, this.CarName.indexOf(' ')));
    }
}