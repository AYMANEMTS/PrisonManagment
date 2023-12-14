<?php

namespace App\Http\Controllers\Settings\Grades;

use App\Http\Controllers\Controller;
use App\Models\Grade;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GradeController extends Controller
{

    public function store(Request $request)
    {
        $request->validate(['name'=>'required']);
        Grade::create(['name' => $request->name]);
        return redirect()->route("settings.index")->with(['message'=>'grade created successfully',
            'status'=>'success'
            ]);
    }

    public function edit(string $id)
    {
        return Grade::findOrFail($id);
    }
    public function update(Request $request, string $id)
    {
        $request->validate(['name'=>'required']);
        $grade = Grade::findOrFail($id);
        if($grade){
            $grade->update(['name'=>$request->name]);
            return back()->with(['message'=>'Grade updated successfully',
                'status'=>'warning'
            ]);
        }
        return back()->with(['message'=>'Failed to update grade',
            'status'=>'error'
        ]);
    }


    public function destroy(string $id)
    {
        $grade = Grade::find($id);
        $grade->delete();

        return redirect()->route('settings.index')->with(['message'=>'grade deleted successfully',
            'status'=>'warning'
            ]);

    }
}
