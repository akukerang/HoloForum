import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Forum',
        href: '/admin/create',
    },
];

export default function CreateForum() {


    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        description: '',
        parentID: '',
    })

    const handleSubmit = () => {

    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Forum" />
            <Link href={index()}>
                <Button>Back </Button>
            </Link>
            <div>

                <div>
                    <h1>Create Forum</h1>
                    <form className='space-y-3' onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="forum title">Title</Label>
                            <Input placeholder="Title" value={data.title}
                                onChange={(e) => setData('title', e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="forum slug">Slug</Label>
                            <Input placeholder="Slug" value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="forum description">Description</Label>
                            <Input placeholder="Description" value={data.description}
                                onChange={(e) => setData('description', e.target.value)} />
                        </div>
                        <div>
                            <Label htmlFor="forum parentID">Parent ID</Label>
                            <Input placeholder="Parent ID" value={data.parentID}
                                onChange={(e) => setData('parentID', e.target.value)} />
                        </div>
                        <Button type='submit' disabled={processing}>Create Forum</Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
