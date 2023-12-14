<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Quartier extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'quartiers';
    protected $fillable = [
        'name','nombreDeCellule','CapacityTotal','CapacityDisponible',
        'chefQuartier_id'
    ];
    public function chefQuartier()
    {
        return $this->belongsTo(Employe::class, 'chefQuartier_id');
    }
    public function cellules()
    {
        return $this->hasMany(Cellule::class,'quartier_id');
    }
    public function prisoners()
    {
        return $this->hasManyThrough(Prisoner::class, Cellule::class, 'quartier_id', 'cellule_id');
    }

}
