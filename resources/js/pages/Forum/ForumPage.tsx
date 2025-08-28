import { Category } from '@/components/category';
import AppLayout from '@/layouts/app-layout';
import { forumShow } from '@/routes/forum';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Forum',
        href: '/forum',
    },
];



interface Thread {
    id: number;
    title: string;
    user_id: number;
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
                    <div>
                        <h1 className="text-2xl font-bold">{forum.title}</h1>
                        <p className="text-sm text-gray-500">{forum.description}</p>
                    </div>
                    {forum.threads.length > 0 ? (
                        <>
                            {forum.threads.map((thread) => (
                                <div key={thread.id}>
                                    <h2 className="text-xl font-bold">{thread.title}</h2>
                                </div>
                            ))}
                        </>
                    ) : "No threads"

                    }

                </div>
            </div>
        </AppLayout>
    );
}
