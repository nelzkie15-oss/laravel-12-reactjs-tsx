<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
      protected $guard = 'orders';
      protected $fillable = [
        'customer_id',
        'order_number',
        'item',
        'qty',
        'price',
        'payment_method',
        'status'
    ];

    use HasFactory;
}
