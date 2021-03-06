'use strict';

/*
LOAD MODULES
*/

var program = require('commander');


/*
Command-Line-Interface:
*/

program
	.version('0.2.1');

program
	.command('generate <input>')
	.description('Generate a random sample')
	.option('-n, --nobs [value]', 'Number of documents')
	.option('-s, --synsets [value]', 'Filter for synset IDs')
	.option('-a, --all', 'All synsets have to be present')
	.option('-o, --output [value]', 'Append documents to report')
	.action( function(input, options){
		require('./generateRandomSample.js')(input, options);
	});

program
	.command('annotate <input>')
	.description('Annotate a random sample')
	.option('-c, --categories [value]', 'Categories')
	.option('-o, --output [value]', 'Name of generated output file')
	.action( function(input, options) {
		require('./annotateRandomSample.js')(input, options);
	});

program
	.command('inference <input>')
	.description('Inference for annotated output')
	.action( function(input, options) {
		require('./inferenceRandomSample.js')(input, options);
	});

program
	.parse(process.argv);
