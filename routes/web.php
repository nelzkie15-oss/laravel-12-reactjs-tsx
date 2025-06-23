<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\OrdersController;
use App\Http\Controllers\Admin\ProductsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('categories', [CategoryController::class, 'index'])->name('category.index');
    Route::get('categories/create', [CategoryController::class,'create'])->name('category.create');
    Route::post('categories/store', [CategoryController::class, 'store'])->name('category.store');
    Route::get('categories/{category}/edit', [CategoryController::class,'edit'])->name('category.edit');
    Route::put('categories/{category}', [CategoryController::class, 'update'])->name('category.update');
    Route::delete('categories/{category}', [CategoryController::class, 'destroy'])->name('category.destroy');

    Route::get('products', [ProductsController::class, 'index'])->name('product.index');
    Route::get('products/create', [ProductsController::class, 'create'])->name('product.create');
    Route::post('products/store', [ProductsController::class, 'store'])->name('product.store');
    Route::get('products/{product}/edit', [ProductsController::class,'edit'])->name('product.edit');
    Route::put('products/{product}', [ProductsController::class, 'update'])->name('product.update');
    Route::delete('products/{product}', [ProductsController::class, 'destroy'])->name('product.destroy');

    Route::get('orders', [OrdersController::class, 'index'])->name('order.index');
    Route::get('orders/create', [OrdersController::class,'create'])->name('order.create');
    Route::post('orders/store', [OrdersController::class, 'store'])->name('order.store');
    Route::get('orders/{order}/edit', [OrdersController::class,'edit'])->name('order.edit');
    Route::put('orders/{order}', [OrdersController::class, 'update'])->name('order.update');
    Route::delete('orders/{order}', [OrdersController::class, 'destroy'])->name('order.destroy');




});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
