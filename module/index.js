'use strict';

var generators = require('yeoman-generator');
var util = require('util');
var chalk = require('chalk');
var camelCase = require('camel-case');
var pascalCase = require('pascal-case');
var ScriptBase = require('../script-base.js');
var mkdirp = require('mkdirp');

var Generator = module.exports = function(){
    // Calling the super constructor is important so our generator is correctly setup
    ScriptBase.apply(this, arguments);
    this.moduleNamePascalCase = pascalCase(this.name != 'undefined' ? this.name : this.appName);

    chalk.red("Creando el módulo " + this.name + ".");
    mkdirp('app/' + this.moduleNamePascalCase + '/js/');
    mkdirp('app/' + this.moduleNamePascalCase + '/styles/');
    mkdirp('app/' + this.moduleNamePascalCase + '/views/');

    this.hookFor('apsl-angular:controller', {
      args: [
        "controller",
        this.moduleNamePascalCase
      ]
    });

    if (this.env.options.coffee) {
      this.folder = 'coffeescript';
    } else {
      this.folder = 'javascript';
    }
};

util.inherits(Generator, ScriptBase);

Generator.prototype.info = function(){
  this.name = 'config';
  this.overrideSourceRoot();
  console.log(this.sourceRoot());
  this.generateSourceAndTest(
    'config',
    'spec/controller',
    this.moduleNamePascalCase,
    this.options['skip-add'] || false
  );
  this.recoverSourceRoot();
  //this.template(this.sourceRoot()  + '/../../templates/'+ this.folder + '/config.js', "app/scripts/" + this.moduleName + '/config', this);
  chalk.red("Creado el módulo " + this.name + " y sus componentes.");
};
