/**
 * Created by fran on 23/10/14.
 */
var util = require('util');
var path = require('path');

var ScriptBase = require('generator-angular/script-base.js');

var Generator = module.exports = function(){
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);


Generator.prototype.overrideSourceRoot = function(){
  this.oldRoot = this.sourceRoot();
  // RECALCULAR EL PATH PARA SOBRESCRIBIR LOS TEMPLATES CON LOS NUESTROS
  var sourceRoot = '/templates/javascript';
  this.scriptSuffix = '.js';

  if (this.env.options.coffee) {
    sourceRoot = '/templates/coffeescript';
    this.scriptSuffix = '.coffee';
  }

  this.sourceRoot(path.join(__dirname, sourceRoot));
};


Generator.prototype.recoverSourceRoot = function(){
  this.sourceRoot(this.oldRoot);
};
