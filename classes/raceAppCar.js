export default class RaceAppCar {
    constructor(data) {
        this.Drivers = data.Drivers; // array
        // this.PerformanceClass = data.PerformanceClass;
        this.Class = data.Class;
        this.Model = data.Model;
        this.CarNumber = data.CarNumber;
        this.CarName = data.CarName
        this.Tag = data.Tag; // 'BRONZE' | 'SILVER' | ...

        this.pts = 0;
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
        const d = this.Drivers.filter(d => d.Id === driverId);
        console.log(d);
        if (d.length > 0) {
            return true;
        } else {
            return false;
        }
    }
}