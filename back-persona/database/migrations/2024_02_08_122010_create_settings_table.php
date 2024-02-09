<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->integer('id')->autoIncrement();
            $table->string('description');
            $table->timestamps();
        });
        // Insertar data inicial
        DB::table('settings')->insert(
            array(
                'description' => 'CA'
            )
        );
        DB::table('settings')->insert(
            array(
                'description' => '2'
            )
        );
        DB::table('settings')->insert(
            array(
                'description' => '3'
            )
        );
        DB::table('settings')->insert(
            array(
                'description' => '4'
            )
        );
        DB::table('settings')->insert(
            array(
                'description' => '2S2'
            )
        );
        DB::table('settings')->insert(
            array(
                'description' => '2S3'
            )
        );
        DB::table('settings')->insert(
            array(
                'description' => '3S3'
            )
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('settings');
    }
}
