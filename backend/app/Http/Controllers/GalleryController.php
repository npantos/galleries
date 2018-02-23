<?php

namespace App\Http\Controllers;

use App\Gallery;
use App\Image;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
	 *
	 * @param null $search
	 * @return mixed
     */
    public function index($author, $page = 1, $search = null)
    {

    	return Gallery::getAllGalleries($author,($page - 1) * 10, 10, $search);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
		$user = JWTAuth::parseToken()->authenticate();

		$gallery = new Gallery();

		$gallery->title = $request->input('title');
		$gallery->body = $request->input('body');
		$gallery->user_id = $user->id;

		$gallery->save();

		$imagesArray = $request->input('images');
		$images = [];

		foreach ($imagesArray as $image) {
			$newImage = new Image($image);

			$images[] = $newImage;
		}

		$gallery->images()->saveMany($images);

		return $gallery;



	}

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Gallery::getSingleGallery($id);
    }


    public function showAuthor($id){
    	return Gallery::getAuthorGalleries($id);
	}

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
		$gallery = Gallery::find($id);

		$gallery->title = $request->input('title');
		$gallery->body = $request->input('body');

		$gallery->save();

		$imagesArray = $request->input('images');
		$images = [];

		$oldImages = Image::where('gallery_id',$id);
		$oldImages->delete();

		foreach ($imagesArray as $image) {
			$newImage = new Image($image);

			$images[] = $newImage;
		}

		$gallery->images()->saveMany($images);

		return $gallery;



	}

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
		$contact = Gallery::find($id);
		$contact->delete();

		return Gallery::all();
    }
}
