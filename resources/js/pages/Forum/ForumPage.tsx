import { ThreadList } from '@/components/thread-list';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Forum, ThreadPaginate } from "@/types";



interface Props {
    forum: Forum;
    threads: ThreadPaginate;
}

export default function ShowForum({ forum, threads }: Props) {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: forum.title,
            href: `/forum/${forum.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={forum.title} />
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
                        <ThreadList threads={threads} forum_id={forum.id} />
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
