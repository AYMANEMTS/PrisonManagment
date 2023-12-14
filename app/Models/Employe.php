<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Employe extends Authenticatable
{
    use HasFactory,SoftDeletes,Notifiable;
    protected $table = 'employes';
    protected $fillable = [
        'fullName','CNN','CDW','phone','email',
        'password','dateBirthday','address','image','gender','grade_id'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($employee) {
            $employee->CDW = 'E' . str_pad(static::count() + 1, 1, '0', STR_PAD_LEFT);
        });
    }
    public function grade()
    {
        return $this->belongsTo(Grade::class);
    }

    public function cellule()
    {
        return $this->belongsTo(Cellule::class);
    }

    public function isChefQuartier()
    {
        return Quartier::where('chefQuartier_id',$this->id)->exists();
    }


}
