<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Forum;

class GenerateForumSlugs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generate-forum-slugs';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Regenerates slugs for forums based on the title';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Resets all slugs
        Forum::all()->each(function ($forum) {
            $forum->slug = null;
            $forum->generateSlug(); // force regenerate
            $forum->save();
        });

        $this->info('Forum slugs generated successfully.');
    }
}
