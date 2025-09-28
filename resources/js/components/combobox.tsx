import { useState } from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

type ForumItems = {
    slug: string
    title: string
}

export function ForumCombobox({
    value,
    onChange,
    forums
}: {
    value: string
    onChange: (val: string) => void
    forums: ForumItems[]
}) {
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between bg-mantle hover:bg-crust"
                >
                    {value
                        ? forums.find((forum) => forum.slug === value)?.title
                        : "Select forum..."}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search forums..." />
                    <CommandList>
                        <CommandEmpty>No forum found.</CommandEmpty>
                        <CommandGroup>
                            {forums.map((forum) => (
                                <CommandItem
                                    key={forum.slug}
                                    value={forum.slug}
                                    onSelect={(currentValue) => {
                                        onChange(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <CheckIcon
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === forum.slug ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {forum.title}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
