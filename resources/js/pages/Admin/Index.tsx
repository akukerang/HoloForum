import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { createForum } from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '/admin',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1>Admin Page</h1>
                <Link href={createForum()}>
                    <Button variant="outline">Create Forum</Button>
                </Link>
                <h1>Forum List</h1>
            </div>
        </AppLayout>
    );
}
