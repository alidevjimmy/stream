<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Advertising extends Model
{
    protected $fillable = [
        'title', 'description', 'images', 'user_id', 'address', 'price', 'type', 'category_id', 'like_count', 'shared_count'
    ];

    protected $casts = [
        'images' => 'array'
    ];

    public function Category()
    {
        return $this->belongsTo('App\Category');
    }

    public function User()
    {
        return $this->belongsTo('App\User');
    }

    public function scopeActive($query)
    {
        return $query->where('active' , 1);
    }

    public function scopeSearch($query , $input)
    {
        if (isset($input['search']) && !empty($input['search'])){
            $query->where('title' , 'LIKE' , '%' . $input['search'] . '%');
        }
        if (isset($input['category']) && !empty($input['category'])){
            $query->where('category_id' , $input['category']);
        }

        $query->active();
    }
}
