<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use betterapp\LaravelDbEncrypter\Traits\EncryptableDbAttribute;

class Scraper extends Model
{
    use HasFactory;
    use Notifiable;
    use EncryptableDbAttribute;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id',
        'target',
        'actor',
        'access_user',
        'access_password'
    ];

    /**
     * The attributes that should be encrypted/decrypted to/from db.
     */
    protected $encryptable = [
        'access_user',
        'access_password'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'access_user',
        'access_password'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
    ];
}
