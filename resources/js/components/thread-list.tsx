
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

interface Props {
    threads: ThreadPaginate;
    forum_id: number;
    user: User;
}

export function ThreadList({ threads, forum_id, user }: Props) {

    const threadCount = threads.total;
    const totalPages = threads.last_page;
    const currentPage = threads.current_page;




    // const sortedThreads = useMemo(() => {
    //     let sorted = [...threads.data]
    //     switch (sortBy) {
    //         case "start_date":
    //             // sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    //             break
    //         case "title":
    //             // sorted.sort((a, b) => a.title.localeCompare(b.title))
    //             break
    //         case "replies": // TODO: Implement
    //             break
    //         case "recent":
    //             break
    //         default:
    //             sorted = threads.data
    //     }
    //     return sorted
    // }, [threads, sortBy])

    return (
        <div className="flex flex-col bg-card gap-1">
            {threadCount > 0 ? (
                <>
                    <div className="flex border-b p-2">
                        <PaginationCustom currentPage={currentPage} lastPage={totalPages}
                            baseUrl={`/forum/${forum_id}?page=`} />
                        <div>
                            <Select
                            // onValueChange={(value) => {
                            // setSortBy(value);
                            // setPage(1);
                            // }}
                            >
                                <SelectTrigger className="w-[160px]">
                                    <SelectValue placeholder="Sort By" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="title">Title</SelectItem>
                                    <SelectItem value="recent">Most Recent</SelectItem>
                                    <SelectItem value="start_date">Start Date</SelectItem>
                                    <SelectItem value="replies">Replies</SelectItem>
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
