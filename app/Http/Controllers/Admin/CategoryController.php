<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{

    public function index()
    {
        $categories = Category::all();
        return Inertia::render('category/Index', compact('categories'));
    }


    public function create()
    {
             return Inertia::render('category/Create');
    }


    public function store(Request $request)
    {
        Category::create($request->validate([
          'category_name' => ['required', 'max:50'],
          'category_description' => ['required', 'max:225'],
        ]));

        return redirect()->route('category.index')->with('message', 'Added Category Successfully!');

        // return to_route('category.create')->with('message', 'Added Category Successfully!');
    }


    public function show(Category $category)
    {
        //
    }

    public function edit(Category $category)
    {
        return Inertia::render('category/Edit', compact('category'));
    }


   public function update(Request $request, Category $category)
    {
        $category->update($request->validate([
            'category_name' => ['required', 'max:50'],
            'category_description' => ['required', 'max:225'],
        ]));

        return redirect()->route('category.index')->with('message', 'Category updated successfully!');
    }

    public function destroy(Category $category)
    {
        $category->delete();
         return to_route('category.index')->with('message', 'Delete Category Successfully!');
    }
}
