import { ThreadItem } from "./thread-item";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import PaginationCustom from "./pagination";
import { Thread, ThreadPaginate } from "@/types";
import { router, usePage } from "@inertiajs/react";
import Empty from "./empty";

interface Props {
    threads: ThreadPaginate;
}

export function ResultThreadList({ threads }: Props) {
    const { url } = usePage()
    const params = new URLSearchParams(url.split('?')[1])
    const sort = params.get('sort') || 'recent'
    const keywords = params.get('keywords') || ''
    const user = params.get('user') || ''
    const forum = params.get('forum') || ''
    const results = params.get('results') || ''

    const threadCount = threads.total;
    const currentSort = sort;

    const onSort = (sortValue: string) => {
        router.get(`/results`, {
            sort: sortValue,
            page: 1,
            keywords: keywords,
            user: user,
            forum: forum,
            results: results
        }, {
            preserveState: true,
            replace: true,
        })
    }

    return (
        <div className="flex flex-col gap-1">
            {threadCount > 0 ? (
                <>
                    <div className="flex border-b bg-crust px-3 py-2 justify-between rounded-t-lg">
                        {threads.last_page > 1 ? (
                            <PaginationCustom links={threads.links} />)
                            : <div></div>}

                        <div>
                            <Select
                                value={currentSort}
                                onValueChange={(value) => onSort(value)}
                            >
                                <SelectTrigger className="w-[160px]">
                                    <SelectValue placeholder="Sort By" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="recent">Most Recent</SelectItem>
                                    <SelectItem value="replies">Replies</SelectItem>
                                    <SelectItem value="title">Title</SelectItem>
                                    <SelectItem value="latest">Newest</SelectItem>
                                    <SelectItem value="oldest">Oldest</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                    </div>
                    {threads.data.map((thread: Thread) => (
                        <ThreadItem key={thread.id} thread={thread} />
                    ))}
                </>
            ) : (
                <Empty message="No threads found" />
            )}
        </div>
    )


}
