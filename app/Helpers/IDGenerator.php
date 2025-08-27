<?php

namespace App\Helpers;

class IDGenerator
{
    public function generate($currentId, $length = 8): mixed
    {
        $nextId = $currentId + 1;
        $paddedId = str_pad($nextId, $length, '0', STR_PAD_LEFT);

        return $paddedId;
    }
}
