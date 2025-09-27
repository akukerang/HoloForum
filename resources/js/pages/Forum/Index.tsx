import { Category } from '@/components/category';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Forum } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Forums',
        href: '/',
    },
];

interface Category {
    id: number;
    title: string;
    children: Forum[];
}

interface Props {
    categories: Category[];
}


export default function Index() {
    const { categories } = usePage().props as unknown as Props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Forums" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 items-center">
                <div className='w-3/4 flex flex-col gap-4'>
                    <h1 className='text-2xl text-blue font-bold'>Forums</h1>
                    {categories.length > 0 ? (
                        <>
                            {categories.map((category) => (
                                <Category key={category.id} category={category} />
                            ))}
                        </>
                    ) : null
                    }
                </div>
            </div>
        </AppLayout>
    );
}
