<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
	protected $guarded = ['id'];

	protected $fillable = [
		'url', 'order', 'gallery_id',
	];

	public function gallery(){
		return $this->belongsTo(Gallery::class);

	}
}
