<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\Cellule;
use App\Models\Prisoner;
use App\Models\Quartier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PrisonerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Prisonrs/Index',[
            'prisoners' => Prisoner::with(['cellule','cellule.quartier'])->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Prisonrs/Form',[
            'cellules' => Cellule::all(),
            'quartiers' => Quartier::all(),
            'isUpdate' => false
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "fullName" => 'required',
            "CNN" => 'required',
            "dateBirthday" => 'required|date',
            "address" => 'required',
            "status" => 'required',
            "maladies" => 'required',
            "dateOfEntry" => 'required|date',
            "crime" => 'required',
            "cellule_id" => 'required|numeric',
            "contactEmergency" => 'required',
            "gender" => 'required',
            "image" => 'nullable|image'
        ]);
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store("prisoners/images", "public");
        }
        $pris = Prisoner::create([
            "fullName" => $request->fullName,
            "CNN" => $request->CNN,
            "dateBirthday" => $request->dateBirthday,
            "address" => $request->address,
            "status" => $request->status,
            "maladies" => $request->maladies,
            "dateOfEntry" => $request->dateOfEntry,
            "crime" => $request->crime,
            "cellule_id" => $request->cellule_id,
            "contactEmergency" => $request->contactEmergency,
            "gender" => $request->gender,
            "image" => $imagePath,
            "dateOfSortie" => $request->dateOfSortie
        ]);
        if ($pris){
            return to_route('prisoners.index')->with([
                'status' => 'success',
                'message' => 'Prisoner created successfully'
            ]);
        }
        return back()->with([
            'status' => 'error',
            'message' => 'failed to create prisoner'
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
        $prisoner = Prisoner::with(['cellule', 'cellule.quartier'])->find($id);
        return Inertia::render('Prisonrs/Form',[
            'cellules' => Cellule::all(),
            'quartiers' => Quartier::all(),
            'isUpdate' => true,
            'prisonerEdit' => $prisoner
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $pris = Prisoner::find($id);
        $data = $request->validate([
            "fullName" => 'required',
            "CNN" => 'required',
            "dateBirthday" => 'required|date',
            "address" => 'required',
            "status" => 'required',
            "maladies" => 'required',
            "dateOfEntry" => 'required|date',
            "crime" => 'required',
            "cellule_id" => 'required|numeric',
            "contactEmergency" => 'required',
            "gender" => 'required',
        ]);
        $imagePath = null;
        if ($request->hasFile('image')) {
            if ($pris->image !== null) {
                Storage::disk('public')->delete($pris->image);
            }
            $imagePath = $request->file('image')->store("prisoners/images", "public");
            $data['image'] = $imagePath;
        }
        $pris->update($data);

        return to_route('prisoners.index')->with([
            'status' => 'success',
            'message' => 'Prisoner updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $prisoner = Prisoner::findOrFail($id);
        $prisoner->delete();
        return to_route('prisoners.index')->with([
            'status' => 'warning',
            'message' => 'Prisoner deleted successfully'
        ]);
    }
}
