export default class Series {
    constructor(data) {
        this.penalties = data.Penalties;
        this.results = data.Results;
        this.settings = data.Settings;
    }

    filterResultsByClass (className) {
        return this.results.filter(result => result.VehicleClass === className);
    }

    filterResultsByTag (tagName) {
        return this.results.filter(result => result.Tag === tagName);
    }

    /**
     *
     * @param {string} tagName 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATIN'
     * @param {Integer} racePosition
     * @returns {Integer} points awards for given position in the given Tag class
     */
    pointsForTag (tagName, racePosition) {
        // TODO - validate tagName

        const tagScoreTable = this.settings.ScoreTables.filter(table => table.Name === tagName);
        // const v = tagScoreTable.RaceScore.values();
        const ptsTable = tagScoreTable[0].RaceScore;
        const pts = ptsTable.filter(row => row.Position === racePosition)[0].Points;
        return pts;
    }

    /**
     * Get all the cars that are involved in this Series
     *
     * @param {string} tagName
     * @returns {array}
     */
    filterBookingsByTag (tagName) {
        return this.settings.CarSoloBookings.filter(car => car.Tag === tagName);
    }
}