/*
 IdUFFS Autocomplete v0.1.0
 Copyright 2020 Fernando Bevilacqua
 Author: Fernando Bevilacqua
 Released under the MIT Licence
 https://github.com/ccuffs/api-cc/
*/

var IDUFFS = IDUFFS || {};

IDUFFS.AutoComplete = function() {
    var self = this;

    this.internal = {
        settings: {
            initParams: {},
            apiEndpoint: '/api-cc/public/',
        },
        initCallbacks: {
            done: null,
            fail: null
        },
        index: null,
        autocomplete: null,
        data: null,
        external: self,

        apiURL: function(url) {
            return this.settings.apiEndpoint + url;
        },

        initIndex: function(data) {
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
        },

        indexSearch: function(term) {
            return this.index.search(term, 25);
        },

        indexInfo: function(key) {
            return this.data[key] ? this.data[key].name : null;
        },

        showResults: function() {
            var value = this.value;
            var results = self.internal.indexSearch(value);
            var entry, childs = self.internal.suggestions.childNodes;
            var i = 0,
                len = results.length;

            for (; i < len; i++) {

                entry = childs[i];

                if (!entry) {
                    entry = document.createElement('div');
                    self.internal.suggestions.appendChild(entry);
                }

                entry.textContent = self.internal.indexInfo(results[i]);
            }

            while (childs.length > len) {
                self.internal.suggestions.removeChild(childs[i])
            }

            var first_result = self.internal.indexInfo(results[0]);
            var match = first_result && first_result.toLowerCase().indexOf(value.toLowerCase());

            if (first_result && (match !== -1)) {
                self.internal.autoComplete.value = value + first_result.substring(match + value.length);
                self.internal.autoComplete.current = first_result;
            } else {
                self.internal.autoComplete.value = self.internal.autoComplete.current = value;
            }
        },

        acceptAutocomplete: function(event) {
            if ((event || window.event).keyCode === 13) {
                this.value = self.internal.autoComplete.value = self.internal.autoComplete.current;
            }
        },

        acceptSuggestion: function(event) {
            var target = (event || window.event).target;

            self.internal.userInput.value = self.internal.autoComplete.value = target.textContent;

            while (self.internal.suggestions.lastChild) {
                self.internal.suggestions.removeChild(self.internal.suggestions.lastChild);
            }

            return false;
        },

        initDOMElements: function() {
            this.suggestions = document.getElementById('suggestions');
            this.autoComplete = document.getElementById('autocomplete');
            this.userInput = document.getElementById('userinput');

            this.userInput.addEventListener('input', this.showResults, true);
            this.userInput.addEventListener('keyup', this.acceptAutocomplete, true);
            this.suggestions.addEventListener('click', this.acceptSuggestion, true);
        },

        boot: function() {
            var self = this;

            axios.get(this.apiURL('/info/users')).then(function(response) {
                self.initIndex(response.data);
                self.initDOMElements();

                if (self.initCallbacks.done) {
                    self.initCallbacks.done();
                }
            }).catch(function(error) {
                if (self.initCallbacks.fail) {
                    self.initCallbacks.fail(error);
                }
            });
        },
    };

    this.init = function(params) {
        var initCallbacks = this.internal.initCallbacks;

        var initStructure = {
            done: function(doneCallback) {
                initCallbacks.done = doneCallback;
                return initStructure;
            },

            fail: function(failCallback) {

                initCallbacks.fail = failCallback;
                return initStructure;
            },
        };

        var self = this;

        setTimeout(function() {
            self.internal.boot(params);
        }, 50);

        return initStructure;
    };
};