<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $fillable = [
        'name',
        'cnpj',
        'address'
    ];

    public function employee()
    {
        return $this->hasMany('App\Employee');
    }

}
