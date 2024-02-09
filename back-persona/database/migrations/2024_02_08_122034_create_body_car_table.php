<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBodyCarTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('body_car', function (Blueprint $table) {
            $table->integer('id')->autoIncrement();
            $table->string('description');
            $table->timestamps();
        });
        // Insertar data inicial
        DB::table('body_car')->insert(
            array(
                'description' => 'Furgón'
            )
        );
        DB::table('body_car')->insert(
            array(
                'description' => 'Volco'
            )
        );
        DB::table('body_car')->insert(
            array(
                'description' => 'Tanque'
            )
        );
        DB::table('body_car')->insert(
            array(
                'description' => 'Estacas'
            )
        );
        DB::table('body_car')->insert(
            array(
                'description' => 'Porta Contenedor'
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
        Schema::dropIfExists('body_car');
    }
}
