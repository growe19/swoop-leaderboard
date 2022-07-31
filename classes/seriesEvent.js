/**
 * from GET /api/series/{id} - using the Events property
 */
export default class SeriesEvent {
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

    /**
     * add a car position to the Results array for this SeriesEvent
     * @param {EventResult} er
     */
    addResult (er) {
        // console.log(EventResult);
        const carClass = er.Class;
        const carTag = er.Tag;

        if (!this.Results[carClass]) {
            this.Results[carClass] = [];
        }
        // only worry about cars that are entered into a Tag
        if (carTag) {
            if (!this.Results[carClass][carTag]) {
                this.Results[carClass][carTag] = [];
            }
            this.Results[carClass][carTag].push(er);
        }
    }
}