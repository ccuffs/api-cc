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
    <script src="{{ asset('static/libs/3rdparty/signals.min.js') }}" type="text/javascript"></script>
    <script src="{{ asset('static/libs/iduffs@dev/autocomplete.js') }}" type="text/javascript"></script>

    <script type="text/javascript">
        document.addEventListener('DOMContentLoaded', function() {
            var ac = new IDUFFS.AutoComplete();
        
            ac.init({
                group: 'computacao.ch',
                maxSuggestions: 30,
                suggestionsContainerId: 'suggestions',
                inputId: 'userinput',

            }).done(function(data) {
                console.log('Autocomplete está pronto. Elementos no indice: ' + data.length);

            }).fail(function(error) {
                console.log('Falha ao inicializar autocomplete: ', error);
            });

            ac.signals.clicked.add(function(entry) { console.log('clicked: ', entry); });
            ac.signals.hovered.add(function(entry) { console.log('hovered: ', entry); });
            ac.signals.added.add(function(el) { console.log('added: ', el); });
            ac.signals.removed.add(function(entry) { console.log('removed: ', entry); });
            ac.signals.fetched.add(function(keys) { console.log('fetched: ', keys); });
            ac.signals.hinted.add(function(entry) { console.log('hinted: ', entry); });
        });
    </script>
</body>
</html>