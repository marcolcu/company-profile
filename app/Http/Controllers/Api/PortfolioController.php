<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Portfolio;
use Illuminate\Support\Facades\Validator;

class PortfolioController extends Controller
{
    /**
     * View all portfolios.
     */
    public function index()
    {
        $portfolios = Portfolio::all();

        if ($portfolios->isEmpty()) {
            return response()->json(['message' => 'Portfolio not found'], 404);
        }

        return response()->json($portfolios, 200);
    }

    /**
     * View portfolio by ID.
     */
    public function show($id)
    {
        $portfolio = Portfolio::find($id);

        if (!$portfolio) {
            return response()->json(['message' => 'Portfolio not found'], 404);
        }

        return response()->json($portfolio, 200);
    }

    /**
     * Update portfolio by ID.
     */
    public function update(Request $request, $id)
    {
        $portfolio = Portfolio::find($id);

        if (!$portfolio) {
            return response()->json(['message' => 'Portfolio not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:255',
            'description' => 'nullable|string',
            'link' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:255',
            'updateby' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $portfolio->update($request->all());

        return response()->json(['message' => 'Portfolio updated successfully', 'portfolio' => $portfolio], 200);
    }

    /**
     * Delete portfolio by ID.
     */
    public function destroy($id)
    {
        $portfolio = Portfolio::find($id);

        if (!$portfolio) {
            return response()->json(['message' => 'Portfolio not found'], 404);
        }

        $portfolio->delete();

        return response()->json(['message' => 'Portfolio deleted successfully'], 200);
    }
}
