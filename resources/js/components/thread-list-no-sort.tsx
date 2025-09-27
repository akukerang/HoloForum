import { ThreadItem } from "./thread-item";
import PaginationCustom from "./pagination";
import { Thread, ThreadPaginate } from "@/types";
import Empty from "./empty";

interface Props {
    threads: ThreadPaginate;
}

export function ThreadListNoSort({ threads }: Props) {
    const threadCount = threads.total;
    return (
        <div className="flex flex-col gap-1">
            {threadCount > 0 ? (
                <>
                    {threads.last_page > 1 ? (
                        <div className="flex border-b bg-crust px-3 py-2 justify-between rounded-t-lg">
                            <PaginationCustom links={threads.links} />
                        </div>)
                        : null}
                    {threads.data.map((thread: Thread) => (
                        <ThreadItem key={thread.id} thread={thread} />
                    ))}
                </>
            ) : (
                <Empty message="No threads available" />
            )}
        </div>
    )
}
