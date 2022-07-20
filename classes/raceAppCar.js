/**
 * an object representing a car entered in the series
 *
 * sourced from GET /api/series/{id} using Settings.CarSoloBookings
 */
export default class RaceAppCar {
    constructor(data) {
        this.Id = data.IdFromSolo;
        this.Drivers = data.Drivers; // array
        this.Class = data.Class;
        this.Model = data.Model;
        this.CarNumber = parseInt(data.CarNumber);
        this.CarName = data.CarName
        this.Tag = data.Tag; // 'BRONZE' | 'SILVER' | ...

        this.pts = 0; // used to track our custom points
    }

    /**
     * increment the number of points for this car instance
     *
     * @param {integer} pts
     */
    addPoints (pts) {
        this.pts += pts;
    }

    /**
     * helps us identify car for given driver
     * @param {integer} driverId
     * @returns {boolean}
     */
    hasDriver (driverId) {
        const d = this.Drivers.some(d => d.Id === driverId);
        // console.log(d);
        if (d) {
            return true;
        } else {
            return false;
        }
    }
}