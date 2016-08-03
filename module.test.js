'use strict';

var should = require('should');
var configuration = require('./mock/configurationMock');
var dependencies = require('./mock/dependenciesMock');

global.__ark_app__ = {
    apps: []
};

/**
 * Execute when module push itself to Module Storage
 * @param module
 */
var onModuleLoaded = function (module) {

    describe('Module', function () {

        it('should have #getContent', function () {
            module.getContent.bind(module).should.not.throw();
        });

        it('should have #getTitle', function () {
            module.getTitle.bind(module).should.not.throw();
        });

        it('should have #getThumbnail', function () {
            module.getThumbnail.bind(module).should.not.throw();
        });

        it('should have #getType', function () {
            module.getType.bind(module).should.not.throw();
        });

        it('should have #hasContent', function () {
            module.hasContent.bind(module).should.not.throw();
        });

        it('should have #display', function () {
            module.display.bind(module).should.not.throw();
        });

        it('should have #destroy', function () {
            module.destroy.bind(module).should.not.throw();
        });
    });

    describe('Module promise resolving assurance', function () {

        beforeEach(function (done) {
            var func = module.getContent;

            module.getContent = function () {
                func.call(module);
                setTimeout(done, 1000);
            };

            spyOn(module, 'getContent').and.callThrough();
            module.getContent();
        });

        it('should resolve deferred', function (done) {
            expect(module.deferred.state()).toBe("resolved");
            done();
        });
    });
};

/**
 * Override Module Storage #push to get loaded module
 * @param Module
 */
global.__ark_app__.apps.push = function (Module) {
    var module = new Module(configuration, dependencies);
    onModuleLoaded(module);
};