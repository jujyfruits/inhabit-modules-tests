var $ = require('jquery');
var Handlebars = require('handlebars');

/**
 * Mock of Text Classification Service
 */
var textClassificationService = function () {
    this.getTaxonomy = function () {
        return $.when(function () {
            return [];
        });
    };
    this.getEntities = function () {
        return $.when(function () {
            return [];
        });
    };
    this.getKeywords = function () {
        return $.when(function () {
            return [];
        });
    };
};
/**
 * Mock of Search Engine Service
 */
var searchEngineService = function () {
    this.random = function () {
        return $.when(function () {
            return [];
        });
    };
    this.search = function () {
        return $.when(function () {
            return [];
        });
    };
    this.queryFromTextClassification = function () {
    };
};

module.exports = {
    $: $,
    handlebars: Handlebars,
    textClassificationService: new textClassificationService(),
    searchEngineService: new searchEngineService()
};