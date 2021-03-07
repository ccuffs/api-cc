<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEntityScraperTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('entity_scraper', function (Blueprint $table) {
            $table->id();
            $table->foreignId('entity_id')->references('id')->on('entities')->onDelete('cascade');
            $table->foreignId('scraper_id')->references('id')->on('scrapers')->onDelete('cascade');
            $table->timestamps();            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('entity_scraper');
    }
}
