<?php

use App\Models\Cellule;
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
        Schema::table('prisoners', function (Blueprint $table) {
            $table->foreignIdFor(Cellule::class);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('prisoners', function (Blueprint $table) {
            $table->dropForeignIdFor(Cellule::class);
        });
    }
};
