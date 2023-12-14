<?php

namespace App\Http\Controllers\Tasks;

use App\Http\Controllers\Controller;
use App\Models\Appel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppelController extends Controller
{
    public function getTodayAppels()
    {
        $user = Auth::user();
        $appels = [];
        if ($user->isChefQuartier()){
            $appels = Appel::where('chefQartier_id',$user->id)
                ->where('status','fresh')->get();
        }
        return Inertia::render('Tasks/Appels',[
            'appels'=>$appels
        ]);
    }
    public function storeAppel(Request $request,String $id)
    {
        $appel = Appel::find($id);
        $data = $request->validate([
            'nombreDesPrisoners' => 'required',
            'remarque' => 'required|numeric'
        ]);
        if ($appel){
            $data['status'] = 'done';
            $data['dateExecute'] = now();
            $appel->update($data);
            $appel->save();
            return back()->with([
                'status' => 'success',
                'message' => "Cellule ({$appel->cellule_id}) is done"
            ]);
        }
        return back()->with([
            'status' => 'error',
            'message' => 'Appel not found'
        ]);
    }
}
