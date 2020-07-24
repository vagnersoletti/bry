<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Employee;
use App\User;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $employees = Employee::with('user', 'company')->paginate();
        return response()->json($employees, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $messsages = array(
            'login.required'=> 'O campo Nome e obrigatorio.',
            'login.min'=> 'O campo Login deve conter mais de :min caracteres.',
            'name.required'=> 'O campo Nome e obrigatorio.',
            'name.min'=> 'O campo Nome deve conter mais de :min caracteres.',
            'cpf.required'=> 'O campo CNPJ e obrigatorio.',
            'cpf.min'=> 'O campo CNPJ deve ser um número valido. Minimo 14 caracteres!',
            'address.required'=> 'O campo Endereço e obrigatorio.',
        );

        $rules = array(
            'login'=>'required|min:3|unique:users|regex:/^[A-Za-z0-9]+$/u',
            'name'=>'required|min:3|regex:/^[A-Za-z0-9 ]+$/u',
            'cpf'=>'required|min:11',
            'email'=>'required|email|max:255|unique:users',
            'address'=>'required',
            'password' => 'required|min:8|confirmed',
        );

        $validator = \Validator::make($request->all(), $rules, $messsages);

        if ($validator->fails()) {
            return response()->json($validator->messages(), 500);
        } else {
            $input = $request->all();
            $user = User::create([
                'login' => $input['login'],
                'name' => $input['name'],
                'email' => $input['email'],
                'password' => Hash::make($input['password'])
            ]);
            $user->assignRole('user');

            $employee = Employee::create([
                'user_id'=> $user['id'],
                'company_id'=> $input['company_id'],
                'cpf' => $input['cpf'],
                'address' => $input['address']
            ]);

            if (!$employee) {
                return response()->json('Não foi possivel cadastrar o funcionario!', 500);
            } else {
                return response()->json('Funcionario cadastrado com sucesso!', 201);
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $employee = Employee::with('user', 'company')->where('id',$id)->first();
        if (!$employee) {
            return response()->json('Nenhum funcionario encontrado com o codigo '.$id, 404);
        } else {
            return response()->json($employee, 200);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $employee = Employee::find($id);
        $user = User::find($employee->user_id);
        if (!$employee) {
            return response()->json('Nenhum funcionario encontrado com o codigo '.$id, 404);
        } else {
            $messsages = array(
                'login.min'=> 'O campo Login deve conter mais de :min caracteres.',
                'name.min'=> 'O campo Nome deve conter mais de :min caracteres.',
                'cpf.min'=> 'O campo CNPJ deve ser um número valido. Minimo 14 caracteres!',
                'address.min'=> 'O campo Endereço e obrigatorio.',
            );

            $rules = array(
                'login'=>'min:3|unique:users|regex:/^[A-Za-z0-9]+$/u',
                'name'=>'min:3|regex:/^[A-Za-z0-9 ]+$/u',
                'cpf'=>'min:11',
                'email'=>'email|max:255|unique:users',
                'address'=>'min:3',
                'password' => 'min:8|confirmed',
            );

            $validator = \Validator::make($request->all(), $rules, $messsages);

            if ($validator->fails()) {
                return response()->json($validator->messages(), 500);
            } else {
                if ($request->has('name')) {
                    $inputUser['name'] = $request->input('name');
                }
                if ($request->has('email')) {
                    $inputUser['email'] = $request->input('email');
                }
                if ($request->has('password')) {
                    $inputUser['password'] = Hash::make($request->input(['password']));
                }
                $user->fill($inputUser)->save();

                if ($request->has('cpf')) {
                    $inputEmployee['cpf'] = $request->input('cpf');
                }
                if ($request->has('address')) {
                    $inputEmployee['address'] = $request->input('address');
                }
                if ($request->has('company_id')) {
                    $inputEmployee['company_id'] = $request->input('company_id');
                }
                $employee->fill($inputEmployee)->save();

                if (!$employee) {
                    return response()->json('Nao foi possivel cadastrar o funcionario!', 500);
                } else {
                    return response()->json('Funcionario alterado com sucesso!', 201);
                }
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $employee = Employee::find($id);
        if (!$employee) {
            return response()->json('Nenhum funcionario encontrado com o codigo '.$id, 404);
        } else {
            $employee->delete();
            return response()->json('Funcionario excluida com sucesso.', 200);
        }
    }
}
