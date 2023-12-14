<?php

use App\Models\Prisoner;
use App\Models\Quartier;
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
        Schema::create('cellules', function (Blueprint $table) {
            $table->id();
            $table->integer('name');
            $table->foreignIdFor(Quartier::class);
            $table->bigInteger('CapacityTotal')->nullable();
            $table->bigInteger('CapacityDisponible')->nullable();
            $table->unsignedBigInteger('chefChombre_id')->nullable();
            $table->foreign('chefChombre_id')->references('id')->on('prisoners')->onDelete('cascade');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cellules');
    }
};
