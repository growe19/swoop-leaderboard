export default class ScoreTable {
    constructor(data) {
        this.Id = data.Id;
        this.Name = data.Name;
        this.RaceScore = data.RaceScore;
    }

    /**
     *
     * @param {integer} position
     * @returns {integer}
     */
    getPointsForPosition (position) {
        const p = this.RaceScore.filter(score => score.Position === position);
        if (p.length === 1) {
            return parseInt(p[0].Points);
        } else {
            return 0;
        }
    }
}
