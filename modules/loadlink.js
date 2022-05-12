/**
 * get data from sessionURL and insert into header section
 */
export default function loadlink(sessionURL, mode, start) {
	$.getJSON(sessionURL, function(json) {
		// console.log(json);

		// simulate a count down for static
		if (mode === 'static') {
			const DURATION = 60 * 60 * 1000;
			const now = new Date();
			const elapsed = now - start;
			const remain = DURATION - elapsed;
			json.sessionTimeLeft = new Date(1995, 1, 1, 0, 0, remain).toTimeString();
		}

		$('#trackNameLoad').html(json.track);
		$('#sessionRemainLoad').html(json.sessionTimeLeft);
	});
}
