<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['namespace' => 'Api'] , function(){
    // version 1.0
    Route::group(['namespace' => 'v100'] , function(){
        Route::post('/register' , 'AuthController@register');
        Route::post('/login' , 'AuthController@login');
        Route::get('/advertisings' , 'AdvertisingController@index');
        Route::get('/advertisingsAuth' , 'AdvertisingController@indexAuth')->middleware('auth:api');
        Route::get('/advertisings/{id}' , 'AdvertisingController@show');
        Route::get('/category/{id}' , 'CategoryController@showAds');
        Route::get('/search' , 'AdvertisingController@search');
        Route::get('/category' , 'CategoryController@index');
        Route::post('/logout' , 'AuthController@logout')->middleware('auth:api');
        Route::post('/addAd' , 'AdvertisingController@store')->middleware('auth:api');
        Route::post('/sendcode' , 'VerificationController@send')->middleware('auth:api');
        Route::get('/degrees' , 'DegreeController@show');
        Route::post('/verification' , 'VerificationController@check')->middleware('auth:api');
        Route::post('/changephone' , 'VerificationController@changephone')->middleware('auth:api');
        Route::post('/changephone' , 'VerificationController@changephone')->middleware('auth:api');
        Route::post('/bookmark' , 'AdvertisingController@bookmark')->middleware('auth:api');
        Route::post('/unBookmark' , 'AdvertisingController@unBookmark')->middleware('auth:api');
    });
});
