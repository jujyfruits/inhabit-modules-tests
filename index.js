'use strict';

const humanize = require('tap-spec');
const notify = require('tap-notify');
const tape = require('tape');
const path = require('path');
const fs = require('fs');
const depsMock = require('./mock/Dependencies');
const confMock = require('./mock/Configuration');
const CFG_FILE_NAME = 'inhabit.cfg.json';

module.exports = function (dir) {
    depsMock.then(function (dependencies) {
        test(dir, dependencies);
    });
};

function test(dir, dependencies) {
    const INHABIT_CFG = path.resolve(path.join(dir, CFG_FILE_NAME));
    global.__ark_app__ = {apps: {push: testModule}};

    let Module;

    tape.createStream()
        .pipe(notify())
        .pipe(humanize())
        .pipe(process.stdout);

    tape('There is an inhabit.cfg.json', function (t) {
        t.ok(fs.accessSync(INHABIT_CFG) === undefined, 'Accessible: ' + INHABIT_CFG);
        t.ok(require(INHABIT_CFG).main !== undefined, 'It has "main" property');
        const MODULE_PATH = path.resolve(path.join(path.dirname(INHABIT_CFG), require(INHABIT_CFG).main));
        t.ok(fs.accessSync(MODULE_PATH) === undefined, 'Accessible: ' + path.resolve(require(INHABIT_CFG).main));

        Module = require(MODULE_PATH);
        t.end();
    });
}

function testModule(Module) {
    tape(Module.moduleName + ' is good enough', function (t) {
        depsMock.then(function (deps) {
            const module = new Module(confMock, deps);

            t.ok(typeof Module.moduleName === 'string', 'Module has "moduleName" class property.');
            t.ok(typeof Module === 'function', Module.moduleName + ' is a constructor');
            t.ok(typeof Module === 'function', Module.moduleName + ' is a constructor');
            t.ok(typeof module === 'object',   Module.moduleName + ' constructs an object');
            t.ok(typeof module.getContent === 'function', Module.moduleName + '#getContent method exists');

            const promise = module.getContent();
            t.ok(typeof promise.then === 'function',   Module.moduleName + '#getContent returns promise');

            t.comment('Waiting for promise resolving');
            promise.then(function () {
                t.pass('Promise resolved');
                testPromise(module);
            });
            t.end();
        });
    });
}

function testPromise(module) {
    tape('Testing module after promise resolved', function (t) {
        t.equals(typeof module.hasContent(),  'boolean', '#hasContent   returns Boolean');
        t.equals(typeof module.getTitle(),     'string', '#getTitle     returns String');
        t.equals(typeof module.getThumbnail(), 'string', '#getThumbnail returns String');
        t.equals(typeof module.getType(),      'string', '#getType      returns String');
        t.equals(typeof module.display(),      'string', '#display      returns String');
        t.end();
    });
}