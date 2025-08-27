<?php

namespace App\Repositories\Admin;

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
     *
     * @param  string|null  $search
     */
    public function paginateSearchResult($search, array $sort = []): LengthAwarePaginator
    {
        $query = $this->model->with(['replies.user', 'user'])->newQuery();

        if (isset($search)) {
            $query->where('subject', 'like', '%'.$search.'%');
        }

        return $query->paginate(30)
            ->appends(array_filter([
                'search' => $search,
                'sort' => $sort,
            ]));
    }

    public function generateFileName($originalFileName)
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

        // update ticket status
        $ticket->update(['status' => $request->input('status')]);
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
