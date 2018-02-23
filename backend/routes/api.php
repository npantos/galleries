<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});

// login
Route::post('/login','Auth\LoginController@authenticate');
Route::post('/register','Auth\RegisterController@create');
Route::get('/all-galleries/{author}/{page?}/{search?}','GalleryController@index');
Route::get('/single-gallery/{id}','GalleryController@show');
Route::get('/author/{id}','GalleryController@showAuthor');
Route::get('/comments/{id}','CommentsController@show');
Route::post('/comments','CommentsController@store');

// delete comment
Route::middleware('jwt')->delete('/comment/{id}','CommentsController@destroy');

// create gallery
Route::middleware('jwt')->post('/add-gallery','GalleryController@store');


//delete gallery
Route::middleware('jwt')->delete('/gallery/{id}','GalleryController@destroy');

//edit gallery
Route::middleware('jwt')->put('/edit-gallery/{id}','GalleryController@update');



// TODO
//Route::middleware('jwt')->get('/single-gallery/{id}','GalleryController@show');
//Route::middleware('jwt')->post('/register','Auth\RegisterController@create');