import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useState } from "react"
import { ThreadItem } from "./thread-item";


interface Thread {
    id: number;
    title: string;
    user: User;
    created_at: string;
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
    const threadCount = threads.length;
    const threadsPerPage = 10;
    const totalPages = Math.ceil(threadCount / threadsPerPage);

    const startIndex = (page - 1) * threadsPerPage
    const endIndex = startIndex + threadsPerPage
    const currentThreads = threads.slice(startIndex, endIndex)

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
                    </div>
                    {currentThreads.map((thread: any) => (
                        <ThreadItem key={thread.id} thread={thread} />
                    ))}
                </>
            ) : (
                "No threads"
            )}
        </div>
    )


}
