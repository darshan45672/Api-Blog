<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\TempImageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('blogs',[BlogController::class, 'store']);
Route::put('blogs/edit/{id}',[BlogController::class, 'update']);
Route::get('blogs',[BlogController::class, 'index']);
Route::get('blogs/{id}',[BlogController::class, 'show']);
Route::delete('blogs/delete/{id}',[BlogController::class, 'destroy']);
Route::post('save-temp-image',[TempImageController::class, 'store']);