<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Company;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $companies = Company::with('employee.user')->orderBy('name','desc')->paginate();
        return response()->json($companies, 200);
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
            'name.required'=> 'O campo Nome e obrigatorio.',
            'name.min'=> 'O campo Nome deve contar mais de :min caracteres.',
            'cnpj.required'=> 'O campo CNPJ e obrigatorio.',
            'cnpj.min'=> 'O campo CNPJ deve ser um numero valido. Minimo 14 caracteres!',
            'address.required'=> 'O campo Endereço e obrigatorio.',
        );

        $rules = array(
            'name'=>'required|min:3|regex:/^[A-Za-z0-9 ]+$/u',
            'cnpj'=>'required|min:14',
            'address'=>'required',
        );

        $validator = \Validator::make($request->all(), $rules, $messsages);

        if ($validator->fails()) {
            return response()->json($validator->messages(), 500);
        } else {
            $input = $request->all();
            $company = Company::create($input);
            if (!$company) {
                return response()->json('Nao foi possivel cadastrar a empresa!', 500);
            } else {
                return response()->json('Empresa cadastrada com sucesso!', 201);
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
        $company = Company::with('employee.user')->where('id',$id)->first();
        if (!$company) {
            return response()->json('Nenhuma empresa encontrada com o codigo '.$id, 404);
        } else {
            return response()->json($company, 200);
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
        $company = Company::find($id);
        if (!$company) {
            return response()->json('Nenhuma empresa encontrada com o codigo '.$id, 404);
        } else {
            $messsages = array(
                'name.min'=> 'O campo Nome deve contar mais de :min caracteres.',
                'cnpj.min'=> 'O campo CNPJ deve ser um numero valido. Mínimo 14 caracteres!',
                'address.min'=> 'O campo Endereço e obrigatorio.',
            );

            $rules = array(
                'name'=>'min:3|regex:/^[A-Za-z0-9 ]+$/u',
                'cnpj'=>'min:14',
                'address'=>'min:3',
            );

            $validator = \Validator::make($request->all(), $rules, $messsages);

            if ($validator->fails()) {
                return response()->json($validator->messages(), 500);
            } else {
                $input = $request->all();
                $companSave = $company->fill($input)->save();
                if (!$companSave) {
                    return response()->json('Nao foi possivel alterar a empresa!', 500);
                } else {
                    return response()->json('Empresa alterada com sucesso!', 200);
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
        $company = Company::find($id);
        if (!$company) {
            return response()->json('Nenhuma empresa encontrada com o codigo '.$id, 404);
        } else {
            $company->delete();
            return response()->json('Empresa excluida com sucesso.', 200);
        }
    }
}
