const humanize = require('tap-spec'),
    tape = require('tape'),
    path = require('path'),
    depsMock = require('../mock/Dependencies'),
    confMock = require('../mock/Configuration'),
    fs = require('fs');


module.exports = function (INHABIT_CFG) {
    global.__ark_app__ = { apps: { push: testModule } };

    var Module;

    tape.createStream()
        .pipe(humanize())
        .pipe(process.stdout);

    tape('There is an inhabit.cfg.json', function (t) {
        t.ok(fs.accessSync(INHABIT_CFG) === undefined,  'Accessible: ' + INHABIT_CFG);
        t.ok(require(INHABIT_CFG).main !== undefined, 'It has "main" property');
        t.ok(fs.accessSync(path.resolve(require(INHABIT_CFG).main)) === undefined, 'Accessible: ' + path.resolve(require(INHABIT_CFG).main));

        Module = require(path.resolve(require(INHABIT_CFG).main));

        t.end();
    });

    function testModule(Module) {
        tape(Module.name + ' is good enough', function (t) {
            depsMock.then(function (deps) {
                var module = new Module(confMock, deps);

                t.ok(typeof Module === 'function', Module.name + ' is a constructor');
                t.ok(typeof module === 'object',   Module.name + ' constructs an object');
                t.ok(typeof module.getContent === 'function', Module.name + '#getContent method exists');

                var promise = module.getContent();

                t.ok(typeof promise.then === 'function',   Module.name + '#getContent returns promise');
                t.comment('Waiting for promise resolving');
                promise.then(function () {

                    t.pass('Promise resolved');
                    t.equals(typeof module.hasContent(),  'boolean', Module.name + '#hasContent   returns Boolean');
                    t.equals(typeof module.getTitle(),     'string', Module.name + '#getTitle     returns String');
                    t.equals(typeof module.getThumbnail(), 'string', Module.name + '#getThumbnail returns String');
                    t.equals(typeof module.getType(),      'string', Module.name + '#getType      returns String');
                    t.equals(typeof module.display(),      'string', Module.name + '#display      returns String');

                    t.end();
                });

                t.timeoutAfter(5000);
            });
        });
    }
};