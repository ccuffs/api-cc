<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateScrapingCredentialsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('scraping_credentials', function (Blueprint $table) {
            $table->id();
            $table->string('target', 32)->index();
            $table->string('actor', 100)->index();
            $table->string('access_user');
            $table->string('access_password');
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
        Schema::dropIfExists('scraping_credentials');
    }
}
