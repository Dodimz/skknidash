<?php

namespace Database\Seeders;

use App\Models\Theme;
use Illuminate\Database\Seeder;

class ThemeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Theme::create(['name' => 'Default Theme', 'identifier' => 'default', 'thumbnail_image' => '/static/default_theme.jpeg', 'is_active' => '1']);
        Theme::create(['name' => 'Photography Agency', 'identifier' => 'photography_agency', 'thumbnail_image' => '/static/photography-agency-theme.jpeg', 'is_active' => '0']);
        Theme::create(['name' => 'Creative Portfolio', 'identifier' => 'creative_portfolio', 'thumbnail_image' => '/static/portfolio-theme.jpeg', 'is_active' => '0']);
        Theme::create(['name' => 'Digital Agency', 'identifier' => 'digital_agency', 'thumbnail_image' => '/static/digital-agency-theme.jpeg', 'is_active' => '0']);
        Theme::create(['name' => 'Marketing Agency', 'identifier' => 'marketing_agency', 'thumbnail_image' => '/static/marketing-theme.jpeg', 'is_active' => '0']);
        Theme::create(['name' => 'Freelancing Agency', 'identifier' => 'freelancing_agency', 'thumbnail_image' => '/static/freelancer-agency.jpeg', 'is_active' => '0']);
        Theme::create(['name' => 'Architecture Agency', 'identifier' => 'architecture_agency', 'thumbnail_image' => '/static/architecture-agency.jpeg', 'is_active' => '0']);
        Theme::create(['name' => 'Creative Solution', 'identifier' => 'creative_solution', 'thumbnail_image' => '/static/creative-solution.jpeg', 'is_active' => '0']);
        Theme::create(['name' => 'Personal Portfolio', 'identifier' => 'personal_portfolio', 'thumbnail_image' => '/static/personal-portfolio.jpeg', 'is_active' => '0']);
    }
}
