/**
 * from GET /api/event/{id}/results
 */
export default class Event {
    Results = [];
    constructor(data) {
        this.Id = data.Id;
        this.Name = data.Name;
        this.Start = new Date(data.Start);
        this.Track = data.Track;
        this.BookingOpen = data.SeriesBookingOpen;
    }

    /**
     * calculated property to establish whether race was run already (i.e. in the past)
     */
    get isRaceRun () {
        if (this.Start < new Date()) {
            return true;
        } else {
            return false;
        }
    }
}