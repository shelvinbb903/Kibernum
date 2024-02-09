<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStatusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('status', function (Blueprint $table) {
            $table->integer('id')->autoIncrement();
            $table->string('description');
            $table->timestamps();
        });
        // Insertar data inicial
        DB::table('status')->insert(
            array(
              'description' => 'Creado'
            )
        );
        DB::table('status')->insert(
            array(
              'description' => 'Activo'
            )
        );
        DB::table('status')->insert(
            array(
              'description' => 'Inactivo'
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
        Schema::dropIfExists('status');
    }
}
