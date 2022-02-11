const parseToYYYYMMDD = (time) => {
	var parsedTime
	if (time.getMonth() + 1 < 10) {
		parsedTime =
			time.getFullYear() +
			"-" +
			"0" +
			(time.getMonth() + 1) +
			"-" +
			time.getDate()
	} else {
		parsedTime =
			time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate()
	}
	return parsedTime
}

const calculateTimeLeft = (time) => {
	if (time === null) {
		return
	}
    let difference = Date.parse(time) - +new Date()
    console.log(difference)

	let timeLeft = {}

	if (difference > 0) {
		timeLeft = {
			days: Math.floor(difference / (1000 * 60 * 60 * 24)),
			hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
			minutes: Math.floor((difference / 1000 / 60) % 60),
			seconds: Math.floor((difference / 1000) % 60)
		}
    }
    
    console.log(timeLeft)

	return timeLeft
}

module.exports = { parseToYYYYMMDD, calculateTimeLeft }
