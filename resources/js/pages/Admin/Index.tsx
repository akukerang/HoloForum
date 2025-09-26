import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { createForum, createThread, editForum, editThread, editUser, removeForum, removeThread, removeUser } from '@/routes/admin';
import { Head, Link, useForm } from '@inertiajs/react';
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, SquarePen, Trash } from 'lucide-react';
import { Thread, Forum, User, BreadcrumbItem } from "@/types";
import { AccordionTable } from '@/components/accordion-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
    },
];

interface PageProps {
    forums: Forum[];
    threads: Thread[];
    users: User[];
}

export default function Index({ forums, threads, users }: PageProps) {

    const { processing, delete: destroy } = useForm();


    const handleForumDelete = (id: number, name: string) => {
        if (confirm(`Do you want to delete forum: ${id}. ${name}`)) {
            destroy(removeForum.url({ forum: id }))
        }
    }

    const handleThreadDelete = (id: number, title: string) => {
        if (confirm(`Do you want to delete thread: ${id}. ${title}`)) {
            destroy(removeThread.url({ thread: id }))
        }
    }

    const handleUserDelete = (id: number, name: string) => {
        if (confirm(`Do you want to delete user: ${id}. ${name}`)) {
            destroy(removeUser.url({ user: id }))
        }
    }
    const forumColumns: ColumnDef<Forum>[] = [
        {
            accessorKey: "id",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        ID
                        <ArrowUpDown className=" h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: 'title',
            header: 'Title',
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
                        <ArrowUpDown className="h-4 w-4" />
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
            accessorKey: "id",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        ID
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                )
            },
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
                        <ArrowUpDown className="h-4 w-4" />
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
                        <ArrowUpDown className="h-4 w-4" />
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
                        <Link href={editThread(row.getValue('id'))}>
                            <Button variant="outline"><SquarePen /></Button>
                        </Link>
                        <Button variant="destructive"
                            disabled={processing}
                            onClick={() => handleThreadDelete(row.getValue('id'), row.getValue('title'))}
                        >
                            <Trash />
                        </Button>
                    </div>
                )
            }
        },
    ]
    const userColumn: ColumnDef<User>[] = [
        {
            accessorKey: "id",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        ID
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: 'name',
            header: 'name',
        },
        {
            accessorKey: 'email',
            header: 'email',
        },
        {
            accessorKey: 'role',
            header: 'role',
        },
        {
            accessorKey: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                return (
                    <div className='flex gap-2'>
                        <Link href={editUser(row.getValue('id'))}>
                            <Button variant="outline"><SquarePen /></Button>
                        </Link>
                        <Button variant="destructive"
                            disabled={processing}
                            onClick={() => handleUserDelete(row.getValue('id'), row.getValue('name'))}
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
                    <Link href={createThread()}>
                        <Button variant="outline">Create Thread</Button>
                    </Link>
                </div>
                <AccordionTable title="Forums" columns={forumColumns} data={forums} />
                <AccordionTable title="Threads" columns={threadColumn} data={threads} />
                <AccordionTable title="Users" columns={userColumn} data={users} />
            </div>
        </AppLayout>
    );
}
