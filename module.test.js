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

    describe('Module methods existence assurance', function () {

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
    });

    describe('Module #getContent returning promise assurance', function () {
        it('should return promise', function () {
            var result = module.getContent();
            result.should.be.Object();
            result.then.should.be.Function();
        });
    });

    describe('Module promise resolving assurance', function () {
        var resolve;
        beforeEach(function (done) {
            resolve = jasmine.createSpy('resolve');
            module.getContent().then(function (module) {
                resolve(module);
                done();
            });
        });

        it('should resolve promise', function () {
            expect(resolve).toHaveBeenCalledWith(module);
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