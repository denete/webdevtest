'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = function(grunt) {
	grunt.initConfig({
		less: {
			default: {
				files: {
					'./src/dist/Styles.css': './src/less/Styles.less'
				},
				paths: ['./src/dist']
			}
		},
		webpack: {
			default: {
				entry: {
					'Promotions': path.join(__dirname, './src/js/Promotions/Index.js')
				},
				externals: {
					'backbone': 'Backbone',
					'jquery': 'jQuery',
					'underscore': '_'
				},
				module: {
					loaders: [{
						test: /\.mustache$/,
						loader: 'mustache-loader?noShortcut'
					}]
				},
				output: {
					filename: '[name].bundle.js',
					path: path.join(__dirname, './src/dist')
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-webpack');
	
	grunt.registerTask('build', ['less', 'webpack']);
	grunt.registerTask('default', ['build']);
};