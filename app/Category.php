<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['title' , 'parent_id'];

    public function Advertisings()
    {
        return $this->hasMany('App\Advertising');
    }
}
