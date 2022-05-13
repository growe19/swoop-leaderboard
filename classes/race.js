export class RaceInfo {
  constructor(data) {
      this.sessionType = data.sessionType;
      this.sessionTimeLeft = data.sessionTimeLeft;
      this.track = data.track;

      // select other useful properties from below
  }
}

/*
    "sessionType": "RACE",
    "sessionTimeLeft": "00:07.17",
    "track": "Circuit Zandvoort",
    "trackState": null,
    "trackTemp": 25,
    "airTemp": 23,
    "trackMeters": 4252,
    "ranking_Name": null,
    "ranking_CommunityName": null,
    "ranking_Infos": null,
    "raceAppSerieId": null,
    "rainIntensity": 0,
    "rainIntensityIn10min": 0,
    "rainIntensityIn30min": 0,
    "globalGreen": true,
    "globalYellow": false,
    "globalYellow1": false,
    "globalYellow2": false,
    "globalYellow3": false,
    "globalRed": false,
    "globalWhite": false,
    "globalChequered": false,
    "clock": "09:36.36",
    "timeMultiplier": 6,
    "lastDriveThroughTime": {}
*/