<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'created_by', // Jika Anda menyertakan kolom ini
        'updated_by', // Jika Anda menyertakan kolom ini
    ];
}
