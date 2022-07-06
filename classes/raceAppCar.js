export default class RaceAppCar {
    constructor(data) {
        this.drivers = data.Drivers; // array
        this.performanceClass = data.PerformanceClass;
        this.class = data.Class;
        this.carNumber = data.carNumber;
        this.tag = data.Tag; // 'BRONZE' | 'SILVER' | ...
    }
}