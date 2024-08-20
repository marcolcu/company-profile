<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    use HasFactory;

    protected $table = 'portfolio';

    protected $fillable = [
        'nama',
        'description',
        'link',
        'type',
        'createby',
        'updateby',
    ];

    /**
     * Relasi ke User yang membuat portfolio.
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'createby');
    }

    /**
     * Relasi ke User yang mengupdate portfolio.
     */
    public function updater()
    {
        return $this->belongsTo(User::class, 'updateby');
    }
}
