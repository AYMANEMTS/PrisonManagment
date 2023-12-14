<?php

namespace App\Http\Controllers\Settings\Cellule;

use App\Http\Controllers\Controller;
use App\Models\Cellule;
use Illuminate\Http\Request;

class CelluleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $cll = Cellule::create([
            'name' => $request->name,
            'CapacityTotal' => $request->CapacityTotal,
            'CapacityDisponible' =>$request->CapacityDisponible,
            'quartier_id' => $request->quartier_id,
        ]);
        if ($cll){
            return back()->with(['message'=>'Cellule created successfully',
                'status'=>'success'
            ]);
        }
        return back()->with(['message'=>'Failed to create cellule',
            'status'=>'error'
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
        $cellule =  Cellule::find($id);
        if ($cellule){
            $cellule->update([
                'name' => $request->name,
                'CapacityTotal' => $request->CapacityTotal,
                'CapacityDisponible' =>$request->CapacityDisponible,
                'quartier_id' => $request->quartier_id,
            ]);
            $cellule->save();
            return back()->with(['message'=>'Cellule updated successfully',
                'status'=>'success'
            ]);
        }
        return back()->with(['message'=>'Failed to cellule quartier',
            'status'=>'error']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $cl = Cellule::find($id);
        $cl->delete();

        return redirect()->route('settings.index')->with(['message'=>'Cellule deleted successfully',
            'status'=>'warning'
        ]);
    }
}
