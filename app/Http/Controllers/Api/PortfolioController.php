<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Portfolio;

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
     * Store a new portfolio.
    */
    public function store(Request $request)
    {
        // Validasi data yang diterima dari permintaan
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'link' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:255',
        ]);

        // Buat instansi Portfolio baru dengan data yang divalidasi
        $portfolio = Portfolio::create($validatedData);

        // Kembalikan respons dengan status 201 (Created)
        return response()->json(['message' => 'Portfolio created successfully', 'portfolio' => $portfolio], 201);
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

        // Validasi data yang diterima dari permintaan
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'link' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:255',
        ]);

        // Update portfolio dengan data yang divalidasi
        $portfolio->update($validatedData);

        // Kembalikan respons dengan status 200 (OK)
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
