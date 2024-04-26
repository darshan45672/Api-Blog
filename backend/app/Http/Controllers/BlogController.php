<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::orderBy('created_at', 'DESC')->get();

        return response()->json([
            'status' => true,
            'data' => $blogs,
        ]);
    }

    public function show( $id )
    {
        $blog = Blog::find($id);
        if ($blog == null) {
            return response()->json(['status' => false, 'message' => 'Blog not Found !!']);
        }

        $blog['date'] = \Carbon\Carbon::parse($blog->created_at)->format('d M, Y');

        return response()->json([
            'status' => true,
            'data' => $blog,
        ]);
     ;
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required | min:3',
            'description' => 'required',
            'author' => 'required | min:3',
        ]);
        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'check the errors', 'error' => $validator->errors()]);
        }

        $blog = new Blog();
        $blog->title = $request->title;
        $blog->shortDescription = $request->shortDescription;
        $blog->description = $request->description;
        $blog->author = $request->author;
        // $blog->image = $request->image;
        $blog->save();

        $tempImage = TempImage::find($request->image_id);

        // if ($tempImage != null) {

        //     // 1713255034.png
        //     $imageExtensionArray = explode('.', $tempImage->name);
        //     $extension = last($imageExtensionArray);

        //     $imageName = time() . '-' . $blog->id . '.' . $extension;

        //     $blog->image = $imageName;
        //     $blog->save();

        //     $sourcePath = public_path('uploads/temp/' . $tempImage->name);
        //     $destinationPath = public_path('uploads/blogs/' . $imageName);
        //     // dd($destinationPath);
        //     File::copy($sourcePath, $destinationPath);

        $tempImage = TempImage::find($request->image_id);

        if ($tempImage != null) {

            $imageExtArray = explode('.',$tempImage->name);
            $ext = last($imageExtArray);
            $imageName = time().'-'.$blog->id.'.'.$ext;

            $blog->image = $imageName;
            $blog->save();

            $sourcePath = public_path('uploads/temp/'.$tempImage->name);
            $destPath = public_path('uploads/blogs/'.$imageName);

            File::copy($sourcePath,$destPath);
        }

        return response()->json([
            'status' => true,
            'message' => 'Blog added successfully',
            'data' => $blog
        ]);
    }

    public function update( $id, Request $request)
    {

        $blog =Blog::find($id);

        if ($blog == null) {
            return response()->json([
                'status' => false,
                'message' => 'Blog not found',
            ]);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required | min:3',
            'description' => 'required',
            'author' => 'required | min:3',
        ]);
        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'check the errors', 'error' => $validator->errors()]);
        }
        
        $blog->title = $request->title;
        $blog->shortDescription = $request->shortDescription;
        $blog->description = $request->description;
        $blog->author = $request->author;
        // $blog->image = $request->image;
        $blog->save();

        $tempImage = TempImage::find($request->image_id);

        // if ($tempImage != null) {

        //     // 1713255034.png
        //     $imageExtensionArray = explode('.', $tempImage->name);
        //     $extension = last($imageExtensionArray);

        //     $imageName = time() . '-' . $blog->id . '.' . $extension;

        //     $blog->image = $imageName;
        //     $blog->save();

        //     $sourcePath = public_path('uploads/temp/' . $tempImage->name);
        //     $destinationPath = public_path('uploads/blogs/' . $imageName);
        //     // dd($destinationPath);
        //     File::copy($sourcePath, $destinationPath);

        $tempImage = TempImage::find($request->image_id);

        if ($tempImage != null) {

            $imageExtArray = explode('.',$tempImage->name);
            $ext = last($imageExtArray);
            $imageName = time().'-'.$blog->id.'.'.$ext;

            $blog->image = $imageName;
            $blog->save();

            $sourcePath = public_path('uploads/temp/'.$tempImage->name);
            $destPath = public_path('uploads/blogs/'.$imageName);

            File::copy($sourcePath,$destPath);
        }

        return response()->json([
            'status' => true,
            'message' => 'Blog updated successfully',
            'data' => $blog
        ]);
    }
    public function destroy( $id ){
        $blog = Blog::find($id);
        if ($blog == null) {
            return response()->json([
                'status' => false,
                'message' => 'Blog not found',
            ]);
        }

        File::delete(public_path('uploads/blogs/' . $blog->image));

        $blog->delete();

        return response()->json([
            'status' => true,
            'message' => 'Blog deleted successfully',
        ]);
    }
}
