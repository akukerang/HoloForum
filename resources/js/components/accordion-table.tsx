import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from "@tanstack/react-table"

interface Props<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    title: string;
}

export function AccordionTable<TData, TValue>({ title, columns, data }: Props<TData, TValue>) {

    return <Accordion type="single" collapsible className="w-full bg-crust">
        <AccordionItem value='forum-list'>
            <AccordionTrigger className="p-4">
                <div className="text-lg ">{title}</div>
            </AccordionTrigger>
            <AccordionContent className="gap-1 flex flex-col bg-baseColor">
                <DataTable<TData, TValue> columns={columns} data={data} />
            </AccordionContent>
        </AccordionItem>
    </Accordion>

}

