/**
 * Created by fran on 23/10/14.
 */
var util = require('util');
var path = require('path');
var ScriptBase = require('generator-angular/script-base.js');
var yeoman = require('yeoman-generator');
var angularUtils = require('generator-angular/util.js');
var chalk = require('chalk');

var Generator = module.exports = function() {
    ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.overrideSourceRoot = function() {
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

Generator.prototype.recoverSourceRoot = function() {
    this.sourceRoot(this.oldRoot);
};

Generator.prototype.addScriptToIndex = function (script) {
    try {
        var appPath = this.env.options.appPath;
        var fullPath = path.join(appPath, 'index.html');
        angularUtils.rewriteFile({
            file: fullPath,
            needle: '<!-- endbuild -->',
            splicable: [
                '<script src="' + script.toLowerCase().replace(/\\/g, '/') + '.js"></script>'
            ]
        });
    } catch (e) {
        this.log.error(chalk.yellow(
            '\nUnable to find ' + fullPath + '. Reference to ' + script + '.js ' + 'not added.\n'
        ));
    }
};

Generator.prototype.generateSourceAndTest = function (appTemplate, testTemplate, targetDirectory, skipAdd) {
    // Services use classified names
    if (this.generatorName.toLowerCase() === 'service') {
        this.cameledName = this.classedName;
    }

    var templatePath = path.join(targetDirectory, 'js', this.name);
    this.appTemplate(appTemplate, templatePath);
    this.testTemplate(testTemplate, path.join(targetDirectory, this.name));
    if (!skipAdd) {
        this.addScriptToIndex(templatePath);
    }
};
