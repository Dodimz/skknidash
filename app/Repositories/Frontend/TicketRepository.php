<?php

namespace App\Repositories\Frontend;

use App\Helpers\IDGenerator;
use App\Models\Ticket;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;

class TicketRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify tickets table
     */
    protected Ticket $model;

    /**
     * Constructor for Ticket repository
     */
    public function __construct(Ticket $ticket)
    {
        $this->model = $ticket;
    }

    /**
     * Get search result with pagination
     */
    public function paginateSearchResult(): LengthAwarePaginator
    {
        $query = $this->model->with(['replies.user', 'user'])->where('user_id', Auth::user()->id)->newQuery();

        return $query->paginate(10);
    }

    /**
     * Create a new ticket
     */
    public function create(Request $request): void
    {
        /** store file **/
        $filePaths = [];

        if ($request->hasFile('documents')) {
            foreach ($request->file('documents') as $file) {
                $originalFileName = $file->getClientOriginalName();
                $fileName = $this->generateFileName($originalFileName);
                $filePath = $file->storeAs('tickets', $fileName);
                $filePaths[] = $filePath;
            }
        }

        /** generate ticket id **/
        $maxId = $this->model->max('id');
        $IDGenerator = new IDGenerator;

        /** assign tickets **/
        $this->model->create([
            'user_id' => Auth::user()->id,
            'generate_id' => $IDGenerator->generate($maxId),
            'subject' => $request->input('subject'),
            'properly' => $request->input('properly'),
            'message' => $request->input('message'),
            'documents' => json_encode($filePaths),
            'is_viewed' => 0,
            'is_client_viewed' => 0,
            'status' => 'pending',
        ]);
    }

    /**
     * Generate File Original name
     */
    public function generateFileName($originalFileName): mixed
    {
        /** check if the file with the same name already exist **/
        if ($this->model->where('original_file_name', $originalFileName)->exists()) {
            $maxSerial = $this->model->where('original_file_name', $originalFileName)->count() + 1;
            $fileName = pathinfo($originalFileName, PATHINFO_FILENAME).'-'.$maxSerial.'.'.pathinfo($originalFileName, PATHINFO_EXTENSION);
        } else {
            $fileName = $originalFileName;
        }

        return $fileName;
    }

    /**
     * Create a reply for a ticket with file attachment
     */
    public function createReply(Request $request, Ticket $ticket): void
    {
        $filePaths = [];

        if ($request->hasFile('documents')) {
            foreach ($request->file('documents') as $file) {
                $originalFileName = $file->getClientOriginalName();
                $fileName = $this->generateFileName($originalFileName);
                $filePath = $file->storeAs('tickets', $fileName);
                $filePaths[] = $filePath;
            }
        }

        $ticket->replies()->create([
            'user_id' => Auth::id(),
            'reply' => $request->input('message'),
            'documents' => json_encode($filePaths),
        ]);
    }

    /**
     * Bulk delete tickets
     */
    public function bulkDelete(Request $request): void
    {
        $ids = explode(',', $request->ids);
        Ticket::whereIn('id', $ids)->delete();
    }
}
