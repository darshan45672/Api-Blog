<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BlogController extends Controller
{
    public function index()
    {
        return view('blogs.index');
    }

    public function show(){
        return view('blogs.show');
    }
    public function store( Request $request){
        $validator = Validator::make($request->all(), [
            'title' => 'required | min:3',
            'description' => 'required',
            'author' => 'required | min:3',
        ]);
        if ($validator->fails()) {
            return response()->json([ 'status' => false, 'message'=>'check the errors', 'error' => $validator->errors()]);
        }

        $blog = new Blog();
        $blog->title = $request->title;
        $blog->shortDescription = $request->shortDescription;
        $blog->description = $request->description;
        $blog->author = $request->author;
        // $blog->image = $request->image;
        $blog->save();

        return response()->json([ 'status' => true, 'message'=>'Blog added successfully', 'data' => $blog]);

    }
    public function update(){
    }
    public function destroy(){
    }
}