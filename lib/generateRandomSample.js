'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');

function generateRandomSample(inputFile, options){

	// if n not provided, use default value of 100
	var n = 100;
	if ( options.nobs !== undefined ) {
		n = options.nobs;
	}

	if ( options.output === undefined ){
		throw new TypeError( 'Invalid argument for --output. Must provide a file name. Value: `' + options.output + '`.' );
	}

	// if path is not absolute, make it absolute with respect to dirname
	if ( path.resolve( inputFile ) !== path.normalize( inputFile ) ) {
		inputFile = path.normalize(__dirname + '/../' + inputFile);
	}

	if ( !options.synsets ) {
		var input = require(inputFile);
		var corpus = input.corpus;
		var sample = _.sample(corpus, n);
		fs.writeFileSync(options.output, JSON.stringify(sample));
	}

}

module.exports = exports = generateRandomSample;
