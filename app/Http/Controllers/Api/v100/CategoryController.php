<?php

namespace App\Http\Controllers\Api\v100;

use App\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function index()
    {
        $cats = Category::all();
        return response()->json(['status' => 'success' , 'data' => $cats]);
    }
    public function showAds($id)
    {
        $category = Category::find($id);

        if ($category != [] && $category != '' && $category != null){
            return response()->json(['status' => 'success' , 'data' => $category->Advertisings()->paginate(20)]);
        }
        return response()->json(['status' => 'error' , 'message' => 'دسته بندی یافت نشد']);
    }
}
