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
import { PostItem } from "./post-item";

interface User {
    id: string;
    name: string;
}

interface Forum {
    title: string;
}

interface Post {
    id: number;
    content: string;
    user: User;
    created_at: string;
}



export function PostList({ posts }: { posts: Post[] }) {
    const [page, setPage] = useState(1);

    const postCount = posts.length;
    const postsPerPage = 10;
    const totalPages = Math.ceil(postCount / postsPerPage);

    const startIndex = (page - 1) * postsPerPage
    const endIndex = startIndex + postsPerPage
    const currentPosts = posts.slice(startIndex, endIndex)

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage)
        }
    }


    return (
        <div className="flex flex-col gap-1">
            {postCount > 0 ? (
                <>
                    {currentPosts.map((post: any) => (
                        <PostItem key={post.id} post={post} />
                    ))}

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




                </>
            ) : (
                "No threads"
            )}
        </div>
    )


}
