<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use App\User;
use HasRoles;

class UserController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::where('id', $id)->first();
        if (!$user) {
            return response()->json('Nenhum funcionário encontrado com o código '.$id, 404);
        } else {
            return response()->json($user, 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  string  $email
     * @return \Illuminate\Http\Response
     */
    public function findByEmail($email)
    {
        $user = User::where('email', $email)->first();
        if (!$user) {
            return response()->json('Nenhum funcionário encontrado com o código '.$id, 404);
        } else {
            return response()->json($user, 200);
        }

    }
}
