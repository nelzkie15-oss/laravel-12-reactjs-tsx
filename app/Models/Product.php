<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    protected $guard = 'products';
      protected $fillable = [
        'product_name',
        'quantity',
        'price',
        'description'
    ];

    use HasFactory;
}
