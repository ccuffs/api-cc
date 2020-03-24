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
            maxSuggestions: 10,
            suggestionsContainerId: '',
            onSuggestionClicked: null,
            onSuggestionHovered: null,
            onMostLikelySuggestion: null,
            onSuggestions: null,
            fillMostLikelySuggestionOnTab: false,
            contentProperty: 'name',
            filterEntryContent: function(entry) {
                if(!entry) {
                    return;
                }
                return entry[self.internal.settings.contentProperty || 'name'];
            },
            filterEntryValue: function(entry) {
                if(!entry) {
                    return;
                }
                return entry[self.internal.settings.contentProperty || 'name'];
            },
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
            return this.index.search(term, this.settings.maxSuggestions);
        },

        indexGet: function(key) {
            return this.data[key] ? this.data[key] : null;
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

                var indexEntry = this.indexGet(results[i]);
                
                entry.dataset.value = this.settings.filterEntryValue(indexEntry);
                entry.dataset.key = results[i];
                entry.dataset.raw = JSON.stringify(this.data[results[i]]);
                entry.innerHTML = this.settings.filterEntryContent(indexEntry);
            }

            while (childs.length > len) {
                this.suggestions.removeChild(childs[i])
            }

            var firstResult = this.settings.filterEntryValue(this.indexGet(results[0]));
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

        overSuggestion: function(event) {
            var target = (event || window.event).target;

            if(this.settings.onSuggestionHovered) {
                this.settings.onSuggestionHovered(target);
            }
        },

        acceptSuggestion: function(event) {
            var target = (event || window.event).target;

            if(this.settings.onSuggestionClicked) {
                this.settings.onSuggestionClicked(target);
            }

            self.internal.userInput.value = self.internal.autoComplete.value = (target.dataset.value || target.innerHTML);

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
            
            this.suggestions.addEventListener('click', function(event) { self.acceptSuggestion(event); }, true);
            this.suggestions.addEventListener('mouseover', function(event) { self.overSuggestion(event); }, true);
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