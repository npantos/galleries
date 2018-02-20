<?php

use Faker\Generator as Faker;

$factory->define(\App\Gallery::class, function (Faker $faker) {
	return [
		'title' => $faker->text(20),
		'body' => $faker->paragraph,
		'user_id' => $faker->numberBetween(1,10),
	];
});