<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('appels', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('chefQartier_id');
            $table->unsignedBigInteger('qartier_id');
            $table->unsignedBigInteger('cellule_id');
            $table->enum('status',['fresh','done','issues']);
            $table->enum('time',['matin','soir']);
            $table->integer('nombreDesPrisoners')->nullable();
            $table->string('remarque')->nullable();
            $table->date('dateExecute')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appels');
    }
};
