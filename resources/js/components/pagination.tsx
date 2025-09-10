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
    links: {
        url: string | null
        label: string
        active: boolean
    }[]
}

export default function PaginationCustom({ links }: Props) {
    console.log(links)
    return (
        <Pagination className="justify-start">
            <PaginationContent>
                {links.map((link, idx) => {
                    // Handle "Previous" button
                    if (link.label === "&laquo; Previous") {
                        return (
                            <PaginationItem key={idx}>
                                <PaginationPrevious
                                    size="default"
                                    href={link.url ?? undefined}
                                    className={!link.url ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                        )
                    }

                    // Handle "Next" button
                    if (link.label === "Next &raquo;") {
                        return (
                            <PaginationItem key={idx}>
                                <PaginationNext
                                    size="default"
                                    href={link.url ?? undefined}
                                    className={!link.url ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                        )
                    }

                    // Handle ellipsis
                    if (link.label === "..." || link.label === "&hellip;") {
                        return (
                            <PaginationItem key={idx}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )
                    }

                    // Handle page numbers
                    return (
                        <PaginationItem key={idx}>
                            <PaginationLink
                                size="default"
                                isActive={link.active}
                                href={link.url ?? "#"}
                            >
                                {link.label}
                            </PaginationLink>
                        </PaginationItem>
                    )
                })}
            </PaginationContent>
        </Pagination>
    )
}
