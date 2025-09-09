import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/admin';
import { storeThread } from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin - New Thread',
        href: '/admin/thread/create',
    },
];

export default function CreateThread() {

    const { data, setData, post, processing, errors } = useForm({
        user_id: '',
        forum_id: '',
        title: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(storeThread.url());
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New Thread" />

            <div className='m-4'>
                <Link href={index()}>
                    <Button>Back </Button>
                </Link>
                <div className='w-8/12 m-4'>
                    <h1 className='text-2xl'>Add a New Thread</h1>
                    <form className='space-y-4' onSubmit={handleSubmit}>
                        <div className='space-y-1'>
                            <Label htmlFor="thread title">Title</Label>
                            <Input placeholder="Example" value={data.title}
                                onChange={(e) => setData('title', e.target.value)} />
                            {errors['title'] && <InputError message={errors['title']} />}
                        </div>
                        <div>
                            <Label htmlFor="thread forum_id">Forum ID</Label>
                            <Input placeholder="Forum ID" value={data.forum_id}
                                onChange={(e) => setData('forum_id', e.target.value)} />
                            {errors['forum_id'] && <InputError message={errors['forum_id']} />}
                        </div>
                        <div>
                            <Label htmlFor="thread user_id">User ID</Label>
                            <Input placeholder="User ID" value={data.user_id}
                                onChange={(e) => setData('user_id', e.target.value)} />
                            {errors['user_id'] && <InputError message={errors['user_id']} />}
                        </div>
                        <Button type='submit' disabled={processing}>Add Thread</Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
