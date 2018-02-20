<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

	public function authenticate(Request $request) {
		//dd($request);
		$creadentials = $request->only(['email', 'password']);

		try{

			if(! $token = JWTAuth::attempt($creadentials)){
				return response()->json(['error'=> 'invalid_credentials'],401);

			}

		} catch (JWTException $e){
			return response()->json(['error'=> 'could_not_create_token'],500);
		}

		$user = User::where('email', $request['email'])->get()->first();

		$user = array(
			'id' => $user->id,
			'first_name' => $user->first_name,
			'last_name' => $user->last_name
		);

		return response()->json(compact('token','user'));



	}
}
