import { ThreadList } from '@/components/thread-list';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Forum, ThreadPaginate, type BreadcrumbItem } from "@/types";
import { createThread } from '@/routes/thread';



interface Props {
    forum: Forum;
    threads: ThreadPaginate;
}

export default function ShowForum({ forum, threads }: Props) {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: forum.title,
            href: `/forum/${forum.slug}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={forum.title} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl lg:p-4 items-center">
                <div className='w-full md:w-7/8 lg:w-3/4 flex flex-col gap-4'>
                    <div className='bg-baseColor p-6 flex flex-col gap-y-2 rounded-xl shadow-md'>
                        <h1 className="text-2xl font-bold text-blue">{forum.title}</h1>
                        <p className="text-sm">{forum.description}</p>
                    </div>
                    <div className="flex items-center h-full">
                        <Link href={createThread({ forum: forum.slug }).url}>
                            <Button variant="default">New Thread</Button>
                        </Link>
                    </div>
                    <div>
                        <ThreadList threads={threads} slug={forum.slug} baseRoute='forum' />
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
