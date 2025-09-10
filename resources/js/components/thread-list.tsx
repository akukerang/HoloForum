import { ThreadItem } from "./thread-item";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import PaginationCustom from "./pagination";
import { Thread, ThreadPaginate, User } from "@/types";
import { router, usePage } from "@inertiajs/react";

interface Props {
    threads: ThreadPaginate;
    forum_id: number;
    user: User;
}

export function ThreadList({ threads, forum_id, user }: Props) {
    const { url } = usePage()
    const params = new URLSearchParams(url.split('?')[1])
    const sort = params.get('sort') || 'recent'

    const threadCount = threads.total;
    const currentSort = sort;

    const onSort = (sortValue: string) => {
        router.get(`/forum/${forum_id}`, { sort: sortValue, page: 1 }, {
            preserveState: true,
            replace: true,
        })
    }
    return (
        <div className="flex flex-col bg-card gap-1">
            {threadCount > 0 ? (
                <>
                    <div className="flex border-b p-2 justify-between">

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
                                    <SelectItem value="latest">Latest</SelectItem>
                                    <SelectItem value="title">Title</SelectItem>
                                    <SelectItem value="oldest">Oldest</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                    </div>
                    {threads.data.map((thread: Thread) => (
                        <ThreadItem key={thread.id} thread={thread} user={user} />
                    ))}
                </>
            ) : (
                "No threads"
            )}
        </div>
    )


}
