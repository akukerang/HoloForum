import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Link } from "@inertiajs/react"

interface Props {
    currentPage: number
    lastPage: number
    baseUrl: string
}

export default function PaginationCustom({
    currentPage,
    lastPage,
    baseUrl,
}: Props) {
    const delta = 1
    const pages: (number | string)[] = []

    pages.push(1)

    if (currentPage - delta > 1) {
        pages.push("...")
    }

    for (
        let i = Math.max(2, currentPage - delta);
        i <= Math.min(lastPage - 1, currentPage + delta);
        i++
    ) {
        pages.push(i)
    }

    if (currentPage + delta < lastPage - 1) {
        pages.push("...")
    }

    if (lastPage > 1) {
        pages.push(lastPage)
    }

    return (
        <Pagination className="justify-start">
            <PaginationContent>
                {/* Prev button */}
                <PaginationItem>
                    <Link disabled={currentPage < 1} href={`${baseUrl}${currentPage - 1}`}>
                        <PaginationPrevious size="default">
                        </PaginationPrevious>
                    </Link>

                </PaginationItem>

                {/* Page links */}
                {pages.map((page, idx) =>
                    page === "..." ? (
                        <PaginationItem key={idx}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={idx}>
                            <PaginationLink
                                size="default"
                                isActive={page === currentPage}
                            >
                                <Link href={`${baseUrl}${page}`}>{page}</Link>

                            </PaginationLink>
                        </PaginationItem>
                    )
                )}

                {/* Next button */}
                <PaginationItem>
                    <Link disabled={currentPage == lastPage} href={`${baseUrl}${currentPage + 1}`}>
                        <PaginationNext size="default">
                        </PaginationNext>
                    </Link>
                </PaginationItem>
            </PaginationContent>
        </Pagination >
    )
}
