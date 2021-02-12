<?php

namespace App\Support\Facades;

use Illuminate\Support\Facades\Facade;

class SgaScraper extends Facade {
    protected static function getFacadeAccessor() { return 'sga'; }
}