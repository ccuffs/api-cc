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
    <input type="text" id="autocomplete">
    <input type="text" id="userinput" placeholder="Search by movie title ...">
    <div id="suggestions"></div>
    
    <!-- scripts -->
    <script src="{{ asset('static/libs/iduffs@dev/autocomplete.js') }}" type="text/javascript" charset="utf-8"></script>
</body>
</html>