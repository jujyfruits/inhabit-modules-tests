var Promise = require('pinkie-promise');

var mockData = [];

var textClassificationService = function () {
    this.getTaxonomy = function () {
        return new Promise(function (resolve) { resolve(mockData); });
    };
    this.getEntities = function () {
        return new Promise(function (resolve) { resolve(mockData); });
    };
    this.getKeywords = function () {
        return new Promise(function (resolve) { resolve(mockData); });
    };
    this.getTextClassification = function () {
        return new Promise(function (resolve) { resolve(mockData); });
    };
};

var searchEngineService = function () {
    this.random = function (provider, transformer) {
        return new Promise(function (resolve) { resolve(transformer.transform(mockData)); });
    };
    this.search = function (provider, transformer) {
        return new Promise(function (resolve) { resolve(transformer.transform(mockData)); });
    };
    this.queryFromTextClassification = function (provider, transformer) {
        return new Promise(function (resolve) { resolve(transformer.transform(mockData)); });
    };
};

module.exports = new Promise(function (resolve, reject) {
    require('jsdom').env("", function (err, window) {
        if (err) {
            reject(err);
        }

        global.document = window.document;
        global.location = document.location;

        resolve({
            $: require('jquery')(window),
            handlebars: require('handlebars'),
            textClassificationService: new textClassificationService(),
            searchEngineService: new searchEngineService()
        });
    });
});