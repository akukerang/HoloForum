import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/admin';
import { store } from '@/routes/forum';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin - New Forum',
        href: '/admin/forum/create',
    },
];

export default function CreateForum() {


    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        description: '',
        parent_forum_id: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store.url());
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New Forum" />

            <div className='m-4'>
                <Link href={index()}>
                    <Button>Back </Button>
                </Link>
                <div className='w-8/12 m-4'>
                    <h1 className='text-2xl'>Add a New Forum</h1>
                    <form className='space-y-4' onSubmit={handleSubmit}>
                        <div className='space-y-1'>
                            <Label htmlFor="forum title">Title</Label>
                            <Input placeholder="Example" value={data.title}
                                onChange={(e) => setData('title', e.target.value)} />
                            {errors['title'] && <InputError message={errors['title']} />}
                        </div>
                        <div>
                            <Label htmlFor="forum slug">Slug</Label>
                            <Input placeholder="example-forum" value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)} />
                            {errors['slug'] && <InputError message={errors['slug']} />}

                        </div>
                        <div>
                            <Label htmlFor="forum description">Description</Label>
                            <Textarea placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit." value={data.description}
                                onChange={(e) => setData('description', e.target.value)} />
                            {errors['description'] && <InputError message={errors['description']} />}
                        </div>
                        <div>
                            <Label htmlFor="forum parent_forum_id">Parent ID</Label>
                            <Input placeholder="Parent ID" value={data.parent_forum_id}
                                onChange={(e) => setData('parent_forum_id', e.target.value)} />
                            {errors['parent_forum_id'] && <InputError message={errors['parent_forum_id']} />}
                        </div>
                        <Button type='submit' disabled={processing}>Add Forum</Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
