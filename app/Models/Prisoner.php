<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Prisoner extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'prisoners';
    protected $fillable = [
        'fullName','CNN','CDP','dateBirthday','address',
        'status','maladies','dateOfEntry','dateOfSortie','duration',
        'crime','image','gender','contactEmergency','cellule_id'
    ];
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($employee) {
            $employee->CDP = 'P' . str_pad(static::count() + 1, 1, '0', STR_PAD_LEFT);
        });
    }
    public function cellule()
    {
        return $this->belongsTo(Cellule::class);
    }

}
