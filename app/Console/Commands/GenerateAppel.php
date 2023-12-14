<?php

namespace App\Console\Commands;

use App\Models\Appel;
use App\Models\Quartier;
use Illuminate\Console\Command;

class GenerateAppel extends Command
{
    protected $signature = 'appel:generate';
    protected $description = 'Generate Appel every day at 00:30';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Generating Appel...');
        foreach (Quartier::all() as $quartier) {
            foreach ($quartier->cellules as $cellule) {
                Appel::create([
                    'chefQartier_id' => $quartier->chefQuartier_id,
                    'qartier_id' => $quartier->id,
                    'cellule_id' => $cellule->id,
                    'status' => 'fresh',
                    'time' => 'matin'
                ]);
            }
        }
        $this->info('Appel generated successfully!');
    }
}
