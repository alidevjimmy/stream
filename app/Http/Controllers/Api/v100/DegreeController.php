<?php

namespace App\Http\Controllers\Api\v100;

use App\Degree;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DegreeController extends Controller
{
    public function show()
    {
        $degrees = Degree::all();
        return response()->json($degrees);
    }
}
