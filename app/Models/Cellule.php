<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cellule extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'cellules';
    protected $fillable = [
          'name','quartier_id','CapacityTotal','CapacityDisponible',
        'chefChombre_id'
    ];
    public function quartier()
    {
        return $this->belongsTo(Quartier::class,'quartier_id');
    }

    public function prisoners()
    {
        return $this->hasMany(Prisoner::class,'cellule_id');
    }
}
