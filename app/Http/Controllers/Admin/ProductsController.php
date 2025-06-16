<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductsController extends Controller
{

   public function index(){

        $products = Product::all();
        return Inertia::render('product/Index', compact('products'));

    }

    public function create(){

        return Inertia::render('product/Create');

    }


    public function store(Request $request)
    {
          Product::create($request->validate([
          'product_name' => ['required', 'max:50'],
          'price' => ['required'],
          'quantity' => ['required'],
          'description' => ['required'],
        ]));

        return redirect()->route('product.index')->with('message', 'Added Product Successfully!');

    }


     public function show(Product $product)
    {
        //
    }

    public function edit(Product $product)
    {
        return Inertia::render('product/Edit', compact('product'));
    }


   public function update(Request $request, Product $product)
    {
        $product->update($request->validate([
          'product_name' => ['required', 'max:50'],
          'price' => ['required'],
          'quantity' => ['required'],
          'description' => ['required'],
        ]));

        return redirect()->route('product.index')->with('message', 'Product updated successfully!');
    }

    public function destroy(Product $product)
    {
        $product->delete();
         return to_route('product.index')->with('message', 'Delete Product Successfully!');
    }
}
