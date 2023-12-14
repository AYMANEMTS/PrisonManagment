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
        Schema::create('prisoners', function (Blueprint $table) {
            $table->id();
            $table->string('fullName');
            $table->string('CNN');
            $table->string('CDP')->nullable();
            $table->date('dateBirthday');
            $table->string('address');
            $table->string('status');
            $table->string('maladies');
            $table->date('dateOfEntry');
            $table->date('dateOfSortie')->nullable();
            $table->string('duration')->nullable();
            $table->string('crime');
            $table->string('image')->nullable();
            $table->enum('gender',['men','women']);
            $table->string('contactEmergency')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prisoners');
    }
};
