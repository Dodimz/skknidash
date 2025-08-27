<?php

namespace App\Repositories\Admin;

use App\Models\Comment;
use App\Repositories\Traits\ModelRepositoryTraits;

class CommentRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify posts table
     */
    protected Comment $model;

    /**
     * Constructor for Comment repository
     */
    public function __construct(Comment $comment)
    {
        $this->model = $comment;
    }

    public function paginateSearchResult($search, array $sort = [])
    {
        $query = $this->model->with('post')->newQuery();

        if ($search) {
            $query->orWhere('comment_content', 'like', "%$search%")
                ->orWhere('comment_author_email', 'like', "%$search%")
                ->orWhere('comment_author_name', 'like', "%$search%");
        }

        // sort comment
        if ($sort['column']) {
            $query->orderBy($sort['column'], $sort['order']);
        }

        return $query->paginate(30);
    }

    /**
     * Comment approved
     */
    public function approved(Comment $comment): void
    {
        $comment->update(['is_approved' => '1']);
    }

    /**
     * Comment unApproved
     */
    public function unApproved(Comment $comment): void
    {
        $comment->update(['is_approved' => '0']);
    }
}
