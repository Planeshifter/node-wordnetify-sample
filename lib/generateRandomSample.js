'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');

function generateRandomSample(inputFile, options){

	var input, corpus, sample;

	// if n not provided, use default value of 100
	var n = 100;
	if ( options.nobs !== undefined ) {
		n = options.nobs;
	}

	if ( options.output === undefined ) {
		throw new TypeError( 'Invalid argument for --output. Must provide a file name. Value: `' + options.output + '`.' );
	}

	// if path is not absolute, make it absolute with respect to dirname
	if ( path.resolve( inputFile ) !== path.normalize( inputFile ) ) {
		inputFile = path.normalize(__dirname + '/../' + inputFile);
	}

	if ( !options.synsets ) {
		input = require(inputFile);
		corpus = input.corpus;
		sample = _.sample(corpus, n);
		fs.writeFileSync(options.output, JSON.stringify(sample));
	} else {
		input = require(inputFile);
		corpus = input.corpus;
		var tree = input.tree;
		var synsets = options.synsets.split(' ');
		var docIDs = [];
		for (var i = 0; i < synsets.length; i++) {
			docIDs = _.union(docIDs, tree[ synsets[i] ].docs);
		}
		var relevant = _.at(corpus, docIDs);
		sample = _.sample(relevant, n);
		fs.writeFileSync(options.output, JSON.stringify(sample));
	}

}

module.exports = exports = generateRandomSample;
