<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    //
	protected $guarded = ['id'];

	public static function getAllGalleries(){
		return self::with(['images'], function($q) {
			return $q->whereNotNull('url');
		})->get();
	}

	public function images(){
		return $this->hasMany(Image::class)->orderBy('order', 'asc');
	}
}
