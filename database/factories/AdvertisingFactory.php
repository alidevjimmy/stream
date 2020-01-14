<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Advertising;
use Faker\Generator as Faker;

$factory->define(Advertising::class, function (Faker $faker) {
    return [
        'title' => $faker->title,
        'category_id' => $faker->numberBetween(1,2),
        'user_id' =>  $faker->numberBetween(1,10),
        'description' => $faker->sentence,
        'images' => $faker->sentence,
        'address' => $faker->sentence,
        'price' => (string)$faker->numberBetween(1000,9000),
        'type' => $faker->title
    ];
});
