<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Appel extends Model
{
    use HasFactory,SoftDeletes;
    protected $table = 'appels';
    protected $fillable = [
        'chefQartier_id','qartier_id','cellule_id',
        'status','time','nombreDesPrisoners','remarque','dateExecute'
    ];


}
