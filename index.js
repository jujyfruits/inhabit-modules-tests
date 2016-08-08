'use strict';

const humanize = require('tap-spec');
const notify = require('tap-notify');
const tape = require('tape');
const path = require('path');
const fs = require('fs');
const depsMock = require('./mock/Dependencies');
const confMock = require('./mock/Configuration');
const CFG_FILE_NAMES = [ 'inhabit.cfg.json', 'inhabitcfg.json' ];

module.exports = function (dir) {
    depsMock.then(function (dependencies) {
        test(dir, dependencies);
    });
};

function test(dir, dependencies) {
    const INHABIT_CFG_PATH = getCfgFileName(dir);
    global.__ark_app__ = {apps: {push: testModule}};

    let Module;

    tape.createStream()
        .pipe(notify())
        .pipe(humanize())
        .pipe(process.stdout);

    // Base InHabit config file test
    tape(CFG_FILE_NAMES.join(' or ') + ' tests', function (t) {

        // Test: we can access config file
        t.ok(INHABIT_CFG_PATH !== false, 'Accessible: ' + INHABIT_CFG_PATH);

        // Test: INHABIT_CFG.main is not "undefined"
        const INHABIT_CFG = require(INHABIT_CFG_PATH);
        t.ok(INHABIT_CFG.main !== undefined, 'It has "main" property');

        // Test: main file is accessible
        const MODULE_PATH = path.join(dir, INHABIT_CFG.main);
        t.doesNotThrow(fs.accessSync.bind(fs, MODULE_PATH), 'Accessible: ' + MODULE_PATH);

        require(MODULE_PATH);
        t.end();
    });
}

function testModule(Module) {
    tape('Module interface tests', function (t) {
        depsMock.then(function (deps) {

            // Test: Module.moduleName class property
            t.ok(typeof Module.moduleName === 'string', 'Module has "moduleName" class property.');

            // Test: Module is a constructor
            t.ok(typeof Module === 'function', Module.moduleName + ' is a constructor');

            // Test: Module constructor works
            let module = new Module(confMock, deps);
            t.ok(typeof module === 'object',   Module.moduleName + ' constructs an object');

            // Test: interface methods implemented
            ['getContent', 'getTitle', 'getType', 'getThumbnail', 'display'].map(function (method) {
                t.doesNotThrow(module[method].bind(module), /TypeError/, '#' + method + ' does not throws Exception');
            });

            t.end();
        });
    });
}

function getCfgFileName(dir) {
    for (var i = 0; i < CFG_FILE_NAMES.length; i++) {
        try { fs.accessSync(path.join(dir, CFG_FILE_NAMES[i])); return path.join(dir, CFG_FILE_NAMES[i]); }
        catch (E) {}
    }

    return false;
}
