import { Forum } from "@/types";
import { ForumItem } from "./forum-item";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


interface Category {
    id: number;
    title: string;
    children: Forum[];
}

export function Category({ category }: { category: Category }) {
    return (
        <Accordion type="single" collapsible className="w-full shadow-sm">
            <AccordionItem value={`category-${category.id}`}>
                <AccordionTrigger className="p-4 border-b rounded-none bg-crust hover:bg-crust/80">
                    <div className="text-lg">{category.title}</div>
                </AccordionTrigger>
                <AccordionContent className="gap-1 flex flex-col p-0 bg-baseColor">
                    {category.children.map((forum) => (
                        <ForumItem key={forum.id} forum={forum} />
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}