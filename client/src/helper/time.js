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


module.exports = {parseToYYYYMMDD}