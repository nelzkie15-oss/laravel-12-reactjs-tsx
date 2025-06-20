<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
      protected $guard = 'categories';
      protected $fillable = [
        'category_name',
        'category_description',
    ];

    use HasFactory;
}
