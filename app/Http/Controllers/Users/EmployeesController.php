<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\Employe;
use App\Models\Grade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
class EmployeesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employees = Employe::query()->with('grade')->get();
        return Inertia::render('Employees/Index',[
            'employees' => $employees,

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Employees/Form',[
            'isUpdate' => false,
            'grades' => Grade::all(),
            'emails' => Employe::all()->pluck('email')
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'fullName' => 'required|max:255',
            'CNN' => 'required|max:8|unique:'.Employe::class,
            'grade_id' => 'required',
            'phone' => 'required|max:12',
            'email' => 'required|string|lowercase|email|max:255|unique:'.Employe::class,
            'password' => ['required', 'confirmed'],
            'gender' => 'required',
            "image" => 'nullable|image',
            'dateBirthday' => 'nullable|date',
            'address' => 'nullable'
        ]);
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store("employees/images", "public");
        }
        $data['password'] = Hash::make($data['password']);
        Employe::create($data);
        return to_route('employees.index')->with(['message'=>'Employee created successfully',
            'status'=>'success'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $ids = $request->post('ids',[]);
        $employees = Employe::whereIn('id',$ids)->get();
        foreach ($employees as $employee){
            $employee->delete();
        }
        return back()->with(['message'=>'Employee deleted successfully',
            'status'=>'warning'
        ]);
    }
}
