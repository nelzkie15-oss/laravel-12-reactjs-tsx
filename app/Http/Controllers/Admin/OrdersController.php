<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrdersController extends Controller
{

    public function index(){

        $orders = Order::all();
        return Inertia::render('order/Index', compact('orders'));
    }

    public function create(){

         return Inertia::render('order/Create');
    }

    public function store(Request $request)
    {
          Order::create($request->validate([
          'customer_id' => ['required'],
          'order_number' => ['required'],
          'item' => ['required'],
          'price' => ['required'],
          'payment_method' => ['required'],
        ]));

        return redirect()->route('order.index')->with('message', 'Added Order Successfully!');

    }

    public function show(Order $order)
    {
        //
    }


    public function edit(Order $order)
    {
          return Inertia::render('order/Edit', compact('order'));
    }


    public function update(Request $request, Order $order)
    {
         $order->update($request->validate([
          'customer_id' => ['required'],
          'order_number' => ['required'],
          'item' => ['required'],
          'price' => ['required'],
          'payment_method' => ['required'],
        ]));

        return redirect()->route('order.index')->with('message', 'Order updated successfully!');
    }


    public function destroy(Order $order)
    {
        $order->delete();
         return to_route('order.index')->with('message', 'Delete Order Successfully!');
    }
}
