<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
class LoginController extends Controller
{
    public function view()
    {
        if (Auth::user()){
            return redirect()->route('dash');
        }
        return Inertia::render('Authentication/Login');
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->only("email","password"),[
            "email" => 'required|email',
            "password" => 'required'
        ]);
        if ($validator->fails()){
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ]);
        }
        $data = $request->only("email","password");
        if (Auth::attempt($data)){
            $request->session()->regenerate();
            return response()->json([
                'success' => true,
            ]);
        }else {
            return response()->json([
                'success' => false,
                'error' => 'email or password is incorrect'
            ]);
        }
    }
}
