import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { createForum, editForum } from '@/routes/admin';
import { remove } from '@/routes/forum';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, SquarePen, Trash } from 'lucide-react';

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

interface PageProps {
    forums: Forum[];
}


export default function Index({ forums }: PageProps) {

    const { processing, delete: destroy } = useForm();


    const handleDelete = (id: number, name: string) => {
        if (confirm(`Do you want to delete forum: ${id}. ${name}`)) {
            destroy(remove.url({ forum: id }))
        }
    }

    const columns: ColumnDef<Forum>[] = [
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
                            onClick={() => handleDelete(row.getValue('id'), row.getValue('title'))}>
                            <Trash />
                        </Button>
                    </div>
                )
            }
        }
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1>Admin Page</h1>
                <Link href={createForum()}>
                    <Button variant="outline">Create Forum</Button>
                </Link>
                <h1>Forum List</h1>
                <DataTable columns={columns} data={forums} />
            </div>
        </AppLayout>
    );
}
