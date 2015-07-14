'use strict';

var yeoman = require('yeoman-generator');
var path = require('path');
var util = require('util');
var controller = require('generator-angular/controller/');
var ScriptBase = require('../script-base.js');

var Generator = module.exports = function Generator() {
    controller.apply(this, arguments);
    ScriptBase.apply(this, arguments);
    this.oldRoot = this.sourceRoot();
    this.argument('moduleNamePascalCase', {
        'desc': 'Name for your module',
        required: true,
        type: 'string'
    });
}

util.inherits(Generator, controller);
util.inherits(Generator, ScriptBase);

Generator.prototype.createControllerFiles = function createControllerFiles() {
    var dst = 'controllers';
    if (this.moduleNamePascalCase != 'undefined') {
        dst = this.moduleNamePascalCase;
    }
    this.overrideSourceRoot();
    this.generateSourceAndTest(
        'controller',
        'spec/controller',
        dst,
        this.options['skip-add'] || false
    );
    this.recoverSourceRoot();
};
