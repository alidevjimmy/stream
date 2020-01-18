<?php

namespace App\Http\Controllers\Api\v100;

use App\Advertising;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class AdvertisingController extends Controller
{
    public function index()
    {
        $advertisings = Advertising::latest()->active()->paginate(20);
        return response()->json(['status' => 'success', 'data' => $advertisings]);
    }

    public function show($id)
    {
        $advertising = Advertising::find($id);

        if ($advertising != [] && $advertising != '' && $advertising != null) {
            if ($advertising->active == 1){
                return response()->json(['status' => 'success', 'data' => $advertising]);
            }
            else{
                return response()->json(['status' => 'error', 'message' => 'آگهی یافت نشد']);
            }
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
            'type' => 'required',
            'images[]' => 'mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);
        if ($request->user()->active == 1) {
            $images = array();
            if ($files = $request->file('images')) {
                $i = 0;
                foreach ($files as $file) {
                    $name = time() . '.' . $file->getClientOriginalName();
                    $img = Image::make($file->getRealPath());
                    if ($i == 0) {
                        $img->save(public_path('/image/' . $name));
                        $img->resize(400, 200);
                        $img->save(public_path('/image/' . 'themp' . $name));
                        $images[] = 'themp'.$name;
                        $images[] = $name;
                    } else {
                        $img->save(public_path('/image/' . $name));
                        $images[] = $name;
                    }
                    $i++;
                }
            }

            $validated_data['user_id'] = $request->user()->id;
            $validated_data['images'] = $images;
            $ad = Advertising::create($validated_data);
            return response()->json(['status' => 'success', 'message' => 'آگهی با موفقیت ثبت شد و پس از تایید نمایش داده می شود']);
        }
        return response()->json([
           'status' => 'error',
           'message' => 'برای اضافه کردن آگهی باید حساب کاربری خود را فعال کنید'
        ]);
    }
}
