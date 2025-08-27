<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Category;
use App\Models\PortfolioCategory;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Category::create(['title' => 'Uncategorized']);
        // PortfolioCategory::create(['title' => 'Uncategorized']);
        // $this->call(PageSeeder::class);
        // $this->call(ThemeSeeder::class);
        // $this->call(SettingSeeder::class);
        $this->call(RolePermissionSeeder::class);
        // $this->call(CurrencySeeder::class);
        // $this->call(LanguageSeeder::class);

        User::create(['name' => 'Mahadi Hasan', 'email' => 'mahadicreation@gmail.com', 'about' => 'Full stack web developer', 'password' => Hash::make('password'), 'email_verified_at' => Carbon::now()])->assignRole('admin');
        User::create(['name' => 'Rakibul Islam', 'email' => 'dr.rakibulislammridha@gmail.com', 'about' => 'Full stack web developer', 'password' => Hash::make('password'), 'email_verified_at' => Carbon::now()])->assignRole('admin');
        User::create(['name' => 'Tamzid Bin Mortaza', 'email' => 'tamzidbinmortaza@gmail.com', 'about' => 'Frontend web developer', 'password' => Hash::make('password'), 'email_verified_at' => Carbon::now()])->assignRole('admin');
        //
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
