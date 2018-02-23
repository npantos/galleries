<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model {
	//
	protected $guarded = ['id'];
	protected $fillable = [
		'title', 'body', 'user_id',
	];

	public static function getAllGalleries($author, $skip, $take, $search) {
		$query = self::with('user');

		if($author !='all'){
			$query->where('user_id',$author);
		}

		$query->with(['images'], function ($q) {
				return $q->whereNotNull('url')->orderBy('order', 'asc');
			});

		if(!empty($search)){
			$query->where(function ($q) use ($search) {
				$q->where('title', 'like', '%' . $search . '%')
					->orWhere('body', 'like', '%' . $search . '%')
					->orWhereHas('user', function($q) use ($search) {
						$q->where('first_name', 'like', '%' . $search . '%')
							->orWhere('last_name', 'like', '%' . $search . '%');
					});
			});
		}

		$count = $query->count();
		$galleries = $query->take($take)->skip($skip)->orderBy('id', 'desc')->get();

		return compact('count', 'galleries');
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
