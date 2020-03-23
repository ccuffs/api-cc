/*
 IdUFFS Autocomplete v0.1.0
 Copyright 2020 Fernando Bevilacqua
 Author: Fernando Bevilacqua
 Released under the MIT Licence
 https://github.com/ccuffs/api-cc/
*/

var FlexSearch = require('../3rdparty/flexsearch.compact.js');
var axios = require('axios');

var IDUFFS = IDUFFS || {};

IDUFFS.AutoComplete = function() {
    var self = this;

    this.API_ENDPOINT = '/api-cc/public/';

    this.index = null;
    this.autocomplete = null;
    this.data = null;

    this.apiURL = function(url) {
        return this.API_ENDPOINT + url;
    };

    this.initIndex = function(data) {
        this.index = new FlexSearch({
            encode: 'advanced',
            tokenize: 'reverse',
            suggest: true,
            cache: true
        });

        if (!data) {
            console.warn('Index is empty.');
            return;
        }

        for (var i = 0; i < data.length; i++) {
            this.index.add(i, data[i].name);
        }

        this.data = data;
    };

    this.indexSearch = function(term) {
        return this.index.search(term, 25);
    };

    this.indexInfo = function(key) {
        return this.data[key] ? this.data[key].name : null;
    }

    this.showResults = function() {
        var value = this.value;
        var results = self.indexSearch(value);
        var entry, childs = self.suggestions.childNodes;
        var i = 0,
            len = results.length;

        for (; i < len; i++) {

            entry = childs[i];

            if (!entry) {
                entry = document.createElement('div');
                self.suggestions.appendChild(entry);
            }

            entry.textContent = self.indexInfo(results[i]);
        }

        while (childs.length > len) {
            self.suggestions.removeChild(childs[i])
        }

        var first_result = self.indexInfo(results[0]);
        var match = first_result && first_result.toLowerCase().indexOf(value.toLowerCase());

        if (first_result && (match !== -1)) {
            self.autoComplete.value = value + first_result.substring(match + value.length);
            self.autoComplete.current = first_result;
        } else {
            self.autoComplete.value = self.autoComplete.current = value;
        }
    };

    this.acceptAutocomplete = function(event) {
        if ((event || window.event).keyCode === 13) {
            this.value = self.autoComplete.value = self.autoComplete.current;
        }
    };

    this.acceptSuggestion = function(event) {
        var target = (event || window.event).target;

        self.userInput.value = self.autoComplete.value = target.textContent;

        while (self.suggestions.lastChild) {
            self.suggestions.removeChild(self.suggestions.lastChild);
        }

        return false;
    };

    this.loadDataAndInitIndex = function() {
        var self = this;

        axios.get(this.apiURL('/info/users')).then(function(response) {
            self.initIndex(response.data);
        });
    };

    this.initDOMElements = function() {
        this.suggestions = document.getElementById('suggestions');
        this.autoComplete = document.getElementById('autocomplete');
        this.userInput = document.getElementById('userinput');

        this.userInput.addEventListener('input', this.showResults, true);
        this.userInput.addEventListener('keyup', this.acceptAutocomplete, true);
        this.suggestions.addEventListener('click', this.acceptSuggestion, true);
    };

    this.init = function() {
        this.initDOMElements();
        this.loadDataAndInitIndex();
    };
};

document.addEventListener('DOMContentLoaded', function() {
    var app = new IDUFFS.AutoComplete();
    app.init();
});