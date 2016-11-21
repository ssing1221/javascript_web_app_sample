/*
 * Converts \n newline chars into <br> chars s.t. they are visible
 * inside HTML
 */
function convertToHTMLVisibleNewline(value) {
	if (value != null && value != "") {
		return value.replace(/\n/g, '<br/>');
	} else {
		return value;
	}
};


function findAndRemove(array, property, value) {
	array.forEach(function(result, index) {
		if (result[property] === value) {
			// Remove from array
			array.splice(index, 1);
		}
	});
}