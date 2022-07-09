import RaceAppResult from "./raceAppResult.js";

/**
 * from GET /api/event/{id}/results
 */
export default class Event {
    Results = [];
    constructor(data) {
        /*
        data.Driver.forEach(driver => {
            this.Results.push(new RaceAppResult(driver));
        });
        */
        // this.events = data.Driver;
        this.Id = data.Id;
        this.Name = data.Name;
        this.Start = new Date(data.Start);
        this.Track = data.Track;
        this.BookingOpen = data.SeriesBookingOpen;
    }

    get isRaceRun () {
        if (this.Start < new Date()) {
            return true;
        } else {
            return false;
        }
    }
}