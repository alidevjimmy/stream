<?php

namespace App\Http\Controllers\Api\v100;

use App\Advertising;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdvertisingController extends Controller
{
    public function index()
    {
        $advertisings = Advertising::latest()->paginate(20);
        return response()->json(['status' => 'success', 'data' => $advertisings]);
    }

    public function show($id)
    {
        $advertising = Advertising::find($id);

        if ($advertising != [] && $advertising != '' && $advertising != null) {
            return response()->json(['status' => 'success', 'data' => $advertising]);
        }
        return response()->json(['status' => 'error', 'message' => 'آگهی یافت نشد']);
    }

    public function search(Request $request)
    {
        $ads = Advertising::active()->search($request->all())->latest()->paginate(20);
        return response()->json(['status' => 'success', 'data' => $ads]);
    }

    public function store(Request $request)
    {
        $validated_data = $request->validate([
            'title' => 'required|max:255',
            'description' => 'required',
            'category_id' => 'required',
            'address' => 'required',
            'price' => 'required',
            'type' => 'required'
        ]);
        $validated_data['user_id'] = $request->user()->id;
        $ad = Advertising::create($validated_data);
        return response()->json(['status' => 'success', 'message' => 'آگهی با موفقیت ثبت شد و پس از تایید نمایش داده می شود']);
    }
}
