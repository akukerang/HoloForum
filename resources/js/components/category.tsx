import { ForumItem } from "./forum-item";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


export function Category() {
    return (
        <Accordion type="single" collapsible className="w-full bg-card">
            <AccordionItem value="category-1">
                <AccordionTrigger className="p-4">
                    <div className="text-lg ">General Discussion</div>
                </AccordionTrigger>
                <AccordionContent className="gap-1 flex flex-col">
                    <ForumItem />
                    <ForumItem />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}