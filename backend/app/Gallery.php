<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model {
	//
	protected $guarded = ['id'];

	public static function getAllGalleries($search) {
		return self::take(10)
			->with(['images'], function ($q) {
				return $q->whereNotNull('url')->orderBy('order', 'asc');
			})
			->with('user')->whereHas('user', function ($q) use ($search) {
				$q->where('first_name', 'like', '%' . $search . '%');

			})
			->orWhere(function ($query) use ($search) {
				$query->orWhere('title', 'like', '%' . $search . '%')
					->orWhere('body', 'like', '%' . $search . '%');
			})
			->get();
	}

	public static function getSingleGallery($id) {
		return self::with('user')
			->with(['images'], function ($q) {
				return $q->whereNotNull('url')->orderBy('order', 'asc');
			})
			->find($id);
	}


	public static function getAuthorGalleries($id) {
		return self::with('user')->with(['images'], function ($q) {
			return $q->whereNotNull('url')->orderBy('order', 'asc');
		})
			->where('user_id', $id)->get();

	}

	public function images() {
		// ne pitaj šta je ovo, nešto sam se bio zainatio da se zove isto :D
		if (debug_backtrace()[8]['function'] == 'getAllGalleries') {
			return $this->hasOne(Image::class);
		}
		return $this->hasMany(Image::class);
	}


	public function user() {
		return $this->belongsTo(User::class);
	}

}
