<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->runSQL('Sql/currencies.sql');
    }

    private function runSQL($sql)
    {
        $this->command->info('Running SQL: '.$sql);
        $rawSQL = file_get_contents(__DIR__.DIRECTORY_SEPARATOR.$sql);
        DB::unprepared($rawSQL);
        $this->command->info('Finished SQL: '.$sql);
    }
}
