
import { ThreadItem } from "./thread-item";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import PaginationCustom from "./pagination";


interface Thread {
    id: number;
    title: string;
    user: User;
    created_at: string;
    posts_count: number;
    forum_id: number;
}

interface User {
    id: number;
    name: string;
}

interface ThreadPaginate {
    data: Thread[];
    links: {
        url: string;
        label: string;
        active: boolean;
    }[]
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    threads: ThreadPaginate;
}

export function ThreadList({ threads }: Props) {

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
                            baseUrl={`/forum/${threads.data[0].forum_id}?page=`} />
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
                        <ThreadItem key={thread.id} thread={thread} />
                    ))}
                </>
            ) : (
                "No threads"
            )}
        </div>
    )


}
