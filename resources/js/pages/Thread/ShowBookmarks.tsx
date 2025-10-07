import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ThreadPaginate, type BreadcrumbItem } from "@/types";
import { ThreadList } from '@/components/thread-list';



interface Props {
    threads: ThreadPaginate;
}

export default function ShowBookmarks({ threads }: Props) {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Bookmarks',
            href: `/bookmarks`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Bookmarked Threads" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl lg:p-4 items-center">
                <div className='w-full md:w-7/8 lg:w-3/4 flex flex-col gap-4'>
                    <div className='bg-baseColor p-6 flex flex-col gap-y-2 rounded-xl shadow-md'>
                        <h1 className="text-2xl font-bold text-blue">Bookmarks</h1>
                        <p className="text-sm">List of threads you have bookmarked.</p>
                    </div>
                    <div>
                        <ThreadList threads={threads} slug='' baseRoute='bookmarks' />
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
