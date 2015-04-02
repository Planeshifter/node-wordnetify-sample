'use strict';

var _         = require( 'lodash' );
var path 	  = require( 'path' );
var binomCI   = require( 'compute-binom-ci' );
var makeLatex = require( 'make-latex' );

var freqTable = require( './freqTable' );

function inferenceRandomSample(inputFile, options){
	var input, table, total, alpha, level;

	// if path is not absolute, make it absolute with respect to dirname
	if ( path.resolve( inputFile ) !== path.normalize( inputFile ) ) {
		inputFile = path.normalize(__dirname + '/../' + inputFile);
	}
	input = require(inputFile);

	table = freqTable( input );
	
	total = _.reduce(table, function(a,b){
		return a + b;
	});

	alpha = 0.05 / Object.keys(table).length;
	level = 1 - alpha;

	table = _.map(table, function(e, l){
		var o = {};
		o.name = l;
		o.val = e;
		o.ci = [
			(binomCI(e, total,{'level': level})[0] * total).toFixed(2),
			(binomCI(e, total,{'level': level})[1] * total).toFixed(2)
		];
		return o;
	});

	console.log( makeLatex(table, {'colnames':["Category","Count","$95\\%$-CI"]}) );
}

module.exports = exports = inferenceRandomSample;
