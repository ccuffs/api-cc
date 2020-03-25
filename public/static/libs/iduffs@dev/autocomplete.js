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
            inputId: '',
            contentProperty: 'name',
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
                this.index.add(i, this.external.filters.value(data[i]));
            }

            this.data = data;
        },

        indexSearch: function(term) {
            return this.index.search(term, this.settings.maxSuggestions);
        },

        indexGet: function(key) {
            return this.data[key] ? this.data[key] : null;
        },

        updateDomElementData: function(el, key) {
            var entry = this.indexGet(key);
                
            el.dataset.key = key;
            el.dataset.value = this.external.filters.value(entry);
            el.dataset.raw = JSON.stringify(entry);
            el.innerHTML = this.external.filters.content(entry);
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

                this.updateDomElementData(entry, results[i]);
                this.external.signals.added.dispatch(entry);
            }

            while (childs.length > len) {
                this.suggestions.removeChild(childs[i]);
                this.external.signals.removed.dispatch(childs[i]);
            }

            var keyFirstResult = results[0];
            var firstResult = this.external.filters.value(this.indexGet(keyFirstResult));
            var match = firstResult && firstResult.toLowerCase().indexOf(value.toLowerCase());

            if (firstResult && (match !== -1)) {
                this.autoComplete.value = value + firstResult.substring(match + value.length);
                this.autoComplete.current = firstResult;
                this.autoComplete.key = keyFirstResult;
            } else {
                this.autoComplete.value = this.autoComplete.current = value;
                this.autoComplete.key = null;
            }

            this.issueSignals(this.autoComplete, results);
        },

        issueSignals: function(autoComplete, results) {
            if(autoComplete.key !== null) {
                this.external.signals.hinted.dispatch(autoComplete.current);
            }

            this.external.signals.fetched.dispatch(results);
        },

        acceptAutocomplete: function(event) {
            var autoComplete = self.internal.autoComplete;

            if ((event || window.event).keyCode === 13) {
                this.value = autoComplete.value = autoComplete.current;
            }
        },

        overSuggestion: function(event) {
            var target = (event || window.event).target;
            this.external.signals.hovered.dispatch(target);
        },

        acceptSuggestion: function(event) {
            var target = (event || window.event).target;
            var suggestions = this.suggestions;

            this.external.signals.clicked.dispatch(target);
            this.userInput.value = this.autoComplete.value = (target.dataset.value || target.innerHTML);

            while (suggestions.lastChild) {
                this.external.signals.removed.dispatch(suggestions.lastChild);
                suggestions.removeChild(suggestions.lastChild);
            }

            return false;
        },

        initDOMElements: function() {
            var self = this;

            this.userInput = document.getElementById(this.settings.inputId);

            if(!this.userInput) {
                throw Error('Unable to get element using provided inputId: '+this.settings.inputId);
            }
            
            this.userInput.addEventListener('input', function() { self.showResults(this.value);}, true);
            this.userInput.addEventListener('keyup', this.acceptAutocomplete, true);
            
            this.suggestions = document.getElementById(this.settings.suggestionsContainerId);

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
                    self.initCallbacks.done(self.data);
                }
                self.external.signals.done.dispatch(self.data);

            }).catch(function(error) {
                if (self.initCallbacks.fail) {
                    self.initCallbacks.fail(error);
                }
                self.external.signals.fail.dispatch(error);
            });
        },

        initSettings: function(initParams) {
            if(!initParams) {
                return;
            }

            for(var prop in this.settings) {
                if(initParams[prop] !== undefined) {
                    this.settings[prop] = initParams[prop];
                }
            }
        },
    };

    this.signals = {
        clicked: new signals.Signal(),
        hovered: new signals.Signal(),
        added: new signals.Signal(),
        removed: new signals.Signal(),
        fetched: new signals.Signal(),
        hinted: new signals.Signal(),
        done: new signals.Signal(),
        fail: new signals.Signal(),
    };

    this.filters = {
        content: function(entry) {
            if(!entry) {
                return;
            }
            return entry[self.internal.settings.contentProperty || 'name'];
        },
        value: function(entry) {
            if(!entry) {
                return;
            }
            return entry[self.internal.settings.contentProperty || 'name'];
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