<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model {
	//
	protected $guarded = ['id'];

	public static function getAllGalleries() {
		return self::with('user')->with(['images'], function ($q) {
			return $q->whereNotNull('url')->orderBy('order', 'asc');
		})->take(10)->get();
	}

	public static function getSingleGallery($id){
		return self::with('user')->with(['images'], function ($q) {
			return $q->whereNotNull('url')->orderBy('order', 'asc');
		})->find($id);
	}




	public static function getAuthorGalleries($id){
		return self::with('user')->with(['images'], function ($q) {
			return $q->whereNotNull('url')->orderBy('order', 'asc');
		})->where('user_id',$id)->get();

	}

	public function images() {
		return $this->hasMany(Image::class);
	}

	public function user() {
		return $this->belongsTo(User::class);
	}

	public function comments(){
		return $this->hasMany(Comment::class)->orderBy('created_at', 'DESC');
	}
}
