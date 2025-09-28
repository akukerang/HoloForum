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

type Forum = {
    value: string
    label: string
}

const forums: Forum[] = [
    { value: "1", label: "Hololive JP Gen 0" },
    { value: "2", label: "Hoshimachi Suisei" },
]

export function ForumCombobox({
    value,
    onChange,
}: {
    value: string
    onChange: (val: string) => void
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
                        ? forums.find((forum) => forum.value === value)?.label
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
                                    key={forum.value}
                                    value={forum.value}
                                    onSelect={(currentValue) => {
                                        onChange(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <CheckIcon
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === forum.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {forum.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
