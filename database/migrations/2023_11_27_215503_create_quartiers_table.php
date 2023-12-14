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
        Schema::create('quartiers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('nombreDeCellule');
            $table->bigInteger('CapacityTotal')->nullable();
            $table->bigInteger('CapacityDisponible')->nullable();
            $table->unsignedBigInteger('chefQuartier_id')->nullable();
            $table->foreign('chefQuartier_id')->references('id')->on('employes')->onDelete('cascade');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quartiers');
    }
};
