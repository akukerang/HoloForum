import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

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

    console.log(currentPage, lastPage)

    return (
        <Pagination className="justify-start">
            <PaginationContent>
                {/* Prev button */}
                {currentPage > 1 ? (
                    <PaginationItem>
                        <PaginationPrevious size="default" href={`${baseUrl}${currentPage - 1}`} />
                    </PaginationItem>
                ) : null}


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
                                href={`${baseUrl}${page}`}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}

                {/* Next button */}
                {currentPage < lastPage ? (
                    <PaginationItem>
                        <PaginationNext size="default" href={`${baseUrl}${currentPage + 1}`} />
                    </PaginationItem>
                ) : null}
            </PaginationContent>
        </Pagination >
    )
}
