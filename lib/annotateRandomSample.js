'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var readlineSync = require('readline-sync');
require('plus_arrays');
require('colors');

function annotateRandomSample(inputFile, options){

	// if path is not absolute, make it absolute with respect to dirname
	if ( path.resolve( inputFile ) !== path.normalize( inputFile ) ) {
		inputFile = path.normalize(__dirname + '/../' + inputFile);
	}
	var input = require(inputFile);

	if ( options.output === undefined ){
		throw new TypeError( 'Invalid argument for --output. Must provide a file name. Value: `' + options.output + '`.' );
	}

	if ( options.categories === undefined ) {
		throw new TypeError('Invalid argument for --categories. Must provide a space-separated list of categories. Value: `' + options.categories + '`.' );
	}
	var categories = options.categories.split(' ');

	var result = input.map(function( elem, index ) {
		var o = {};
		o.text = elem;

		console.log('DOCUMENT ' + index + ':');
		console.log(elem.green.bold);
		console.log('CATEGORIES:');
		console.log(categories.map(function(e,i){
			return i + ':' + e;
		}).join('\t'));
		console.log('Please enter correct category:'.grey);
		var chosenCategory;
		while ( chosenCategory === undefined ) {
			chosenCategory = categories[
				readlineSync.question('CHOICE:'.white.inverse + ': ')];
			if ( chosenCategory === undefined){
				console.log('Not a valid input. Try again.');
			}
		}
		o.category = chosenCategory;
		return o;
	});

	fs.writeFileSync(options.output, JSON.stringify(result) );

	var table = _.countBy(result, function(e){
		return e.category;
	});

	console.log(table);
}

module.exports = exports = annotateRandomSample;
