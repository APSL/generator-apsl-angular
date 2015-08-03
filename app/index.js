'use strict';

var fs = require('fs');
var path = require('path');
var util = require('util');
var angularUtils = require('generator-angular/util.js');
var yeoman = require('yeoman-generator');
var angular = require('generator-angular');
var yosay = require('yosay');
var wiredep = require('wiredep');
var chalk = require('chalk');
var mkdirp = require('mkdirp');

var Generator = module.exports = function Generator(args, options) {
    angular.apply(this, arguments);
    this._hooks.pop();
    this.hookFor('apsl-angular:module', {args: ['main']});
};

Generator.prototype = angular.prototype;

Generator.prototype.welcome = function welcome() {
    if (!this.options['skip-welcome-message']) {
        this.log(

            chalk.yellow(
                '************************************\n' +
                '     /\\   |  __ \\ / ____| |     \n' +
                '    /  \\  | |__) | (___ | |     \n' +
                '   / /\\ \\ |  ___/ \\___ \\| |     \n' +
                '  / ____ \\| |     ____) | |____ \n' +
                ' /_/    \\_\\_|    |_____/|______|\n' +
                '****** APSL Angular Generator ******\n\n'
            ),
            chalk.magenta(
                'This generator extends the default yo generator-angular in ' +
                'order to scaffold angular projects according' +
                'to APSL dev standards \n'
            )
        );
    }

    if (this.options.minsafe) {
        this.log.error(
                'The --minsafe flag has been removed. For more information, see' +
                '\nhttps://github.com/yeoman/generator-angular#minification-safe.' +
                '\n'
        );
    }
};

Generator.prototype.appJs = function appJs() {
  this.indexFile = this.appendFiles({
    html: this.indexFile,
    fileType: 'js',
    optimizedPath: 'scripts/scripts.js',
    sourceFileList: ['scripts/app.js', 'scripts/controllers/main.js'],
    searchPath: ['.tmp', this.appPath]
  });
};

/**
 * Creates the custom Gruntfile before the generator-angular one.
 * Should overwrite Generator.prototype.packageFiles in the future.
 */
Generator.prototype.configureCustomGruntfile = function configureCustomGruntfile() {
    // Re-calculate template path
    this.oldRoot = this.sourceRoot();
    var sourceRoot = '../templates/common';
    this.sourceRoot(path.join(__dirname, sourceRoot));

    // Remove old Grunfile and create custom one
    fs.unlinkSync('Gruntfile.js');
    this.log('Remove old Gruntfile');
    this.coffee = this.env.options.coffee;
    this.typescript = this.env.options.typescript;
    this.template('root/_Gruntfile.js', 'Gruntfile.js');

    // Restore template path
    this.sourceRoot(this.oldRoot);
};

/**
 * Creates the common dir to store globally available modules
 */
Generator.prototype.createCommonDir = function createCommonDir() {
    mkdirp('common/');
};
