'use strict';

function freqTable( result, categories) {

	var table = {};
	if ( categories === undefined ) {
		categories = [];
		result.forEach( function(doc) {
			doc.categories.forEach( function(c) {
				table[c] = 0;
			});
		});
	} else {
		categories.forEach( function(c) {
			table[c] = 0;
		});
	}

	result.forEach( function(doc) {
		doc.categories.forEach( function(c) {
			table[c] += 1;
		});
	});

	return table;
}

module.exports = freqTable;
