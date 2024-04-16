<?php

namespace App\Http\Controllers;

use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TempImageController extends Controller
{
    public function store(Request $request) {
        // apply validaton

        $validator = Validator::make($request->all(),[
            'image' => 'required | image'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Please fix errors',
                'errors' => $validator->errors()
            ]);
        }

        $image = $request->image;
        
        $extension = $image->getClientOriginalExtension();

        $imageName = time().'.'.$extension;

        $tempImage = new TempImage();
        $tempImage->name = $imageName;
        $tempImage->save();

        $image->move(public_path('uploads/temp-images'),$imageName);

        return response()->json([
            'status' => true,
            'message' => 'Image added sucessfully!',
            'errors' => $tempImage
        ]);

    }
}
