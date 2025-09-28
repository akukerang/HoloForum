import { ResultThreadList } from "@/components/result-thread-list";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, ThreadPaginate, PostPaginate } from "@/types";
import { Head } from "@inertiajs/react";

interface Props {
    threads?: ThreadPaginate | null;
    posts?: PostPaginate | null;
}

function ResultList({ threads, posts }: Props) {
    if (threads) {
        return <ResultThreadList threads={threads} />
    }
    if (posts) {
        return <div>Posts</div>
    }
    return <div>Nothing</div>
}

export default function Results({ threads, posts }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Search Results`,
            href: `/search/results`,
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Search Results" />
            <div className="flex h-full flex-1 flex-col gap-2 overflow-x-auto lg:px-4 pt-4 items-center">
                <div className='w-full md:w-7/8 lg:w-3/4 flex flex-col'>
                    <h1 className="text-2xl font-bold text-blue mb-1">Search Results</h1>
                    <ResultList threads={threads} posts={posts} />
                </div>
            </div>
        </AppLayout>
    )
}