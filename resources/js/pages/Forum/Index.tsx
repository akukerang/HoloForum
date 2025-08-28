import { Category } from '@/components/category';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Forum',
        href: '/forum',
    },
];

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

interface Props {
    categories: Category[];
}


export default function Index() {
    const { categories } = usePage().props as unknown as Props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Forum" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 bg-secondary items-center">
                <div className='w-3/4 flex flex-col gap-4'>
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
