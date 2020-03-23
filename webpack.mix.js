const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// Coisas em geral
mix.js('resources/js/app.js', 'public/static/libs/misc@dev');

// IdUFFS
mix.js('resources/js/libs/iduffs/autocomplete.js', 'public/static/libs/iduffs@dev');