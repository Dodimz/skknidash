<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class TicketReply extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [];

    /**
     * Get the ticket associated with the reply.
     */
    public function ticket(): BelongsTo
    {
        return $this->belongsTo(Ticket::class);
    }

    /**
     * Get the URL of the reply file.
     */
    public function getReplyDocumentsUrlAttribute(): ?string
    {
        if ($this->documents) {
            return Storage::url($this->documents);
        }

        return null;
    }

    /**
     * Get the user who replied.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
