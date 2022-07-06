import RaceAppResult from "./raceAppResult.js";

/**
 * from GET /api/event/{id}/results
 */
export default class Event {
    Results = [];
    constructor(data) {
        data.Driver.forEach(driver => {
            this.Results.push(new RaceAppResult(driver));
        });
        // this.events = data.Driver;
    }

    filterEventByTag (tagName) {
        return this.Results.filter(result => result.Tag === tagName);
    }
}