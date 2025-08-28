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

interface Forum {
    id: number;
    title: string;
    slug: string;
    description: string;
    threads_count: number;
}

export function Category({ category }: { category: Category }) {
    return (
        <Accordion type="single" collapsible className="w-full bg-card">
            <AccordionItem value={`category-${category.id}`}>
                <AccordionTrigger className="p-4 border-b">
                    <div className="text-lg ">{category.title}</div>
                </AccordionTrigger>
                <AccordionContent className="gap-1 flex flex-col p-0">
                    {category.children.map((forum) => (
                        <ForumItem key={forum.id} forum={forum} />
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}