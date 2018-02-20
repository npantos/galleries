<?php

use Faker\Generator as Faker;

$factory->define(\App\Image::class, function (Faker $faker) {
	return [
		'url' => $faker->imageUrl(),
		'order' => $faker->numberBetween(1,10),
		'gallery_id' => $faker->numberBetween(1,40),
	];
});
