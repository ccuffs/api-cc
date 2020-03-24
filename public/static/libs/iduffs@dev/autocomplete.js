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
            apiEndpoint: '/api-cc/public/',
            group: '',
            maxSuggestions: 30,
            suggestionsContainerId: '',
            onSuggestionsContainerClicked: null,
            onMostLikelySuggestion: null,
            onSuggestions: null,
            fillMostLikelySuggestionOnTab: false,
            debug: false
        },
        initCallbacks: {
            done: null,
            fail: null
        },
        index: null,
        autoComplete: {
            current: '',
            value: '',
            key: null
        },
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

        showResults: function(value) {
            var results = this.indexSearch(value);
            var entry, childs = this.suggestions.childNodes;
            var i = 0, len = results.length;

            for (; i < len; i++) {
                entry = childs[i];

                if (!entry) {
                    entry = document.createElement('div');
                    this.suggestions.appendChild(entry);
                }

                entry.textContent = this.indexInfo(results[i]);
            }

            while (childs.length > len) {
                this.suggestions.removeChild(childs[i])
            }

            var firstResult = this.indexInfo(results[0]);
            var match = firstResult && firstResult.toLowerCase().indexOf(value.toLowerCase());

            if (firstResult && (match !== -1)) {
                this.autoComplete.value = value + firstResult.substring(match + value.length);
                this.autoComplete.current = firstResult;
                this.autoComplete.key = results[0];
            } else {
                this.autoComplete.value = this.autoComplete.current = value;
                this.autoComplete.key = null;
            }

            this.signalOnMostLikelySuggestion(this.autoComplete);
        },

        signalOnMostLikelySuggestion: function(autoComplete) {
            if(this.settings.onMostLikelySuggestion && autoComplete.key !== null) {
                this.settings.onMostLikelySuggestion(autoComplete.current);
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
            var self = this;

            this.suggestions = document.getElementById('suggestions');
            this.userInput = document.getElementById('userinput');

            this.userInput.addEventListener('input', function() {
                self.showResults(this.value);
            }, true);
            this.userInput.addEventListener('keyup', this.acceptAutocomplete, true);
            
            if(!suggestions) {
                return;
            }
            
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

        initSettings: function(initParams) {
            for(var prop in this.settings) {
                if(initParams[prop] !== undefined) {
                    this.settings[prop] = initParams[prop];
                }
            }
        },
    };

    this.init = function(params) {
        var initCallbacks = this.internal.initCallbacks;
        var self = this;

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

        this.internal.initSettings(params);

        setTimeout(function() {
            self.internal.boot();
        }, 50);

        return initStructure;
    };
};