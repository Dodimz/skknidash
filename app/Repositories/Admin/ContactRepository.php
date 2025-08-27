<?php

namespace App\Repositories\Admin;

use App\Models\Contact;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ContactRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify contact table
     */
    protected Contact $contact;

    /**
     *  Constructor for contact repository
     */
    public function __construct(Contact $contact)
    {
        $this->model = $contact;
    }

    /**
     * Get contacts
     */
    public function paginateSearchResult($search, array $sort = []): LengthAwarePaginator
    {
        $query = $this->model->newQuery();

        if ($search) {
            $query->orWhere('ticket_id', 'LIKE', "%$search%")
                ->orWhere('name', 'LIKE', "%$search%")
                ->orWhere('email', 'LIKE', "%$search%");
        }

        $query->orderBy($sort['column'], $sort['order']);

        return $query->paginate(30)
            ->appends(array_filter([
                'search' => $search,
                'sort' => $sort,
            ]));
    }

    /**
     * submit contact
     */
    public function submitContact(Request $request): void
    {
        $latestContact = $this->model->latest()->first();
        $ticketid = $this->generateNewTicketID($latestContact?->ticket_id ?? null);
        $this->model->create([
            'ticket_id' => $ticketid,
            'name' => $request->name,
            'email' => $request->email,
            'project_type' => $request->project_type,
            'mobile_number' => $request->mobile_number,
            'message' => $request->message,
        ]);
    }

    /**
     * Generate ticket id
     */
    private function generateNewTicketID($prevTicketID): string
    {
        if ($prevTicketID) {
            // Remove leading zeros and convert to an integer
            $prevTicketNumber = intval($prevTicketID);

            // Increment the previous ticket number by 1
            $newTicketNumber = $prevTicketNumber + 1;

            // Get the number of digits in the previous ticket ID
            $numberOfDigits = strlen($prevTicketID);

            // Format the new ticket ID with leading zeros
            $newTicketID = sprintf("%0{$numberOfDigits}d", $newTicketNumber);

            return $newTicketID;
        } else {
            return '000001';
        }
    }

    /**
     * Delete contact
     */
    public function destroy(Contact $contact): void
    {
        $contact->delete();
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request): void
    {
        $ids = explode(',', $request->ids);
        $this->model->whereIn('id', $ids)->delete();
    }

    /**
     * Export CSV
     */
    public function exportCsv()
    {
        $fileName = 'contacts.csv';
        $contacts = Contact::all(['name', 'email', 'mobile_number', 'project_type', 'message']);

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"$fileName\"",
            'Cache-Control' => 'no-store, no-cache, must-revalidate',
            'Pragma' => 'no-cache',
            'Expires' => '0',
        ];

        $callback = function () use ($contacts) {
            $file = fopen('php://output', 'w');
            fputcsv($file, ['Name', 'Email', 'Mobile Number', 'Project Type', 'Message']);

            foreach ($contacts as $contact) {
                fputcsv($file, [
                    $contact->name,
                    $contact->email,
                    $contact->mobile_number,
                    $contact->project_type,
                    $contact->message,
                ]);
            }
            fclose($file);
        };

        return new StreamedResponse($callback, 200, $headers);
    }
}
