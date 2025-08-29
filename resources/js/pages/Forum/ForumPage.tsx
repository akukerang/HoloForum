import { ThreadItem } from '@/components/thread-item';
import { ThreadList } from '@/components/thread-list';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Forum',
        href: '/forum',
    },
];

interface Thread {
    id: number;
    title: string;
    user: User;
    created_at: string;
    posts_count: number;
}

interface User {
    id: number;
    name: string;
}

interface Forum {
    id: number;
    title: string;
    slug: string;
    description: string;
    threads: Thread[];
}

interface Props {
    forum: Forum;
}

export default function Index() {
    const { forum } = usePage().props as unknown as Props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Forum" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 bg-secondary items-center">
                <div className='w-3/4 flex flex-col gap-4'>
                    <div className='bg-card p-6 flex flex-col gap-y-2 rounded-xl shadow-sm'>
                        <h1 className="text-2xl font-bold">{forum.title}</h1>
                        <p className="text-sm text-gray-500">{forum.description}</p>
                    </div>
                    <div className="flex items-center h-full">
                        <Link href={`/forum/${forum.id}/thread/create`}>
                            <Button variant="default">New Thread</Button>
                        </Link>
                    </div>
                    <div className='flex flex-col my-4 bg-card gap-1 p-2 rounded-lg shadow-sm'>
                        <ThreadList threads={forum.threads} />
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
