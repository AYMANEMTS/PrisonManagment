<?php

namespace App\Http\Controllers\Settings\Quartier;

use App\Http\Controllers\Controller;
use App\Models\Quartier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuartierController extends Controller
{

    public function show(string $id)
    {
        return Quartier::with('cellules')->find($id);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $qrt = Quartier::create([
            'name' => $request->name,
            'nombreDeCellule' => $request->nombreDeCellule,
            'CapacityTotal' => $request->CapacityTotal,
            'CapacityDisponible' =>$request->CapacityDisponible,
            'chefQuartier_id' => $request->chefQuartier_id
        ]);
        if ($qrt){
            return back()->with(['message'=>'Quartier created successfully',
                'status'=>'success'
            ]);
        }
        return back()->with(['message'=>'Failed to create quartier',
        'status'=>'error'
    ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Quartier::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $quartier =  Quartier::find($id);
        if ($quartier){
            $quartier->update([
                'name' => $request->name,
                'nombreDeCellule' => $request->nombreDeCellule,
                'CapacityTotal' => $request->CapacityTotal,
                'CapacityDisponible' =>$request->CapacityDisponible,
                'chefQuartier_id' => $request->chefQuartier_id
            ]);
            $quartier->save();
            return back()->with(['message'=>'Quartier updated successfully',
                'status'=>'success'
            ]);
        }
        return back()->with(['message'=>'Failed to update quartier',
            'status'=>'error']);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $qt = Quartier::find($id);
        $qt->delete();

        return redirect()->route('settings.index')->with(['message'=>'Quartier deleted successfully',
            'status'=>'warning'
        ]);

    }
}
