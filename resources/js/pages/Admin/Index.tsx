import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { createForum, editForum } from '@/routes/admin';
import { remove } from '@/routes/forum';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, SquarePen, Trash } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { adminCreate } from '@/actions/App/Http/Controllers/ThreadController';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
    },
];

interface Forum {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    parent_forum_id: number | null;
}

interface Thread {
    id: number;
    title: string;
    user_id: number;
    forum_id: number;
}

interface PageProps {
    forums: Forum[];
    threads: Thread[];
}


export default function Index({ forums, threads }: PageProps) {

    const { processing, delete: destroy } = useForm();


    const handleForumDelete = (id: number, name: string) => {
        if (confirm(`Do you want to delete forum: ${id}. ${name}`)) {
            destroy(remove.url({ forum: id }))
        }
    }

    const forumColumns: ColumnDef<Forum>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'title',
            header: 'Title',
        },
        {
            accessorKey: 'slug',
            header: 'Slug',
        },
        {
            accessorKey: 'description',
            header: 'Description',
            cell: ({ row }) => {

                return (
                    <div className='whitespace-normal break-words'>
                        {row.getValue('description')}
                    </div>
                )
            }
        },
        {
            accessorKey: "parent_forum_id",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Parent ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                return (
                    <div className='flex gap-2'>
                        <Link href={editForum(row.getValue('id'))}>
                            <Button variant="outline"><SquarePen /></Button>
                        </Link>
                        <Button variant="destructive"
                            disabled={processing}
                            onClick={() => handleForumDelete(row.getValue('id'), row.getValue('title'))}>
                            <Trash />
                        </Button>
                    </div>
                )
            }
        }
    ]

    const threadColumn: ColumnDef<Thread>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'title',
            header: 'Title',
        },
        {
            accessorKey: "forum_id",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Forum ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "user_id",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        User ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                return (
                    <div className='flex gap-2'>
                        {/* <Link href={editForum(row.getValue('id'))}> */}
                        <Button variant="outline"><SquarePen /></Button>
                        {/* </Link> */}
                        <Button variant="destructive"
                        // disabled={processing}
                        // onClick={() => handleForumDelete(row.getValue('id'), row.getValue('title'))}
                        >
                            <Trash />
                        </Button>
                    </div>
                )
            }
        },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className='text-xl'>Admin Page</h1>
                <div className='flex flex-row gap-2'>
                    <Link href={createForum()}>
                        <Button variant="outline">Create Forum</Button>
                    </Link>
                    <Link href={adminCreate()}>
                        <Button variant="outline">Create Thread</Button>
                    </Link>
                </div>
                <Accordion type="single" collapsible className="w-full bg-card">
                    <AccordionItem value='forum-list'>
                        <AccordionTrigger className="p-4">
                            <div className="text-lg ">Forums</div>
                        </AccordionTrigger>
                        <AccordionContent className="gap-1 flex flex-col">
                            <DataTable columns={forumColumns} data={forums} />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible className="w-full bg-card">
                    <AccordionItem value='forum-list'>
                        <AccordionTrigger className="p-4">
                            <div className="text-lg ">Threads</div>
                        </AccordionTrigger>
                        <AccordionContent className="gap-1 flex flex-col">
                            <DataTable columns={threadColumn} data={threads} />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </AppLayout>
    );
}
