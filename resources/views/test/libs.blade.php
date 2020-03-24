<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'TCCr') }}</title>
</head>

<body>
    <h1>Libs</h1>
    <p>Essa página mostra o funcionamento básico de várias libs vinculadas à API.</p>

    <h2>AutoComplete</h2>
    <input type="text" id="userinput" placeholder="Search by movie title ...">
    <div id="suggestions"></div>
    
    <!-- scripts -->
    <script src="{{ asset('static/libs/3rdparty/flexsearch.compact.js') }}" type="text/javascript"></script>
    <script src="{{ asset('static/libs/3rdparty/axios.min.js') }}" type="text/javascript"></script>
    <script src="{{ asset('static/libs/iduffs@dev/autocomplete.js') }}" type="text/javascript"></script>

    <script type="text/javascript">
        function onMostLikelySuggestion(entry) {
            if(!entry) {
                return;
            }

            console.log('onMostLikelySuggestion: ', entry);
        }

        function onSuggestions(entries) {
            console.log('onMostLikelySuggestion: ', entries);
        }

        function onSuggestionsContainerClicked(entry) {
            console.log('onSuggestionsContainerClicked: ', entry);
        }

        document.addEventListener('DOMContentLoaded', function() {
            var ac = new IDUFFS.AutoComplete();
        
            ac.init({
                group: 'computacao.ch',
                maxSuggestions: 30,
                suggestionsContainerId: 'suggestions',
                onSuggestionsContainerClicked: onSuggestionsContainerClicked,
                onMostLikelySuggestion: onMostLikelySuggestion,
                onSuggestions: onSuggestions,

            }).done(function() {
                console.log('DONE');
            }).fail(function(error) {
                console.log('FAIL', error);
            });
        });
    </script>
</body>
</html>