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
}