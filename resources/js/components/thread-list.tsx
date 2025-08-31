import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useMemo, useState } from "react"
import { ThreadItem } from "./thread-item";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


interface Thread {
    id: number;
    title: string;
    user: User;
    created_at: string;
    posts_count: number;

}

interface User {
    id: number;
    name: string;
}

interface Props {
    threads: Thread[];
}

export function ThreadList({ threads }: Props) {
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("start_date");

    const threadCount = threads.length;
    const threadsPerPage = 10;
    const totalPages = Math.ceil(threadCount / threadsPerPage);

    const sortedThreads = useMemo(() => {
        let sorted = [...threads]
        switch (sortBy) {
            case "start_date":
                sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                break
            case "title":
                sorted.sort((a, b) => a.title.localeCompare(b.title))
                break
            case "replies": // TODO: Implement
                break
            case "recent":
                break
            default:
                sorted = threads
        }
        return sorted
    }, [threads, sortBy])

    const startIndex = (page - 1) * threadsPerPage
    const endIndex = startIndex + threadsPerPage
    const currentThreads = sortedThreads.slice(startIndex, endIndex)

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage)
        }
    }


    return (
        <div className="flex flex-col bg-card gap-1">
            {threadCount > 0 ? (
                <>
                    <div className="flex border-b p-2">

                        {totalPages > 1 && (
                            <Pagination className="justify-start">
                                <PaginationContent>
                                    {/* Previous */}
                                    <PaginationItem>
                                        <PaginationPrevious
                                            size="default"
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handlePageChange(page - 1)
                                            }}
                                        />
                                    </PaginationItem>

                                    {/* First page */}
                                    <PaginationItem>
                                        <PaginationLink
                                            size="default"
                                            href="#"
                                            isActive={page === 1}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handlePageChange(1)
                                            }}
                                        >
                                            1
                                        </PaginationLink>
                                    </PaginationItem>

                                    {/* Ellipsis before current */}
                                    {page > 3 && (
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    )}

                                    {/* Middle pages (current ±1) */}
                                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                                        .filter(
                                            (p) =>
                                                p !== 1 &&
                                                p !== totalPages &&
                                                Math.abs(p - page) <= 1
                                        )
                                        .map((p) => (
                                            <PaginationItem key={p}>
                                                <PaginationLink
                                                    size="default"

                                                    href="#"
                                                    isActive={page === p}
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        handlePageChange(p)
                                                    }}
                                                >
                                                    {p}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}

                                    {/* Ellipsis after current */}
                                    {page < totalPages - 2 && (
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    )}

                                    {/* Last page */}
                                    {totalPages > 1 && (
                                        <PaginationItem>
                                            <PaginationLink
                                                size="default"

                                                href="#"
                                                isActive={page === totalPages}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    handlePageChange(totalPages)
                                                }}
                                            >
                                                {totalPages}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )}

                                    {/* Next */}
                                    <PaginationItem>
                                        <PaginationNext
                                            size="default"
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handlePageChange(page + 1)
                                            }}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        )}

                        <div>
                            <Select onValueChange={(value) => {
                                setSortBy(value);
                                setPage(1);
                            }}>
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
                    {currentThreads.map((thread: Thread) => (
                        <ThreadItem key={thread.id} thread={thread} />
                    ))}
                </>
            ) : (
                "No threads"
            )}
        </div>
    )


}
